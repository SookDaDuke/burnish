"use client";

import { useState } from "react";
import Link from "next/link";

export default function GetMatchedPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: About the senior
    relationship: "",
    careType: "",
    urgency: "",
    
    // Step 2: Location & Preferences
    location: "",
    budget: "",
    mustHaves: [] as string[],
    
    // Step 3: Contact
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-content px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6" style={{ color: 'var(--color-accent-brass)' }}>✓</div>
          <h1 className="text-display mb-4">We'll Be In Touch</h1>
          <p className="text-xl mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
            Our team is reviewing your needs and will reach out within 24 hours with personalized recommendations.
          </p>
          <Link href="/directory" className="btn btn-primary" style={{ borderRadius: '2px' }}>
            Browse Communities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-content px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                style={{ 
                  background: step >= s ? 'var(--color-accent-brass)' : 'var(--color-background-secondary)',
                  color: step >= s ? 'var(--color-background)' : 'var(--color-foreground-muted)'
                }}
              >
                {s}
              </div>
              {s < 3 && (
                <div 
                  className="w-16 h-0.5 mx-2"
                  style={{ 
                    background: step > s ? 'var(--color-accent-brass)' : 'var(--color-metadata)'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-display mb-6">Tell us about your situation</h1>
            <p className="text-xl mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
              We'll use this to find communities that match your needs.
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-label block mb-3">I'm looking for care for my...</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                >
                  <option value="">Select...</option>
                  <option value="parent">Parent</option>
                  <option value="spouse">Spouse/Partner</option>
                  <option value="myself">Myself</option>
                  <option value="relative">Other Relative</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-label block mb-3">Type of care needed</label>
                <select
                  value={formData.careType}
                  onChange={(e) => setFormData({ ...formData, careType: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                >
                  <option value="">Select...</option>
                  <option value="independent">Independent Living</option>
                  <option value="assisted">Assisted Living</option>
                  <option value="memory">Memory Care</option>
                  <option value="skilled">Skilled Nursing</option>
                  <option value="unsure">Not Sure</option>
                </select>
              </div>

              <div>
                <label className="text-label block mb-3">How soon do you need care?</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                >
                  <option value="">Select...</option>
                  <option value="immediate">Immediately (within 30 days)</option>
                  <option value="soon">1-3 months</option>
                  <option value="planning">3-6 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h1 className="text-display mb-6">Location & Preferences</h1>

            <div className="space-y-6">
              <div>
                <label className="text-label block mb-3">Preferred location (city or county)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3"
                  placeholder="e.g., Morris County, NJ"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                />
              </div>

              <div>
                <label className="text-label block mb-3">Monthly budget (if known)</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                >
                  <option value="">Select...</option>
                  <option value="under4">Under $4,000/mo</option>
                  <option value="4to6">$4,000 - $6,000/mo</option>
                  <option value="6to8">$6,000 - $8,000/mo</option>
                  <option value="8plus">$8,000+/mo</option>
                  <option value="unsure">Not Sure</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h1 className="text-display mb-6">Your contact information</h1>
            <p className="text-lg mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
              We'll share your request with matching communities and follow up with recommendations.
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-label block mb-3">Your name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                />
              </div>

              <div>
                <label className="text-label block mb-3">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                />
              </div>

              <div>
                <label className="text-label block mb-3">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                />
              </div>

              <div>
                <label className="text-label block mb-3">Anything else we should know?</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3"
                  style={{ 
                    background: 'var(--color-background-secondary)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                  placeholder="Any specific needs, questions, or preferences..."
                />
              </div>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <button onClick={handleBack} className="btn" style={{ borderRadius: '2px', border: '1px solid var(--color-metadata)' }}>
              ← Back
            </button>
          ) : (
            <Link href="/directory" className="btn" style={{ borderRadius: '2px', border: '1px solid var(--color-metadata)' }}>
              Cancel
            </Link>
          )}
          
          {step < 3 ? (
            <button 
              onClick={handleNext} 
              className="btn btn-primary"
              style={{ borderRadius: '2px' }}
            >
              Continue →
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              className="btn btn-primary"
              style={{ borderRadius: '2px' }}
            >
              Get Recommendations →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
