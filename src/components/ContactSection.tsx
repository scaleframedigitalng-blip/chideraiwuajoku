import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Check,
  Copy,
  Send,
  Clock,
  MapPin,
} from 'lucide-react';
import { SiteConfig, ContactInquiry } from '../types/content';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactInquiry | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const cleanWhatsAppNumber = config.personal.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedGreeting = encodeURIComponent(config.personal.whatsappWelcomeMessage);
  const whatsAppUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodedGreeting}`;

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errors.subject = 'Please specify a consultation subject.';
    if (!formData.message.trim()) {
      errors.message = 'Please include a brief message.';
    } else if (formData.message.trim().length < 15) {
      errors.message = 'Please provide at least 15 characters of detail.';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    // Simulate reliable submission & store locally
    setTimeout(() => {
      const newInquiry: ContactInquiry = {
        id: 'inq_' + Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleString('en-NG', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      };

      try {
        const stored = localStorage.getItem('chidera_inquiries_v1');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newInquiry);
        localStorage.setItem('chidera_inquiries_v1', JSON.stringify(list));
      } catch (err) {
        console.warn('Could not save inquiry:', err);
      }

      setIsSubmitting(false);
      setSubmittedInquiry(newInquiry);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    }, 700);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-20 md:py-32 bg-[#FAF9F5] border-b border-[#382A22]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 pb-12 md:pb-16 border-b border-[#382A22]/10">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#444B35] font-semibold">
            Direct Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#382A22] font-normal leading-[1.15] text-balance">
            Let's Have a Conversation.
          </h2>
          <p className="text-base sm:text-lg font-sans font-light text-[#382A22]/80 leading-relaxed pt-2">
            Whether you are evaluating a specific property, considering residential acquisition, or require an informed perspective on Nigerian real estate, I welcome direct correspondence.
          </p>
        </div>

        {/* 2-Column Split: Direct Channels vs. Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 md:pt-16 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* Prominent WhatsApp Channel */}
            <div className="p-6 md:p-8 bg-[#F3EFE4] border border-[#B8AA91]/40 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[#444B35]">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-sans uppercase tracking-[0.18em] font-semibold">
                    Instant Messaging
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#382A22]/50 font-sans">
                  Direct Response
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl text-[#382A22]">
                  WhatsApp Consultation
                </h3>
                <p className="text-sm font-sans text-[#382A22]/75 leading-relaxed font-light">
                  For immediate questions, advisory scheduling, or brief inquiries regarding property opportunities.
                </p>
              </div>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.16em] font-medium hover:bg-[#382A22] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </a>

              <p className="text-[11px] text-[#382A22]/50 font-sans text-center">
                Phone: +{cleanWhatsAppNumber || '2348000000000'}
              </p>
            </div>

            {/* Email Channel */}
            <div className="p-6 md:p-8 bg-[#FAF9F5] border border-[#382A22]/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#444B35]">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-sans uppercase tracking-[0.18em] font-semibold">
                    Formal Correspondence
                  </span>
                </div>
              </div>

              <a
                href={`mailto:${config.personal.email}`}
                className="block font-serif text-xl sm:text-2xl text-[#382A22] hover:text-[#444B35] transition-colors break-all"
              >
                {config.personal.email}
              </a>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-[#382A22]/70 hover:text-[#444B35] transition-colors py-1"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#444B35]" />
                      <span className="text-[#444B35] font-medium">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Professional Networks */}
            <div className="p-6 md:p-8 bg-[#FAF9F5] border border-[#382A22]/10 space-y-4">
              <span className="text-xs font-sans uppercase tracking-[0.18em] text-[#382A22]/60 font-semibold block">
                Professional Presence
              </span>

              <div className="space-y-3 text-sm font-sans">
                <a
                  href={config.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 border-b border-[#382A22]/10 text-[#382A22] hover:text-[#444B35] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#444B35]" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={config.personal.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 border-b border-[#382A22]/10 text-[#382A22] hover:text-[#444B35] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="w-4 h-4 text-[#444B35]" />
                    <span>Instagram Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Advisory Hours & Discretion note */}
            <div className="flex items-center gap-6 text-xs text-[#382A22]/65 font-sans pt-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#444B35]" />
                <span>Monday – Saturday (WAT)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#444B35]" />
                <span>Nigeria</span>
              </div>
            </div>
          </div>

          {/* Right Column: Refined Contact Form */}
          <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#B8AA91]/40 p-8 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-2 border-b border-[#382A22]/10 pb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#382A22]">
                Send an Inquiry
              </h3>
              <p className="text-sm font-sans font-light text-[#382A22]/70 leading-relaxed">
                Provide preliminary details regarding your property interests or consultation requirements.
              </p>
            </div>

            {submittedInquiry ? (
              <div className="py-8 px-6 bg-[#F3EFE4] border border-[#444B35]/30 space-y-4">
                <div className="flex items-center gap-2.5 text-[#444B35]">
                  <Check className="w-5 h-5" />
                  <p className="font-serif text-xl font-medium">Thank You, {submittedInquiry.fullName}</p>
                </div>
                <p className="text-sm font-sans text-[#382A22]/80 leading-relaxed font-light">
                  Your inquiry regarding <strong className="font-medium text-[#382A22]">"{submittedInquiry.subject}"</strong> has been received. Chidera will review your notes and respond to <strong className="font-medium text-[#382A22]">{submittedInquiry.email}</strong> promptly.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedInquiry(null)}
                    className="px-4 py-2 border border-[#382A22]/30 text-xs font-sans uppercase tracking-[0.12em] text-[#382A22] hover:bg-[#FAF9F5] transition-colors"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.12em] font-medium hover:bg-[#382A22] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Follow up on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-sans uppercase tracking-[0.14em] text-[#382A22]/80 font-medium"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="e.g. Adebayo Adeleke"
                      className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-[#382A22] placeholder-[#382A22]/30 focus:outline-none transition-colors ${
                        formErrors.fullName
                          ? 'border-red-600 focus:border-red-700'
                          : 'border-[#382A22]/20 focus:border-[#444B35]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-sans uppercase tracking-[0.14em] text-[#382A22]/80 font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-[#382A22] placeholder-[#382A22]/30 focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-600 focus:border-red-700'
                          : 'border-[#382A22]/20 focus:border-[#444B35]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-sans uppercase tracking-[0.14em] text-[#382A22]/80 font-medium"
                  >
                    Subject of Consultation *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Property Acquisition in Lekki / Advisory on Due Diligence"
                    className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-[#382A22] placeholder-[#382A22]/30 focus:outline-none transition-colors ${
                      formErrors.subject
                        ? 'border-red-600 focus:border-red-700'
                        : 'border-[#382A22]/20 focus:border-[#444B35]'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-sans uppercase tracking-[0.14em] text-[#382A22]/80 font-medium"
                  >
                    Message & Property Objectives *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Please outline your property inquiries, timeline, location preferences, or specific guidance required..."
                    className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-[#382A22] placeholder-[#382A22]/30 focus:outline-none transition-colors resize-y ${
                      formErrors.message
                        ? 'border-red-600 focus:border-red-700'
                        : 'border-[#382A22]/20 focus:border-[#444B35]'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.16em] font-medium hover:bg-[#382A22] transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#382A22]/50 font-sans">
                    All correspondence is held in strict professional confidence.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
