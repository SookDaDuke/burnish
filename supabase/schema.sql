-- ============================================
-- ASSISTED LIVING DIRECTORY DATABASE SCHEMA
-- ============================================

-- ============================================
-- LOCATIONS TABLE
-- Drives city/county/state pages
-- ============================================
CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  county TEXT,
  state TEXT NOT NULL,
  state_full TEXT,
  slug TEXT UNIQUE NOT NULL,
  location_type TEXT NOT NULL DEFAULT 'city', -- city, county, state
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  population INTEGER,
  median_age DECIMAL(5, 2),
  senior_population_pct DECIMAL(5, 2),
  custom_content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_state ON locations(state);
CREATE INDEX idx_locations_county ON locations(county);
CREATE INDEX idx_locations_type ON locations(location_type);

-- ============================================
-- FACILITIES TABLE
-- Your main content type
-- ============================================
CREATE TABLE facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  facility_type TEXT[] DEFAULT '{}',
  description TEXT,
  long_description TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT NOT NULL,
  county TEXT,
  state TEXT NOT NULL,
  zip TEXT,
  phone TEXT,
  website_url TEXT,
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  capacity INTEGER,
  year_established INTEGER,
  ownership_type TEXT,
  chain_name TEXT,
  license_number TEXT,
  license_status TEXT DEFAULT 'active',
  accepts_medicaid BOOLEAN DEFAULT FALSE,
  accepts_medicare BOOLEAN DEFAULT FALSE,
  price_range_low INTEGER,
  price_range_high INTEGER,
  amenities TEXT[] DEFAULT '{}',
  services TEXT[] DEFAULT '{}',
  staffing_ratio TEXT,
  rating_avg DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  violation_count INTEGER DEFAULT 0,
  last_inspection_date DATE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  data_source TEXT,
  metadata JSONB DEFAULT '{}',
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_facilities_slug ON facilities(slug);
CREATE INDEX idx_facilities_city ON facilities(city);
CREATE INDEX idx_facilities_state ON facilities(state);
CREATE INDEX idx_facilities_county ON facilities(county);
CREATE INDEX idx_facilities_type ON facilities USING GIN(facility_type);
CREATE INDEX idx_facilities_rating ON facilities(rating_avg DESC);

-- ============================================
-- FACILITY_LOCATIONS (many-to-many)
-- Connects facilities to the locations they serve
-- ============================================
CREATE TABLE facility_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE,
  UNIQUE(facility_id, location_id)
);

CREATE INDEX idx_facility_locations_location ON facility_locations(location_id);
CREATE INDEX idx_facility_locations_facility ON facility_locations(facility_id);

-- ============================================
-- REVIEWS TABLE
-- User-generated ratings and feedback
-- ============================================
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
  reviewer_name TEXT,
  relationship TEXT,
  rating_overall INTEGER CHECK (rating_overall >= 1 AND rating_overall <= 5),
  rating_staff INTEGER CHECK (rating_staff >= 1 AND rating_staff <= 5),
  rating_activities INTEGER CHECK (rating_activities >= 1 AND rating_activities <= 5),
  rating_food INTEGER CHECK (rating_food >= 1 AND rating_food <= 5),
  rating_cleanliness INTEGER CHECK (rating_cleanliness >= 1 AND rating_cleanliness <= 5),
  rating_value INTEGER CHECK (rating_value >= 1 AND rating_value <= 5),
  stay_duration TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_facility ON reviews(facility_id);
CREATE INDEX idx_reviews_rating ON reviews(rating_overall);

-- ============================================
-- CATEGORIES TABLE
-- Care type category pages
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  icon TEXT,
  seo_title TEXT,
  seo_description TEXT,
  display_order INTEGER DEFAULT 0,
  faqs JSONB DEFAULT '[]',
  related_categories TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- ============================================
-- GLOSSARY TERMS TABLE
-- For definition/glossary pages
-- ============================================
CREATE TABLE glossary_terms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_definition TEXT NOT NULL,
  long_definition TEXT NOT NULL,
  pronunciation TEXT,
  example_sentence TEXT,
  category TEXT,
  related_terms TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_glossary_slug ON glossary_terms(slug);
CREATE INDEX idx_glossary_category ON glossary_terms(category);

-- ============================================
-- VIOLATIONS TABLE
-- State inspection violations
-- ============================================
CREATE TABLE violations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
  violation_date DATE,
  violation_type TEXT,
  description TEXT,
  severity TEXT,
  corrective_action TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_violations_facility ON violations(facility_id);
CREATE INDEX idx_violations_date ON violations(violation_date);

-- ============================================
-- TRIGGER: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_locations_timestamp
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_facilities_timestamp
  BEFORE UPDATE ON facilities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: Categories
-- ============================================
INSERT INTO categories (name, slug, description, icon, display_order) VALUES
('Assisted Living', 'assisted-living', 'Assisted living facilities provide help with daily activities while maintaining independence.', '🏠', 1),
('Memory Care', 'memory-care', 'Specialized care for individuals with Alzheimer''s disease and other forms of dementia.', '🧠', 2),
('Independent Living', 'independent-living', 'Senior living communities with minimal assistance, focus on lifestyle and community.', '🌴', 3),
('Skilled Nursing', 'skilled-nursing', '24/7 medical care and rehabilitation services for those with complex health needs.', '🏥', 4),
('Continuing Care', 'continuing-care', 'Multiple levels of care in one community, from independent to skilled nursing.', '🔄', 5),
('Respite Care', 'respite-care', 'Short-term care providing relief for family caregivers.', '⏰', 6),
('Adult Day Care', 'adult-day-care', 'Daytime care services for seniors who need supervision during work hours.', '☀️', 7);

-- ============================================
-- SEED DATA: NJ Counties
-- ============================================
INSERT INTO locations (name, county, state, state_full, slug, location_type, population) VALUES
('Atlantic County', 'Atlantic', 'NJ', 'New Jersey', 'atlantic-county', 'county', 274534),
('Bergen County', 'Bergen', 'NJ', 'New Jersey', 'bergen-county', 'county', 936692),
('Burlington County', 'Burlington', 'NJ', 'New Jersey', 'burlington-county', 'county', 464473),
('Camden County', 'Camden', 'NJ', 'New Jersey', 'camden-county', 'county', 507078),
('Cape May County', 'Cape May', 'NJ', 'New Jersey', 'cape-may-county', 'county', 95263),
('Cumberland County', 'Cumberland', 'NJ', 'New Jersey', 'cumberland-county', 'county', 150972),
('Essex County', 'Essex', 'NJ', 'New Jersey', 'essex-county', 'county', 799767),
('Gloucester County', 'Gloucester', 'NJ', 'New Jersey', 'gloucester-county', 'county', 302294),
('Hudson County', 'Hudson', 'NJ', 'New Jersey', 'hudson-county', 'county', 684952),
('Hunterdon County', 'Hunterdon', 'NJ', 'New Jersey', 'hunterdon-county', 'county', 125063),
('Mercer County', 'Mercer', 'NJ', 'New Jersey', 'mercer-county', 'county', 387340),
('Middlesex County', 'Middlesex', 'NJ', 'New Jersey', 'middlesex-county', 'county', 860807),
('Monmouth County', 'Monmouth', 'NJ', 'New Jersey', 'monmouth-county', 'county', 630201),
('Morris County', 'Morris', 'NJ', 'New Jersey', 'morris-county', 'county', 509587),
('Ocean County', 'Ocean', 'NJ', 'New Jersey', 'ocean-county', 'county', 637229),
('Passaic County', 'Passaic', 'NJ', 'New Jersey', 'passaic-county', 'county', 503310),
('Salem County', 'Salem', 'NJ', 'New Jersey', 'salem-county', 'county', 65049),
('Somerset County', 'Somerset', 'NJ', 'New Jersey', 'somerset-county', 'county', 335432),
('Sussex County', 'Sussex', 'NJ', 'New Jersey', 'sussex-county', 'county', 140488),
('Union County', 'Union', 'NJ', 'New Jersey', 'union-county', 'county', 575345),
('Warren County', 'Warren', 'NJ', 'New Jersey', 'warren-county', 'county', 106798);

-- ============================================
-- SEED DATA: Sample NJ Cities (Top 30 by population)
-- ============================================
INSERT INTO locations (name, county, state, state_full, slug, location_type, population) VALUES
('Newark', 'Essex', 'NJ', 'New Jersey', 'newark', 'city', 291538),
('Jersey City', 'Hudson', 'NJ', 'New Jersey', 'jersey-city', 'city', 253647),
('Elizabeth', 'Union', 'NJ', 'New Jersey', 'elizabeth', 'city', 128884),
('Trenton', 'Mercer', 'NJ', 'New Jersey', 'trenton', 'city', 90238),
('Edison', 'Middlesex', 'NJ', 'New Jersey', 'edison', 'city', 106586),
('Toms River', 'Ocean', 'NJ', 'New Jersey', 'toms-river', 'city', 95138),
('Hamilton', 'Mercer', 'NJ', 'New Jersey', 'hamilton-nj', 'city', 87399),
('Woodbridge', 'Middlesex', 'NJ', 'New Jersey', 'woodbridge', 'city', 103639),
('Lakewood', 'Ocean', 'NJ', 'New Jersey', 'lakewood-nj', 'city', 135158),
('Vineland', 'Cumberland', 'NJ', 'New Jersey', 'vineland', 'city', 58887),
('North Brunswick', 'Middlesex', 'NJ', 'New Jersey', 'north-brunswick', 'city', 41574),
('Berkeley', 'Ocean', 'NJ', 'New Jersey', 'berkeley-nj', 'city', 42024),
('Mount Laurel', 'Burlington', 'NJ', 'New Jersey', 'mount-lauderdale', 'city', 41451),
('Manchester', 'Ocean', 'NJ', 'New Jersey', 'manchester-nj', 'city', 44351),
('Jackson', 'Ocean', 'NJ', 'New Jersey', 'jackson-nj', 'city', 59215),
('Wayne', 'Passaic', 'NJ', 'New Jersey', 'wayne-nj', 'city', 54586),
('Union City', 'Hudson', 'NJ', 'New Jersey', 'union-city', 'city', 68592),
('New Brunswick', 'Middlesex', 'NJ', 'New Jersey', 'new-brunswick', 'city', 55470),
('Bloomfield', 'Essex', 'NJ', 'New Jersey', 'bloomfield-nj', 'city', 49708),
('West New York', 'Hudson', 'NJ', 'New Jersey', 'west-new-york', 'city', 52077),
('Cherry Hill', 'Camden', 'NJ', 'New Jersey', 'cherry-hill', 'city', 74104),
('Passaic', 'Passaic', 'NJ', 'New Jersey', 'passaic-nj', 'city', 69271),
('Clifton', 'Passaic', 'NJ', 'New Jersey', 'clifton-nj', 'city', 85390),
('Camden', 'Camden', 'KD', 'New Jersey', 'camden-nj', 'city', 74878),
('Hoboken', 'Hudson', 'NJ', 'New Jersey', 'hoboken', 'city', 53484),
('Middletown', 'Monmouth', 'NJ', 'New Jersey', 'middletown-nj', 'city', 65380),
('Sayreville', 'Middlesex', 'NJ', 'New Jersey', 'sayreville', 'city', 45076),
('Kearny', 'Hudson', 'NJ', 'New Jersey', 'kearny', 'city', 41191),
('Fort Lee', 'Bergen', 'NJ', 'New Jersey', 'fort-lee', 'city', 40013),
('Fair Lawn', 'Bergen', 'NJ', 'New Jersey', 'fair-lawn', 'city', 32087);

-- ============================================
-- SEED DATA: Glossary Terms
-- ============================================
INSERT INTO glossary_terms (term, slug, short_definition, long_definition, category) VALUES
('ADLs', 'adls', 'Activities of Daily Living - basic self-care tasks', 'ADLs stand for Activities of Daily Living, which are fundamental self-care tasks that individuals need to perform independently. These include bathing, dressing, toileting, transferring (getting in/out of bed/chair), continence control, and eating. Assisted living facilities typically help residents with ADLs based on their individual care plans.', 'care'),
('IADLs', 'iadls', 'Instrumental Activities of Daily Living - complex daily tasks', 'IADLs are Instrumental Activities of Daily Living that involve more complex thinking and organizational skills, including managing finances, handling transportation, shopping, preparing meals, using telephone/technology, doing housework, and taking medications. These are often used to assess whether someone needs assisted living care.', 'care'),
('Assisted Living', 'assisted-living-definition', 'Housing with personal care support', 'Assisted living is a type of housing designed for individuals who need help with daily activities but want to maintain independence. Facilities provide meals, assistance with ADLs, medication management, housekeeping, and social activities. Residents typically have their own apartments and can come and go as they please.', 'care'),
('Memory Care', 'memory-care-definition', 'Specialized care for dementia and Alzheimer''s', 'Memory care is a specialized form of assisted living designed specifically for individuals with Alzheimer''s disease, dementia, or other memory impairments. These facilities have secure environments to prevent wandering, trained staff available 24/7, and programs specifically designed to maintain cognitive function and quality of life.', 'care'),
('CCRC', 'ccrc', 'Continuing Care Retirement Community', 'A CCRC (Continuing Care Retirement Community) offers multiple levels of care in one location - from independent living to assisted living to skilled nursing. Residents can transition between care levels as their needs change without having to move to a different facility.', 'care'),
('SNF', 'snf', 'Skilled Nursing Facility', 'A SNF (Skilled Nursing Facility) provides 24-hour medical care from licensed nurses and therapists. Unlike assisted living, SNFs provide medical treatments that cannot be provided at home, including wound care, IV therapy, physical therapy, and post-hospital rehabilitation.', 'care'),
('Medicaid Waiver', 'medicaid-waiver', 'Program to pay for home/community care', 'A Medicaid waiver is a program that allows states to use Medicaid funds to pay for care in community settings (like assisted living) rather than in institutions. These waivers can help cover the cost of assisted living for those who qualify financially.', 'financial'),
('Level of Care Assessment', 'level-of-care-assessment', 'Evaluation to determine care needs', 'A level of care assessment is an evaluation conducted by medical professionals to determine what type of care an individual needs. This assessment looks at the person''s ability to perform ADLs, cognitive function, medical needs, and safety concerns to determine if they qualify for assisted living or other care programs.', 'care'),
('Respite Care', 'respite-care-definition', 'Short-term relief for caregivers', 'Respite care provides temporary relief for family caregivers by offering short-term care for their loved one. This can be for a few hours, days, or weeks and allows caregivers to take a break, handle personal matters, or simply rest while knowing their loved one is well cared for.', 'care'),
('Personal Care', 'personal-care', 'Help with daily activities', 'Personal care refers to assistance with Activities of Daily Living (ADLs) such as bathing, dressing, grooming, toileting, and mobility assistance. This is the primary service offered by assisted living facilities.', 'care');

-- ============================================
-- SEED DATA: Sample Facilities (for testing)
-- ============================================
INSERT INTO facilities (name, slug, facility_type, description, address_line1, city, county, state, zip, phone, price_range_low, price_range_high, rating_avg, review_count, is_verified) VALUES
('The Waterford', 'the-waterford', ARRAY['assisted-living', 'memory-care'], 'A luxury assisted living community offering personalized care in a beautiful setting.', '27 Mountain Avenue', 'Newark', 'Essex', 'NJ', '07104', '973-555-0100', 4500, 7500, 4.5, 127, true),
('Sunrise of West Essex', 'sunrise-west-essex', ARRAY['assisted-living', 'memory-care'], 'Sunrise Senior Living community providing compassionate care.', '295 Little Falls Road', 'Fair Lawn', 'Bergen', 'NJ', '07410', '201-555-0200', 5000, 8500, 4.3, 89, true),
('Brighton Gardens of Mountainside', 'brighton-gardens-mountainside', ARRAY['assisted-living', 'memory-care'], 'Assisted living and memory care in the heart of New Jersey.', '36 Stirling Road', 'Watchung', 'Somerset', 'NJ', '07069', '908-555-0300', 5500, 9000, 4.6, 156, true),
('The Chelsea at Brookside', 'chelsea-brookside', ARRAY['assisted-living'], 'Quality assisted living with a focus on independence.', '310 Brookside Avenue', 'Brookside', 'Morris', 'NJ', '07926', '973-555-0400', 4200, 6800, 4.2, 64, true),
('Arbor Terrace Teaneck', 'arbor-terrace-teaneck', ARRAY['assisted-living', 'memory-care', 'adult-day-care'], 'Modern assisted living with exceptional amenities.', '444 Teaneck Road', 'Teaneck', 'Bergen', 'NJ', '07666', '201-555-0500', 4800, 7800, 4.4, 112, true),
('CareOne at Hanover Township', 'careone-hanover', ARRAY['assisted-living', 'memory-care', 'skilled-nursing'], 'Comprehensive care with rehabilitation services.', '164 Mount Airy Road', 'Basking Ridge', 'Somerset', 'NJ', '07920', '908-555-0600', 6000, 12000, 4.7, 203, true),
('Laurel Circle', 'laurel-circle', ARRAY['independent-living', 'assisted-living'], 'Continuing care community with independent living options.', '100 Monroe Street', 'New Brunswick', 'Middlesex', 'NJ', '08901', '732-555-0700', 3500, 6500, 4.8, 178, true),
('Brandywine Living at Reflections', 'brandywine-reflections', ARRAY['memory-care'], 'Dedicated memory care with specialized programs.', '39 Stacey Street', 'Cinnaminson', 'Burlington', 'NJ', '08077', '856-555-0800', 7000, 11000, 4.1, 45, true),
('Summit Care', 'summit-care', ARRAY['assisted-living', 'skilled-nursing'], 'Skilled nursing and assisted living with medical focus.', '733 Main Street', 'Summit', 'Union', 'NJ', '07901', '908-555-0900', 5500, 9500, 4.0, 92, true),
('The Regency at Woodland Park', 'regency-woodland-park', ARRAY['assisted-living', 'memory-care'], 'Elegant assisted living with personalized care plans.', '430 Mcrobbins Avenue', 'Woodland Park', 'Passaic', 'NJ', '07424', '973-555-1000', 5200, 8200, 4.5, 138, true);

-- ============================================
-- Link facilities to locations
-- ============================================
-- This would normally be done programmatically, but adding sample links
INSERT INTO facility_locations (facility_id, location_id, is_primary)
SELECT f.id, l.id, true
FROM facilities f, locations l
WHERE f.city = l.name AND f.state = l.state;
