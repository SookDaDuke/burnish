#!/usr/bin/env python3
"""
Phase 2: Data Cleaning Script for NJ Assisted Living Facilities
Cleans scraped Google Maps data by removing junk, duplicates, and non-NJ results.
"""

import pandas as pd
import sys
import os

# Categories to EXCLUDE (not actual assisted living facilities)
EXCLUDE_CATEGORIES = [
    'restaurant', 'bar', 'cafe', 'food', 'coffee',
    'home health care service', 'home help', 'home care',
    'senior citizen center', 'community center',
    'nursing home',  # Keep only if explicitly needed - these are different from ALF
    'hospital', 'medical center', 'clinic', 'doctor',
    'health consultant', 'social services organization',
    'non-profit organization', 'government office',
    'apartment building', 'apartment complex', 'apartment rental agency',
    'low income housing', 'housing program',
    'funeral home', 'rehabilitation center',
    'physical therapy', 'wellness program',
    'hotel', 'real estate', 'insurance'
]

# Keywords that indicate false positive in name
EXCLUDE_KEYWORDS = [
    'restaurant', 'cafe', 'coffee', 'bar', 'pub',
    'hospital', 'medical', 'clinic', 'doctor',
    'pharmacy', 'drug store',
    'government', 'county', 'state office',
    'apartment', 'rentals', 'housing'
]

def load_data(filepath):
    """Load CSV data."""
    print(f"Loading data from {filepath}...")
    df = pd.read_csv(filepath)
    print(f"  Loaded {len(df)} rows")
    return df

def remove_closed(df):
    """Remove permanently or temporarily closed businesses."""
    initial_count = len(df)
    
    # Check for closed status columns
    if 'permanentlyClosed' in df.columns:
        df = df[df['permanentlyClosed'] != True]
    if 'temporarilyClosed' in df.columns:
        df = df[df['temporarilyClosed'] != True]
    
    removed = initial_count - len(df)
    print(f"  Removed {removed} closed businesses")
    return df

def filter_nj_only(df):
    """Filter to only New Jersey results."""
    initial_count = len(df)
    
    # Filter by state column
    if 'state' in df.columns:
        df = df[df['state'].str.contains('New Jersey', case=False, na=False)]
    
    # Also check address for NJ
    if 'address' in df.columns:
        df_nj_addr = df[df['address'].str.contains(', NJ', case=False, na=False)]
        # Keep either NJ state or NJ in address
        if 'state' in df.columns:
            mask = df['state'].str.contains('New Jersey', case=False, na=False) | \
                   df['address'].str.contains(', NJ', case=False, na=False)
            df = df[mask]
    
    removed = initial_count - len(df)
    print(f"  Removed {removed} non-NJ results (kept PA border areas if relevant)")
    return df

def filter_categories(df):
    """Remove rows with excluded categories."""
    initial_count = len(df)
    
    if 'categories' in df.columns:
        # Remove rows where categories contain excluded terms
        for excat in EXCLUDE_CATEGORIES:
            df = df[~df['categories'].fillna('').str.lower().str.contains(excat, na=False)]
    
    if 'categoryName' in df.columns:
        for excat in EXCLUDE_CATEGORIES:
            df = df[~df['categoryName'].fillna('').str.lower().str.contains(excat, na=False)]
    
    removed = initial_count - len(df)
    print(f"  Removed {removed} rows with excluded categories")
    return df

def filter_name_keywords(df):
    """Remove rows with excluded keywords in name."""
    initial_count = len(df)
    
    if 'name' in df.columns:
        for kw in EXCLUDE_KEYWORDS:
            df = df[~df['name'].fillna('').str.lower().str.contains(kw, na=False)]
    
    removed = initial_count - len(df)
    print(f"  Removed {removed} rows with excluded keywords in name")
    return df

def deduplicate(df):
    """Remove duplicate entries based on placeId."""
    initial_count = len(df)
    
    if 'placeId' in df.columns:
        df = df.drop_duplicates(subset='placeId', keep='first')
    
    removed = initial_count - len(df)
    print(f"  Removed {removed} duplicate entries")
    return df

def require_basic_fields(df):
    """Remove rows missing essential data."""
    initial_count = len(df)
    
    # Require name and at least address or phone
    if 'name' in df.columns:
        df = df[df['name'].notna() & (df['name'] != '')]
    
    # Keep if has address OR phone
    if 'address' in df.columns and 'phone' in df.columns:
        df = df[(df['address'].notna()) | (df['phone'].notna())]
    
    removed = initial_count - len(df)
    print(f"  Removed {rows} rows missing essential fields")
    return df

def main():
    if len(sys.argv) < 2:
        print("Usage: python clean_data.py <input_csv_file>")
        print("Output will be saved to <input>_cleaned.csv")
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    # Load data
    df = load_data(input_file)
    
    print("\nStarting cleaning pipeline...")
    
    # Step 1: Remove closed businesses
    df = remove_closed(df)
    
    # Step 2: Filter to NJ only
    df = filter_nj_only(df)
    
    # Step 3: Filter categories
    df = filter_categories(df)
    
    # Step 4: Filter name keywords
    df = filter_name_keywords(df)
    
    # Step 5: Deduplicate
    df = deduplicate(df)
    
    # Step 6: Require basic fields
    df = require_basic_fields(df)
    
    # Save cleaned data
    output_file = input_file.replace('.csv', '_cleaned.csv')
    df.to_csv(output_file, index=False)
    
    print(f"\n✓ Cleaning complete!")
    print(f"  Original: {len(df)} rows")
    print(f"  Final: {len(df)} rows")
    print(f"  Saved to: {output_file}")
    
    # Print category distribution
    if 'categoryName' in df.columns:
        print(f"\n  Top categories in cleaned data:")
        print(df['categoryName'].value_counts().head(10).to_string())

if __name__ == '__main__':
    main()
