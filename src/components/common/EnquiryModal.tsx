import React, { useState, useEffect } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { BRAND_CONFIG } from '../../data/config';
import { X, Send, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import { GoldStar } from './BrandMotifs';

export const EnquiryModal: React.FC = () => {
  const { isOpen, data, closeEnquiry, generateEnquiryText, createMailtoUrl } = useEnquiry();

  const [formData, setFormData] = useState({
    clientName: '',
    contact: '',
    preferredDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [preparedNotice, setPreparedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPreparedNotice(false);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiry();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeEnquiry]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.clientName.trim()) {
      errs.clientName = 'Please enter your name';
    }
    if (!formData.contact.trim()) {
      errs.contact = 'Please enter your email or phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopy = () => {
    if (!validate()) return;
    const text = generateEnquiryText(formData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPreparedNotice(true);
    const mailto = createMailtoUrl(formData);
    window.location.href = mailto;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#332B2B]/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#FAF5EF] rounded-3xl border border-[#B39664]/30 shadow-2xl p-6 sm:p-8 text-[#332B2B]">
        
        {/* Close Button */}
        <button
          onClick={closeEnquiry}
          aria-label="Close enquiry modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FFFCF8] border border-[#794653]/15 flex items-center justify-center text-[#794653] hover:bg-[#794653] hover:text-[#FAF5EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7C7C0]/30 text-[#794653] text-[11px] uppercase tracking-widest font-sans font-medium mb-2">
            <Sparkles className="w-3 h-3 text-[#B39664]" />
            <span>UNICO Atelier Concierge</span>
          </div>

          <h3
            id="enquiry-modal-title"
            className="font-serif text-2xl sm:text-3xl text-[#332B2B] font-normal"
          >
            {data.type === 'style' ? 'Bespoke Style Enquiry' : 'Private Showroom Appointment'}
          </h3>
          <p className="font-script text-xl text-[#794653]">
            as unique as you
          </p>
        </div>

        {/* Product Summary Banner (if enquiry originated from a specific product) */}
        {data.product && (
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FFFCF8] border border-[#794653]/15 mb-6">
            <img
              src={data.product.images[0]}
              alt={data.product.name}
              className="w-14 h-16 object-cover rounded-xl"
            />
            <div className="flex-1 min-w-0 text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#B39664] font-sans font-semibold block">
                Selected Silhouette
              </span>
              <h4 className="font-serif text-base text-[#332B2B] truncate font-normal">
                {data.product.name}
              </h4>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#332B2B]/70 font-sans mt-0.5">
                {data.selectedColor && <span>Tone: <strong>{data.selectedColor}</strong></span>}
                {data.selectedSize && <span>Fit: <strong>{data.selectedSize}</strong></span>}
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
          <div>
            <label htmlFor="modal-name" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1">
              Your Name <span className="text-[#794653]">*</span>
            </label>
            <input
              id="modal-name"
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className={`w-full px-4 py-2.5 rounded-xl bg-[#FFFCF8] border ${
                errors.clientName ? 'border-red-400' : 'border-[#794653]/20'
              } focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans`}
            />
            {errors.clientName && (
              <p className="mt-1 text-xs text-red-500 font-sans">{errors.clientName}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-contact" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1">
              Email Address or Phone <span className="text-[#794653]">*</span>
            </label>
            <input
              id="modal-contact"
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="email@example.com or +44..."
              className={`w-full px-4 py-2.5 rounded-xl bg-[#FFFCF8] border ${
                errors.contact ? 'border-red-400' : 'border-[#794653]/20'
              } focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans`}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500 font-sans">{errors.contact}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-date" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1">
              Preferred Date or Occasion Timeline
            </label>
            <input
              id="modal-date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FFFCF8] border border-[#794653]/20 focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans"
            />
          </div>

          <div>
            <label htmlFor="modal-notes" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1">
              Bespoke Fitting Notes or Special Requests
            </label>
            <textarea
              id="modal-notes"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your event, preferred customization, or delivery timeframe..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FFFCF8] border border-[#794653]/20 focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-full bg-[#794653] hover:bg-[#582F3B] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Open in Email Client</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="py-3 px-5 rounded-full border border-[#B39664]/60 text-[#794653] hover:bg-[#FFFCF8] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Enquiry'}</span>
            </button>
          </div>

          {/* Demonstration Notice */}
          <div className="p-3.5 rounded-xl bg-[#FFFCF8] border border-[#B39664]/30 flex items-start gap-2.5 text-xs text-[#332B2B]/75 leading-relaxed mt-4">
            <AlertCircle className="w-4 h-4 text-[#B39664] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#794653]">Demonstration Notice:</span>{' '}
              This enquiry is generated as an email draft directed to <code>{BRAND_CONFIG.email}</code>. No payments or automatic bookings are made.
            </div>
          </div>

          {preparedNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800">
              ✓ Email client draft launched. If your mail app didn't pop up, use <strong>Copy Enquiry</strong> to paste into your preferred client.
            </div>
          )}

        </form>

      </div>
    </div>
  );
};
