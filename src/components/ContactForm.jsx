"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Contact Form */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 mb-8 border-l-4 border-brand-primary pl-4">Send Us a Message</h2>
        
        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 p-8 rounded-[2px] text-center">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-black uppercase mb-2">Message Sent!</h3>
            <p className="text-gray-600 font-serif">Thank you for contacting us. We'll get back to you shortly.</p>
            <button onClick={() => setStatus("idle")} className="mt-6 text-brand-primary font-bold uppercase text-sm tracking-widest hover:underline">
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="p-4 border border-gray-200 rounded-[2px] text-sm font-medium focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="p-4 border border-gray-200 rounded-[2px] text-sm font-medium focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-4 border border-gray-200 rounded-[2px] text-sm font-medium focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Your phone number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="p-4 border border-gray-200 rounded-[2px] text-sm font-medium focus:outline-none focus:border-brand-primary transition-colors bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="editorial">Editorial / News Tip</option>
                  <option value="advertising">Advertising Inquiry</option>
                  <option value="partnership">Partnership / Collaboration</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">Message *</label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="p-4 border border-gray-200 rounded-[2px] text-sm font-medium focus:outline-none focus:border-brand-primary transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="self-start px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-widest hover:bg-black transition-colors rounded-[2px] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 mb-8 border-l-4 border-brand-primary pl-4">Contact Information</h2>
          
          <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase mb-2">Corporate Office</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      No 6, Sanyaolu Street,<br />
                      Off Kudirat Abiola Way,<br />
                      Oregun, Ikeja, Lagos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase mb-2">Phone</h3>
                    <div className="flex flex-col gap-1">
                      <a href="tel:08033010474" className="text-[15px] text-gray-600 hover:text-brand-primary transition-colors">08033010474</a>
                      <a href="tel:08023023067" className="text-[15px] text-gray-600 hover:text-brand-primary transition-colors">08023023067</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase mb-2">Email</h3>
                    <div className="flex flex-col gap-1">
                      <a href="mailto:info@globalexcellenceonline.com" className="text-[15px] text-gray-600 hover:text-brand-primary transition-colors">info@globalexcellenceonline.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 mb-6 border-l-4 border-brand-primary pl-4">Follow Us</h2>
              <div className="flex gap-4">
                <a href="https://facebook.com/globalexcellence" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors rounded-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="https://twitter.com/globalexcellence" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors rounded-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="https://instagram.com/globalexcellence" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors rounded-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://youtube.com/@globalexcellence" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors rounded-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}