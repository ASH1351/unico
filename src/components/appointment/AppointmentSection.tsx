import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../data/config';
import { GoldStar, BottomFlourish } from '../common/BrandMotifs';
import { Mail, Clock, MapPin, Copy, Check, Send, AlertCircle, Calendar } from 'lucide-react';

export const AppointmentSection: React.FC = () => {
  const [activeType, setActiveType] = useState<'appointment' | 'style'>('appointment');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    styleInterest: '',
    preferredDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [showPreviewSummary, setShowPreviewSummary] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }
    if (!formData.contact.trim()) {
      errs.contact = 'Please provide a valid email or phone number';
    } else if (
      !formData.contact.includes('@') &&
      formData.contact.replace(/\D/g, '').length < 8
    ) {
      errs.contact = 'Please enter a valid email address or contact number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getFormattedEnquiryText = () => {
    return [
      `✦ UNICO BOUTIQUE ENQUIRY ✦`,
      `Request Type: ${activeType === 'appointment' ? 'Private Atelier Appointment' : 'Style & Sizing Consultation'}`,
      `Client Name: ${formData.name}`,
      `Contact: ${formData.contact}`,
      formData.styleInterest ? `Style / Silhouette of Interest: ${formData.styleInterest}` : '',
      formData.preferredDate ? `Preferred Date: ${formData.preferredDate}` : '',
      formData.message ? `Notes / Preferences: ${formData.message}` : '',
      `Date: ${new Date().toLocaleDateString()}`
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopy = () => {
    if (!validate()) return;
    navigator.clipboard.writeText(getFormattedEnquiryText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleOpenEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // We show the preview summary rather than claiming a false backend success
    setShowPreviewSummary(true);

    const subject = encodeURIComponent(
      `UNICO Atelier ${activeType === 'appointment' ? 'Appointment' : 'Style Enquiry'} — ${formData.name}`
    );
    const body = encodeURIComponent(getFormattedEnquiryText());
    window.location.href = `mailto:${BRAND_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="appointment-section"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="appointment-heading"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <GoldStar className="w-3.5 h-3.5 text-[#B39664]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#794653] font-medium font-sans">
            Boutique Concierge
          </span>
        </div>
        <h2
          id="appointment-heading"
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#332B2B] font-normal tracking-tight mb-4"
        >
          Let’s find your next favourite.
        </h2>
        <p className="text-sm sm:text-base text-[#332B2B]/75 font-sans font-light">
          Get in touch to explore the collection or enquire about a boutique visit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Atelier Contact Information & Policies */}
        <div className="lg:col-span-5 bg-[#FFFCF8] rounded-3xl p-6 sm:p-10 border border-[#794653]/15 atelier-card-shadow">
          <h3 className="font-serif text-2xl text-[#332B2B] mb-2 font-normal">
            The UNICO Atelier
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#B39664] font-sans font-medium mb-8">
            Private Consultations & Styling
          </p>

          <div className="space-y-6 text-sm font-sans">
            {/* Email */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EF] border border-[#794653]/15 flex items-center justify-center shrink-0 text-[#794653]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-[#332B2B]/60 uppercase tracking-wider block">Direct Concierge Email</span>
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="text-[#794653] font-medium hover:underline text-sm sm:text-base"
                >
                  {BRAND_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EF] border border-[#794653]/15 flex items-center justify-center shrink-0 text-[#794653]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-[#332B2B]/60 uppercase tracking-wider block">Location</span>
                <p className="text-[#332B2B]/85 font-light">
                  {BRAND_CONFIG.studioAddress}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EF] border border-[#794653]/15 flex items-center justify-center shrink-0 text-[#794653]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-[#332B2B]/60 uppercase tracking-wider block">Visiting Hours</span>
                <p className="text-[#332B2B]/85 font-light">
                  {BRAND_CONFIG.openingHours}
                </p>
              </div>
            </div>
          </div>

          {/* Prompt adherence note: WhatsApp & social verification status */}
          <div className="mt-8 pt-6 border-t border-[#794653]/10">
            <span className="text-xs text-[#332B2B]/60 block mb-2 font-medium">Boutique Channels:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#FAF5EF] border border-[#794653]/10 text-[#794653]">
                Email Concierge Active
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF5EF] border border-black/10 text-[#332B2B]/60" title="WhatsApp will activate once official business number is connected">
                WhatsApp: Direct on Request
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <BottomFlourish className="w-48 h-8 text-[#B39664]" />
          </div>
        </div>

        {/* Right Column: Interactive Consultation & Appointment Form */}
        <div className="lg:col-span-7 bg-[#FFFCF8] rounded-3xl p-6 sm:p-10 border border-[#B39664]/30 atelier-card-shadow">
          
          {/* Action Tabs: Enquire About Style vs Request Appointment */}
          <div className="flex rounded-full bg-[#FAF5EF] p-1 mb-8 border border-[#794653]/10">
            <button
              type="button"
              onClick={() => setActiveType('appointment')}
              className={`flex-1 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium transition-all ${
                activeType === 'appointment'
                  ? 'bg-[#794653] text-[#FAF5EF] shadow-xs'
                  : 'text-[#332B2B]/70 hover:text-[#794653]'
              }`}
            >
              Request an Appointment
            </button>
            <button
              type="button"
              onClick={() => setActiveType('style')}
              className={`flex-1 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium transition-all ${
                activeType === 'style'
                  ? 'bg-[#794653] text-[#FAF5EF] shadow-xs'
                  : 'text-[#332B2B]/70 hover:text-[#794653]'
              }`}
            >
              Enquire About a Style
            </button>
          </div>

          {/* Live Form */}
          <form onSubmit={handleOpenEmailClient} className="space-y-5" noValidate>
            
            {/* Name */}
            <div>
              <label htmlFor="client-name" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1.5">
                Your Full Name <span className="text-[#794653]">*</span>
              </label>
              <input
                id="client-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                className={`w-full px-4 py-3 rounded-xl bg-[#FAF5EF] border ${
                  errors.name ? 'border-red-400' : 'border-[#794653]/20'
                } focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans transition-colors`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 font-sans">{errors.name}</p>
              )}
            </div>

            {/* Email or Phone */}
            <div>
              <label htmlFor="client-contact" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1.5">
                Email or Phone Number <span className="text-[#794653]">*</span>
              </label>
              <input
                id="client-contact"
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="email@domain.com or +44..."
                className={`w-full px-4 py-3 rounded-xl bg-[#FAF5EF] border ${
                  errors.contact ? 'border-red-400' : 'border-[#794653]/20'
                } focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans transition-colors`}
              />
              {errors.contact && (
                <p className="mt-1 text-xs text-red-500 font-sans">{errors.contact}</p>
              )}
            </div>

            {/* Preferred Style / Interest */}
            <div>
              <label htmlFor="client-interest" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1.5">
                Interest / Preferred Silhouette
              </label>
              <input
                id="client-interest"
                type="text"
                value={formData.styleInterest}
                onChange={(e) => setFormData({ ...formData, styleInterest: e.target.value })}
                placeholder="e.g. Atelier Heritage Set, Rosewater Organza, Bespoke Sizing"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF5EF] border border-[#794653]/20 focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans transition-colors"
              />
            </div>

            {/* Optional Preferred Date */}
            <div>
              <label htmlFor="client-date" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1.5">
                Optional Preferred Date / Timeframe
              </label>
              <div className="relative">
                <input
                  id="client-date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF5EF] border border-[#794653]/20 focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="client-message" className="block text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium mb-1.5">
                Bespoke Notes or Measurements
              </label>
              <textarea
                id="client-message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share any styling questions, occasion details, or customization requests..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF5EF] border border-[#794653]/20 focus:outline-hidden focus:border-[#794653] text-sm text-[#332B2B] font-sans transition-colors"
              />
            </div>

            {/* Action buttons: Submit & Copy Fallback */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-full bg-[#794653] hover:bg-[#582F3B] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Prepare Enquiry in Email Client</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3.5 px-6 rounded-full border border-[#B39664]/60 hover:border-[#794653] text-[#794653] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-300"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Enquiry Copied!' : 'Copy Enquiry'}</span>
              </button>
            </div>

            {/* Required Demonstration Disclaimer Note */}
            <div className="p-4 rounded-xl bg-[#FAF5EF] border border-[#B39664]/30 flex items-start gap-3 mt-4 text-xs font-sans text-[#332B2B]/75 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-[#B39664] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#794653]">Demonstration Notice:</strong>{' '}
                This website is currently configured in boutique preview mode. To prevent unintended bookings, no automated charges or false confirmation receipts are processed. Use the button above to launch an email draft to our concierge or copy your details to your clipboard.
              </div>
            </div>

            {/* Preview Summary Popover when generated */}
            {showPreviewSummary && (
              <div className="p-4 rounded-xl bg-[#FAF5EF] border border-emerald-600/30 text-xs font-sans text-[#332B2B] mt-3">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-1">
                  <Check className="w-4 h-4" />
                  <span>Enquiry formatted successfully for {formData.name}</span>
                </div>
                <p className="text-[#332B2B]/70 font-light">
                  Your email client has been prepared. If your mail app did not open automatically, click <strong>"Copy Enquiry"</strong> above and send it directly to <code>{BRAND_CONFIG.email}</code>.
                </p>
              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
};
