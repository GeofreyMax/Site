import { MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { validateContactForm } from '../utils/validation';
import { isSupabaseConfigured } from '../lib/supabase';
import { contactService } from '../services/database';

export default function Contact() {
  const dbConfigured = isSupabaseConfigured();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validate: (values) => {
      const errors = validateContactForm(values);
      return errors;
    },
    onSubmit: async (values) => {
      if (!dbConfigured) {
        throw new Error('Database is not configured. Please set up environment variables.');
      }
      await contactService.submit(
        values.name,
        values.email,
        values.phone,
        values.subject,
        values.message
      );
    },
  });

  const getFieldError = (fieldName: keyof typeof form.values) => {
    return form.touched[fieldName] ? form.errors[fieldName] : '';
  };

  return (
    <section id="contact" className="py-24 bg-[#0a1628]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#4da6ff] text-sm font-semibold tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-white mt-2">
            Contact Us
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#1a6fd4] to-[#1db954] mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-montserrat font-bold text-white text-xl mb-4">
                Head Office
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ready to work with us? Reach out for inquiries on any of our services.
                We respond promptly and are available 7 days a week.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a6fd4]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#4da6ff]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Address</div>
                  <div className="text-gray-400 text-sm leading-relaxed">
                    Mezzanine Floor, ALFA PLAZA,<br />
                    Ada Estate Street, Chabruma Road,<br />
                    P.O. Box 373, Dar es Salaam, Tanzania
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1db954]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#1db954]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Phone</div>
                  <a href="tel:+255767071788" className="text-gray-400 text-sm hover:text-white transition-colors">
                    +255 767 071 788
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Email</div>
                  <a href="mailto:infinitycarrentals77@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors break-all">
                    infinitycarrentals77@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden h-48 bg-white/5 border border-white/10 relative">
              <img
                src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
                alt="Dar es Salaam"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#1a6fd4] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                  Dar es Salaam, Tanzania
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              {form.success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-[#1db954]/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#1db954]" />
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={form.resetForm}
                    className="mt-6 text-[#4da6ff] text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit} className="space-y-5">
                  {!dbConfigured && (
                    <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-300 text-sm">Database is not configured. The form will display but submissions won't be saved. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.</p>
                    </div>
                  )}
                  {form.errors.submit && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-300 text-sm">{form.errors.submit}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-2">Full Name *</label>
                      <input
                        name="name"
                        value={form.values.name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="John Mwangi"
                        disabled={form.loading}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          getFieldError('name')
                            ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                            : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
                        } disabled:opacity-50`}
                      />
                      {getFieldError('name') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError('name')}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.values.email}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="john@company.com"
                        disabled={form.loading}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          getFieldError('email')
                            ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                            : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
                        } disabled:opacity-50`}
                      />
                      {getFieldError('email') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError('email')}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-2">Phone Number *</label>
                      <input
                        name="phone"
                        value={form.values.phone}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="+255 7XX XXX XXX"
                        disabled={form.loading}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          getFieldError('phone')
                            ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                            : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
                        } disabled:opacity-50`}
                      />
                      {getFieldError('phone') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError('phone')}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-2">Subject *</label>
                      <input
                        name="subject"
                        value={form.values.subject}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="What is this about?"
                        disabled={form.loading}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          getFieldError('subject')
                            ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
                            : 'border-white/20 focus:border-[#1a6fd4] focus:bg-white/10'
                        } disabled:opacity-50`}
                      />
                      {getFieldError('subject') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError('subject')}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.values.message}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      disabled={form.loading}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-all resize-none ${
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
                  <button
                    type="submit"
                    disabled={form.loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#1a6fd4] hover:bg-[#1560c0] disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
                  >
                    {form.loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Mail className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
