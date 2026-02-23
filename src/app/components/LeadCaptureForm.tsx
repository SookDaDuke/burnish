"use client";

import { useState } from "react";

interface LeadCaptureFormProps {
  communityName: string;
  onSuccess?: () => void;
}

export default function LeadCaptureForm({ communityName, onSuccess }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeline: "",
    careNeeds: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div 
        className="p-6 text-center"
        style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
      >
        <div className="text-3xl mb-4" style={{ color: 'var(--color-accent-brass)' }}>✓</div>
        <h3 className="text-section-header mb-2">Request Sent</h3>
        <p style={{ color: 'var(--color-foreground-muted)' }}>
          We'll share your interest with {communityName} and they'll reach out soon.
        </p>
        <p className="mt-4 text-sm" style={{ color: 'var(--color-metadata)' }}>
          Questions? Reach us at hello@burnish.com
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-label block mb-2" style={{ color: 'var(--color-metadata)' }}>
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-label block mb-2" style={{ color: 'var(--color-metadata)' }}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
          placeholder="jane@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-label block mb-2" style={{ color: 'var(--color-metadata)' }}>
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="timeline" className="text-label block mb-2" style={{ color: 'var(--color-metadata)' }}>
          Timeline *
        </label>
        <select
          id="timeline"
          required
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="w-full px-4 py-3"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
        >
          <option value="">Select a timeline</option>
          <option value="immediate">Immediately (within 30 days)</option>
          <option value="soon">Soon (1-3 months)</option>
          <option value="planning">Planning (3-6 months)</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>

      <div>
        <label htmlFor="careNeeds" className="text-label block mb-2" style={{ color: 'var(--color-metadata)' }}>
          Care Needs *
        </label>
        <select
          id="careNeeds"
          required
          value={formData.careNeeds}
          onChange={(e) => setFormData({ ...formData, careNeeds: e.target.value })}
          className="w-full px-4 py-3"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
        >
          <option value="">Select care type</option>
          <option value="independent">Independent Living</option>
          <option value="assisted">Assisted Living</option>
          <option value="memory">Memory Care</option>
          <option value="skilled">Skilled Nursing</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
        style={{ borderRadius: '2px', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Sending..." : "Request Information"}
      </button>

      <p className="text-xs text-center" style={{ color: 'var(--color-metadata)' }}>
        By submitting, you agree to be contacted by {communityName} and Burnish. 
        We respect your privacy — no spam, ever.
      </p>
    </form>
  );
}
