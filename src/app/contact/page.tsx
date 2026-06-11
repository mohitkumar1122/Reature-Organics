"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating message transmission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full">
          Support Center
        </span>
        <h1 className="text-4xl font-serif font-bold text-darkText">Contact Our Team</h1>
        <p className="text-sm text-gray-500">
          Have queries regarding formulations, order delivery coordinates, or health conditions? Talk to us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Contact Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs">
            <h3 className="font-serif font-bold text-sm text-darkText border-b border-gray-50 pb-3">
              Reach Out Directly
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-darkText">Registered Office</h4>
                  <p className="text-gray-500 mt-1">108, Sacred Herbs Marg, DLF Phase 3, Gurugram, Haryana - 122002</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-darkText">Support Email</h4>
                  <a href="mailto:support@reatureorganic.com" className="text-gray-500 hover:text-primary transition-colors block mt-1">
                    support@reatureorganic.com
                  </a>
                  <a href="mailto:info@reatureorganic.com" className="text-gray-500 hover:text-primary transition-colors block">
                    info@reatureorganic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-darkText">Helpline Number</h4>
                  <a href="tel:+919876543210" className="text-gray-500 hover:text-primary transition-colors block mt-1">
                    +91 98765 43210
                  </a>
                  <span className="text-[10px] text-gray-400 font-semibold block">Mon-Sat: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100/50 flex items-center gap-2 text-[10px] text-gray-400 leading-normal">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <span>WHO-GMP Quality Assurance protocols are maintained in all communications.</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Contact Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-darkText flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Send An Inquiry
            </h3>

            {submitted ? (
              <div className="bg-primary-light border border-primary/20 text-primary p-6 rounded-2xl text-center space-y-2 text-xs">
                <span className="text-2xl block">📨</span>
                <h4 className="font-bold text-darkText">Message Sent Successfully</h4>
                <p className="text-gray-500">Thank you. An Ayurvedic representative will revert to your query within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-bold text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Formulation dosage, Bulk Orders, Shipping Query..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Inquiry Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-primary hover:bg-primary-dark text-white shadow transition-all disabled:opacity-55"
                >
                  <Send className="w-3.5 h-3.5" /> {loading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Mock Maps Embed */}
      <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-darkText">Our Clinic Location</h3>
        <div className="h-64 md:h-96 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.57962489622!2d77.08639209594689!3d28.4901614745864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1937ceea17db%3A0xea89a0ebf49e0b12!2sDLF%20Phase%203%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-none"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
