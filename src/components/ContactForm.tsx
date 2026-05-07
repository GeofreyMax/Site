import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { validateContactForm } from '../utils/validation';
import { contactService } from '../services/database';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validate: validateContactForm,
    onSubmit: async (values) => {
      setSubmitError(null);
      try {
        await contactService.submit(
          values.name,
          values.email,
          values.phone,
          values.subject,
          values.message
        );
        // Form reset is handled by useForm
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
        setSubmitError(message);
        throw error;
      }
    },
  });

  const getFieldError = (fieldName: keyof ContactFormData) => {
    return form.touched[fieldName] ? form.errors[fieldName] : '';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
      <h3 className="font-montserrat text-2xl font-bold text-white mb-6">Send us a Message</h3>

      {form.success && (
        <div className="mb-6 p-4 bg-[#1db954]/20 border border-[#1db954]/50 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-[#1db954] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#1db954] font-semibold">Success!</p>
            <p className="text-gray-300 text-sm">We've received your message and will get back to you soon.</p>
          </div>
        </div>
      )}

      {form.errors.submit && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{form.errors.submit}</p>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{submitError}</p>
        </div>
      )}

      <form onSubmit={form.handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
            Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Your full name"
            disabled={form.loading}
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all ${
              getFieldError('name')
                ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
            } disabled:opacity-50`}
          />
          {getFieldError('name') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('name')}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="your@email.com"
            disabled={form.loading}
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all ${
              getFieldError('email')
                ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
            } disabled:opacity-50`}
          />
          {getFieldError('email') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('email')}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="+255 XXX XXX XXX"
            disabled={form.loading}
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all ${
              getFieldError('phone')
                ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
            } disabled:opacity-50`}
          />
          {getFieldError('phone') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('phone')}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
            Subject *
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={form.values.subject}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="What is this about?"
            disabled={form.loading}
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all ${
              getFieldError('subject')
                ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
            } disabled:opacity-50`}
          />
          {getFieldError('subject') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('subject')}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={form.values.message}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Tell us more about your inquiry..."
            rows={5}
            disabled={form.loading}
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all resize-none ${
              getFieldError('message')
                ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
            } disabled:opacity-50`}
          />
          {getFieldError('message') && (
            <p className="text-red-400 text-xs mt-1">{getFieldError('message')}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            {form.values.message.length}/5000 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={form.loading || form.success}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a6fd4] hover:bg-[#1560c0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-lg mt-8"
        >
          {form.loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : form.success ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Message Sent!
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>

      <p className="text-gray-400 text-xs text-center mt-4">
        We typically respond within 24 hours
      </p>
    </div>
  );
}
