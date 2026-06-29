import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Leaf, Star } from 'lucide-react';



interface AboutContactProps {
  showNotification: (msg: string, type: 'success' | 'info') => void;
}

export const AboutContact: React.FC<AboutContactProps> = ({ showNotification }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showNotification('Please complete all fields before sending.', 'info');
      return;
    }

    // Simulate sending form to server
    setIsSubmitted(true);
    showNotification('Message sent successfully! Our eco-team will respond soon.', 'success');
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setSubject('General Inquiry');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* ABOUT STORY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Mission Text (Left) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/50 dark:border-emerald-800/30">
            <Leaf className="w-3.5 h-3.5" />
            <span>Our Environmental Mission</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Empowering Minds to <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-green-600 to-eco-blue-600 dark:from-eco-green-400 dark:to-eco-blue-400">Reimagine Waste</span>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every day, millions of tons of recyclable and upcyclable household materials are discarded into local municipal dumpsters. The <strong>Smart Reuse Idea Generator</strong> was born out of a desire to break this linear lifecycle. By combining modern interactive technology with detailed DIY instructions, we empower individuals to view waste not as trash, but as a valuable raw material.
          </p>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-800/35 flex gap-3 shadow-sm">
              <span className="text-2xl p-2 bg-emerald-500/10 text-emerald-600 rounded-xl w-fit h-fit">♻️</span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Divert Landfills</h4>
                <p className="text-slate-500 dark:text-slate-405 mt-1 leading-relaxed">Prevent plastic bottles, glass, tires, and cardboard from leaching toxins into municipal ecosystems.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-800/35 flex gap-3 shadow-sm">
              <span className="text-2xl p-2 bg-blue-500/10 text-blue-600 rounded-xl w-fit h-fit">💡</span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Foster Innovation</h4>
                <p className="text-slate-500 dark:text-slate-405 mt-1 leading-relaxed">Nurture custom creativity and critical engineering skills through easy, rewarding upcycling crafts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase (Right) */}
        <div className="lg:col-span-5 relative">
          {/* Floating graphic design */}
          <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-eco-green-500/15 rounded-full blur-2xl -z-10 animate-float-slow" />
          
          <div className="glass-panel rounded-3xl p-8 border border-white/20 dark:border-slate-800/40 shadow-xl space-y-6 text-center bg-gradient-to-br from-eco-green-500/5 via-transparent to-eco-blue-500/5">
            <span className="text-6xl p-4 bg-white/35 dark:bg-slate-950/30 rounded-3xl inline-block border border-white/20 animate-float-medium">🌱</span>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-850 dark:text-white">Zero-Waste Community</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                We believe that circular manufacturing begins at home. Together, we can upcycle a sustainable future, one plastic bottle at a time.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-eco-green-600 dark:text-eco-green-400 uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <span>5,000+ Active Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & MAP SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info & Mock Map (Left) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-905 dark:text-white">Get in Touch</h3>
            <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
              Have questions about upcycling methods? Want to partner with our environmental node? Drop us a message, or visit our green headquarters.
            </p>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-150/40 dark:border-slate-800/40 rounded-xl text-eco-green-600">
                  <Mail className="w-4 h-4" />
                </div>
                <span>contact@smartreuse.eco</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-150/40 dark:border-slate-800/40 rounded-xl text-eco-blue-600">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (800) 555-REUSE</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-150/40 dark:border-slate-800/40 rounded-xl text-emerald-605">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>42 Green Canopy Ave, Seattle, WA</span>
              </div>
            </div>
          </div>

          {/* Styled Mock Map */}
          <div className="h-44 rounded-2xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/45 overflow-hidden relative p-4 flex flex-col justify-end shadow-inner">
            {/* Custom stylized grid representing map lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
            
            {/* Map Pin Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-eco-green-500/20 flex items-center justify-center animate-ping absolute" />
              <MapPin className="w-7 h-7 text-eco-green-600 drop-shadow-md relative z-10 animate-bounce" />
            </div>

            <div className="relative z-10 p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200/50 dark:border-slate-800 rounded-xl shadow text-[10px] text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200">ReNova HQ Lab</span>
              <p className="mt-0.5">Green Canopy Eco-Hub, Unit 42</p>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 border border-white/20 dark:border-slate-800/40 shadow-lg h-full">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-5 h-5 text-eco-green-600" />
                  <span>Send a Message</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-eco-green-500 focus:ring-1 focus:ring-eco-green-500/20 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-eco-green-500 focus:ring-1 focus:ring-eco-green-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 rounded-xl p-2.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-eco-green-500"
                  >
                    <option>General Inquiry</option>
                    <option>Report a Bug / DIY Idea Suggestion</option>
                    <option>Business Partnership</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you upcycle?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-eco-green-500 focus:ring-1 focus:ring-eco-green-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full glass-button inline-flex items-center justify-center gap-2 bg-gradient-to-r from-eco-green-600 to-eco-green-700 hover:from-eco-green-500 hover:to-eco-green-600 text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-205"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-scaleUp">
                <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/50 shadow-inner">
                  <ShieldCheck className="w-12 h-12 text-eco-green-600 dark:text-eco-green-400 animate-bounce" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Message Transmitted!</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Thanks for reaching out, {name}. Our team of upcycling moderators has received your report and will follow up within 24 hours.
                  </p>
                </div>
                <button
                  onClick={handleResetForm}
                  className="text-xs font-black text-eco-green-605 dark:text-eco-green-400 hover:underline flex items-center gap-1 mt-2"
                >
                  <Send className="w-3 h-3" />
                  <span>Send another message</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
