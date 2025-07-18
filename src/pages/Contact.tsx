

import React, { useState } from "react";
import { post } from "../api/axios";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface FormData {
  user_name: string;
  user_email: string;
  serviceType: string;
  platform: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    serviceType: "",
    platform: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { message } = await post<{ message: string }, FormData>(
        "/contact/contact",
        formData
      );
      alert(message);
      setFormData({
        user_name: "",
        user_email: "",
        serviceType: "",
        platform: "",
        message: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const platforms = [
    "YouTube",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "TikTok",
    "Spotify",
  ];

  return (
    <div className="min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-tr from-[#000e1f] via-[#001e3c] to-[#001730] text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-3">Contact Our Team</h1>
          <p className="text-lg text-slate-300">
            We'd love to hear from you. Share your queries or feedback.
          </p>
        </motion.div>

        <motion.div
          className="bg-black/20 border border-[#00264D]/60 rounded-3xl grid md:grid-cols-2 gap-8 p-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="w-full border border-slate-600 bg-[#0f172a] text-white rounded-lg px-4 py-3 placeholder:text-slate-400"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="w-full border border-slate-600 bg-[#0f172a] text-white rounded-lg px-4 py-3 placeholder:text-slate-400"
              placeholder="Email Address"
            />
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full border border-slate-600 bg-[#0f172a] text-white rounded-lg px-4 py-3"
            >
              <option value="" disabled>Select Service</option>
              <option value="growth">Growth Service</option>
              <option value="management">Account Management</option>
              <option value="consultation">Strategy Consultation</option>
            </select>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
              className="w-full border border-slate-600 bg-[#0f172a] text-white rounded-lg px-4 py-3"
            >
              <option value="" disabled>Select Platform</option>
              {platforms.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-slate-600 bg-[#0f172a] text-white rounded-lg px-4 py-3 resize-none placeholder:text-slate-400"
              rows={4}
              placeholder="Tell us how we can help you..."
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-[#1a2a6c] to-[#4b6cb7] hover:from-[#0b1a3f] hover:to-[#1a2a6c] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Mail className="w-6 h-6 text-white" />,
                title: "Email",
                info: "support@engagesphere.com"
              },
              {
                icon: <Phone className="w-6 h-6 text-white" />,
                title: "Phone",
                info: "+1 (800) 123-4567"
              },
              {
                icon: <MapPin className="w-6 h-6 text-white" />,
                title: "Office",
                info: "123 Digital Ave, California, USA"
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-white" />,
                title: "Live Chat",
                info: "Mon–Fri, 9am–6pm PST"
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="bg-[#001e3c] p-3 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-slate-300">{item.info}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
