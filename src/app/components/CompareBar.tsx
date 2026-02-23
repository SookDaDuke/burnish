"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CompareBarProps {
  onCompareClick?: () => void;
}

export default function CompareBar({ onCompareClick }: CompareBarProps) {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("burnish_compare");
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);

  const removeFromCompare = (slug: string) => {
    const updated = saved.filter(s => s !== slug);
    setSaved(updated);
    localStorage.setItem("burnish_compare", JSON.stringify(updated));
  };

  const clearAll = () => {
    setSaved([]);
    localStorage.removeItem("burnish_compare");
  };

  if (saved.length === 0) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-4 z-50"
      style={{ 
        background: 'var(--color-background-secondary)',
        borderTop: '1px solid var(--color-metadata)'
      }}
    >
      <div className="max-content mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
            {saved.length} communities saved for comparison
          </span>
          <div className="flex gap-2">
            {saved.slice(0, 3).map((slug) => (
              <button
                key={slug}
                onClick={() => removeFromCompare(slug)}
                className="text-xs px-2 py-1"
                style={{ 
                  background: 'var(--color-background)',
                  color: 'var(--color-foreground-muted)',
                  borderRadius: '2px'
                }}
              >
                ✕ {slug.replace(/-/g, ' ')}
              </button>
            ))}
            {saved.length > 3 && (
              <span className="text-xs px-2 py-1" style={{ color: 'var(--color-metadata)' }}>
                +{saved.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="text-sm px-4 py-2"
            style={{ 
              border: '1px solid var(--color-metadata)',
              color: 'var(--color-foreground-muted)',
              borderRadius: '2px'
            }}
          >
            Clear
          </button>
          <button
            onClick={onCompareClick}
            className="btn btn-primary text-sm"
            style={{ borderRadius: '2px' }}
          >
            Compare Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for adding/removing from compare
export function useCompare() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("burnish_compare");
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);

  const addToCompare = (slug: string) => {
    if (saved.length >= 5) return false;
    if (saved.includes(slug)) return false;
    
    const updated = [...saved, slug];
    setSaved(updated);
    localStorage.setItem("burnish_compare", JSON.stringify(updated));
    return true;
  };

  const removeFromCompare = (slug: string) => {
    const updated = saved.filter(s => s !== slug);
    setSaved(updated);
    localStorage.setItem("burnish_compare", JSON.stringify(updated));
  };

  const isSaved = (slug: string) => saved.includes(slug);

  return { saved, addToCompare, removeFromCompare, isSaved, maxItems: 5 };
}
