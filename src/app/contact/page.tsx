  "use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck,
  Clock, Sparkles, CheckCircle, Home, ChevronRight,
  Headphones, Globe, Award,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      lines: ["1800-8908-121", "+91 8006762121"],
      sub: "Mon-Sat, 9 AM - 6 PM",
      color: "from-primary to-primary-dark",
      action: "tel:+1800-8908-121",
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["care@reature.in", "reatureorganics@gmail.com"],
      sub: "Reply within 24 hours",
      color: "from-secondary to-secondary-dark",
      action: "mailto:care@reature.in",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      lines: ["Quick chat support"],
      sub: "Instant responses",
      color: "from-green-500 to-green-600",
      action: "https://wa.me/8006762121",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Query" },
    { value: "product", label: "Product Info" },
    { value: "order", label: "Order Support" },
    { value: "bulk", label: "Bulk Orders" },
    { value: "feedback", label: "Feedback" },
  ];

  return (
    <div className="bg-gradient-to-b from-lightBg via-white to-lightBg min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-x-20 translate-y-20" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/70 mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3 h-3" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-5">
              <Headphones className="w-3 h-3 text-secondary" />
              24/7 Support Center
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold leading-[1.1] mb-4">
              Let's Start a
              <span className="block text-secondary italic mt-2">Conversation</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl">
              Have queries about formulations, orders, or your wellness journey? Our Ayurvedic experts are here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Contact Methods Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-20">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.action}
              target={method.action.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-large hover:shadow-glow-primary hover:border-primary/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} text-white flex items-center justify-center mb-4 shadow-medium group-hover:scale-110 group-hover:rotate-6 transition-all`}
              >
                <method.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-darkText mb-2">
                {method.title}
              </h3>
              <div className="space-y-0.5">
                {method.lines.map((line, j) => (
                  <p
                    key={j}
                    className="text-sm text-gray-600 font-medium group-hover:text-primary transition-colors"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 font-semibold inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {method.sub}
              </p>
            </motion.a>
          ))}
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Office Address */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <h3 className="font-serif font-bold text-lg text-darkText mb-5 flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                Visit Our Office
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-darkText uppercase tracking-wider mb-1">
                    Registered Office
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Agra-Mathura Bypass Opposite,<br />
                    Rahmatpur Garhmai (Near Kamalpur Chauraha),<br />
                    Aligarh 202002, Uttar Pradesh,<br />
                    India.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-darkText uppercase tracking-wider mb-2">
                    Business Hours
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monday - Friday</span>
                      <span className="font-bold text-darkText">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Saturday</span>
                      <span className="font-bold text-darkText">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sunday</span>
                      <span className="font-bold text-red-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <h3 className="font-serif font-bold text-lg text-darkText mb-5 flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Globe className="w-4 h-4" />
                </div>
                Follow Us
              </h3>

              <div className="grid grid-cols-4 gap-3">
                {[
                {
                  Icon: FaFacebookF,
                  color: "bg-[#1877F2]",
                  label: "Facebook",
                  url: "https://facebook.com/yourpage"
               },
               {
                  Icon: FaInstagram,
                  color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
                  label: "Instagram",
                  url: "https://www.instagram.com/reatureofficial?igsh=MThsZ2syenBpODZ2bA=="
               },
               {
                  Icon: FaXTwitter,
                  color: "bg-darkText",
                  label: "Twitter",
                  url: "https://x.com/yourpage"
              },
              {
                  Icon: FaYoutube,
                  color: "bg-[#FF0000]",
                  label: "YouTube",
                  url: "https://youtube.com/@yourchannel"
              },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={social.label}
                    className={`${social.color} text-white aspect-square rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-sm`}
                  >
                    <social.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Connect for daily wellness tips & offers
              </p>
            </div>

            {/* Trust Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#003D1B] text-white p-6 rounded-3xl shadow-large">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Secure & Confidential</h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  All communications are protected under WHO-GMP quality protocols. Your data is encrypted and never shared.
                </p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <Award className="w-4 h-4 text-secondary" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    ISO Certified Support
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-light to-secondary-light/40 px-6 md:px-8 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-darkText">
                      Send Us a Message
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-primary-light to-secondary-light/40 border border-primary/20 p-8 rounded-2xl text-center space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-medium">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-xl text-darkText">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        Thank you for reaching out. An Ayurvedic representative will revert to your query within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Inquiry Type */}
                    <div>
                      <label className="text-xs font-bold text-darkText uppercase tracking-wider block mb-3">
                        What can we help you with?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, inquiryType: type.value })
                            }
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                              formData.inquiryType === type.value
                                ? "bg-primary border-primary text-white shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Hariom Singh"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Hariom@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 8006762121"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Product query, order issue..."
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-darkText uppercase tracking-wider">
                        Your Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Tell us in detail about your inquiry..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none transition-all"
                      />
                      <p className="text-[10px] text-gray-400 text-right">
                        {formData.message.length} characters
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow-primary text-white transition-all duration-300 disabled:opacity-55"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Inquiry
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                            inquiryType: "general",
                          })
                        }
                        className="px-6 py-3.5 rounded-full text-sm font-bold bg-gray-100 hover:bg-gray-200 text-darkText transition-all"
                      >
                        Reset
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 pt-2">
                      <ShieldCheck className="w-3 h-3" />
                      Your information is encrypted and secure
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-darkText">
                  Find Us On Map
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                   Agra-Mathura Bypass Opposite,<br />
                    Rahmatpur Garhmai (Near Kamalpur Chauraha),<br />
                    Aligarh 202002, Uttar Pradesh,<br />
                    India.
                </p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/place/ReaTure+Organics+Pvt+Ltd/@27.846224,78.105881,16z/data=!4m6!3m5!1s0x3974a3ba1f9ba727:0xc1af6086228036e9!8m2!3d27.8459547!4d78.110599!16s%2Fg%2F11mvwcnwbh?hl=en&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-primary-light text-primary hover:bg-primary hover:text-white transition-all"
            >
              Open in Maps
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="h-72 md:h-96 w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.81638958061!2d78.1083053150651!3d27.846181682734674!2m3!1f0!2f0!3f0!
              3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a3ba1f9ba727%3A0xc1af6086228036e9!2sReaTure%20
              Organics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1627294172235!5m2!1sen!2sin"
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
