import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { IMAGES } from './images';

// ===== FRESH GRAIN OVERLAY (very subtle) =====
function FreshOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015]">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px'
      }} />
    </div>
  );
}

// ===== SCROLL PROGRESS BAR =====
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 z-[95] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ===== HEADER =====
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-sky-100/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200/50">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-gray-800 font-bold text-xl tracking-tight">LINT</span>
              <span className="block text-[10px] uppercase tracking-widest text-sky-500/60">Professional</span>
            </div>
          </motion.div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {['Gamma', 'Settori', 'Qualità', 'Blog', 'Contatti'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 text-sm font-medium hover:text-sky-500 transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <motion.a
            href="#contatti"
            className="hidden lg:block bg-gradient-to-r from-sky-400 to-cyan-400 text-white px-7 py-3 rounded-full text-sm font-semibold shadow-lg shadow-sky-200/50 hover:shadow-xl hover:shadow-sky-300/50 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Preventivo
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 p-2"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="w-full h-[2px] bg-gray-700 block rounded-full" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="w-full h-[2px] bg-gray-700 block rounded-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="w-full h-[2px] bg-gray-700 block rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-sky-100"
          >
            <div className="px-6 py-8 space-y-6">
              {['Gamma', 'Settori', 'Qualità', 'Blog', 'Contatti'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-700 text-lg font-medium" onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ===== HERO =====
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      {/* Background image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img 
          src={IMAGES.hero} 
          alt="Panni in Microfibra Professionali"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/70 via-white/50 to-cyan-50/70" />
        {/* Soft gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-[150px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-[120px]"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[100px]"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-sky-200/50 rounded-full px-5 py-2.5 shadow-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 font-medium">Forniture Professionali B2B</span>
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8"
        >
          <span className="block text-gray-800">Panni in</span>
          <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Microfibra
          </span>
          <span className="block text-gray-400 text-[0.4em] font-light tracking-wide mt-4">Professionali</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          Selezioniamo e distribuiamo i migliori panni in microfibra per i settori più esigenti. 
          Soluzioni tecniche per risultati impeccabili e duraturi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#contatti"
            className="group relative bg-gradient-to-r from-sky-400 to-cyan-400 text-white px-10 py-4 rounded-full text-sm font-semibold shadow-xl shadow-sky-200/50 hover:shadow-2xl hover:shadow-sky-300/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Richiedi Preventivo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#gamma"
            className="bg-white/60 backdrop-blur-sm border border-sky-200/50 text-gray-700 px-10 py-4 rounded-full text-sm font-semibold hover:bg-white hover:border-sky-300 transition-all duration-300 shadow-sm"
          >
            Esplora la Gamma
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '500+', label: 'Cicli Lavaggio', color: 'from-sky-400 to-cyan-400' },
            { value: '99.9%', label: 'Batteri Rimossi', color: 'from-cyan-400 to-emerald-400' },
            { value: '-90%', label: 'Uso Chimici', color: 'from-emerald-400 to-teal-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.7 + i * 0.1 }}
            >
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[2px] h-12 bg-gradient-to-b from-sky-300 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

// ===== SECTION REVEAL WRAPPER =====
function RevealSection({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ===== GAMMA / CATEGORIES =====
function Gamma() {
  const categories = [
    { icon: '🧽', title: 'Panni in Microfibra', desc: 'Grammature e trame specifiche per ogni applicazione professionale.', tag: 'CORE', gradient: 'from-sky-400 to-blue-400' },
    { icon: '🔧', title: 'Accessori', desc: 'Spazzole anti-graffio, pistole pneumatiche, sistemi di lavaggio.', tag: 'TOOLS', gradient: 'from-cyan-400 to-teal-400' },
    { icon: '⚙️', title: 'Ricambi', desc: 'Componenti per aspiratori, mop e sistemi a estrazione.', tag: 'PARTS', gradient: 'from-emerald-400 to-green-400' },
    { icon: '🧪', title: 'Prodotti Chimici', desc: 'Formule concentrate: sgrassanti, detergenti, disinfettanti.', tag: 'CHEM', gradient: 'from-teal-400 to-cyan-400' },
  ];

  return (
    <RevealSection id="gamma" className="py-32 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">La Nostra Gamma</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-4 tracking-tight">
              Soluzioni per Ogni<br />
              <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">Esigenza</span>
            </h2>
            <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto font-light">
              Non un semplice panno: la soluzione giusta per ogni compito.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="group bg-gradient-to-br from-white to-sky-50/30 rounded-3xl p-8 border border-sky-100/50 hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${cat.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-sky-200/30 group-hover:scale-110 transition-transform duration-500`}>
                {cat.icon}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-sky-400/60 font-semibold mb-2">
                {cat.tag}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors duration-300">
                {cat.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {cat.desc}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sky-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs uppercase tracking-wider font-semibold">Scopri</span>
                <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== PRODUCT LINES =====
function ProductLines() {
  const lines = [
    {
      num: '01',
      title: 'Multiuso',
      subtitle: 'Professional Grade',
      desc: 'Densità di fibre superiore per assorbimento e resistenza eccezionali. Il fondamento di ogni kit professionale.',
      specs: ['300+ GSM', '500 cicli lavaggio', 'Multi-superficie'],
      gradient: 'from-sky-400 to-blue-500',
      image: IMAGES.multiuso
    },
    {
      num: '02',
      title: 'Vetri & Finiture',
      subtitle: 'Crystal Clear',
      desc: 'Trame specifiche ingegnerizzate per finitura cristallina. Zero aloni, zero striature, zero pelucchi.',
      specs: ['Nido d\'ape', 'Ultra-fine', 'Anti-alone'],
      gradient: 'from-cyan-400 to-teal-500',
      image: IMAGES.vetri
    },
    {
      num: '03',
      title: 'Car Detailing',
      subtitle: 'Edgeless Technology',
      desc: 'Bordi in seta, senza cuciture o taglio laser. La selezione curata per i detailer più esigenti.',
      specs: ['Edgeless', 'Bordo seta', 'GSM 300-1200'],
      gradient: 'from-emerald-400 to-green-500',
      image: IMAGES.detailing
    },
  ];

  return (
    <RevealSection className="py-32 lg:py-40 bg-gradient-to-b from-white via-sky-50/30 to-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Le Nostre Linee</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-4 tracking-tight">
            Ogni Dettaglio<br />
            <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">Conta</span>
          </h2>
        </div>

        <div className="space-y-8">
          {lines.map((line, i) => (
            <motion.div
              key={line.num}
              className="group grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 lg:p-12 border border-sky-100/50 hover:shadow-2xl hover:shadow-sky-100/30 transition-all duration-500"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              {/* Number */}
              <div className="lg:col-span-1">
                <span className={`text-sm font-bold bg-gradient-to-r ${line.gradient} bg-clip-text text-transparent`}>
                  {line.num}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className={`w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-sky-200/30 flex-shrink-0`}>
                  <img src={line.image} alt={line.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-sky-400/60 font-semibold mb-1">{line.subtitle}</div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-sky-600 transition-colors duration-300">
                    {line.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-gray-500 font-light leading-relaxed">{line.desc}</p>
              </div>

              {/* Specs */}
              <div className="lg:col-span-3 flex lg:justify-end">
                <div className="flex flex-wrap gap-2">
                  {line.specs.map((spec) => (
                    <span key={spec} className={`text-[10px] tracking-wider uppercase font-semibold bg-gradient-to-r ${line.gradient} text-white px-3 py-1.5 rounded-full shadow-sm`}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== QUALITÀ =====
function Qualita() {
  const pillars = [
    { num: 'I', title: 'Sostenibilità', value: '90%', label: 'meno chimici', desc: 'Alta efficacia pulente con la sola acqua. Riduzione drastica dei detergenti chimici.', image: IMAGES.sostenibilita, gradient: 'from-emerald-400 to-green-500' },
    { num: 'II', title: 'Durata', value: '500+', label: 'cicli a 90°C', desc: 'Resistenza certificata. Un investimento, non un costo ricorrente.', image: IMAGES.durata, gradient: 'from-sky-400 to-blue-500' },
    { num: 'III', title: 'Efficacia', value: '99.9%', label: 'batteri rimossi', desc: 'Certificazione indipendente. Standard sanitari e detailing.', image: IMAGES.efficacia, gradient: 'from-cyan-400 to-teal-500' },
  ];

  return (
    <RevealSection id="qualità" className="py-32 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">La Differenza LINT</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-4 tracking-tight">
            Qualità, Durata e<br />
            <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">Sostenibilità</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              className="group bg-gradient-to-br from-white to-sky-50/30 rounded-3xl p-10 border border-sky-100/50 hover:shadow-2xl hover:shadow-sky-100/30 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <div className="w-full h-48 rounded-2xl overflow-hidden mb-6">
                <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mb-6">
                <span className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}>
                  {pillar.value}
                </span>
                <span className="text-gray-400 text-sm ml-2 font-light">{pillar.label}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{pillar.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== SETTORI =====
function Settori() {
  const sectors = [
    { name: 'Car Detailing', icon: '🚗', desc: 'Edgeless, asciugatura ultra-assorbente, cura interni premium', gradient: 'from-sky-400 to-blue-500' },
    { name: 'Imprese Pulizia', icon: '🏢', desc: 'Color code HACCP, alta resistenza, lavaggio industriale', gradient: 'from-cyan-400 to-teal-500' },
    { name: 'Hotel & Ristoranti', icon: '🏨', desc: 'Finitura cristallina, igiene certificata, personalizzazione', gradient: 'from-emerald-400 to-green-500' },
    { name: 'Fotovoltaico', icon: '☀️', desc: 'Kit dedicati, antigraffio, asciugatura senza aloni', gradient: 'from-teal-400 to-cyan-500' },
    { name: 'Nautica', icon: '⛵', desc: 'Protezione superfici delicate, assorbimento massimo', gradient: 'from-blue-400 to-sky-500' },
    { name: 'Sanitario', icon: '🏥', desc: 'Rimozione batteri 99.9%, protocolli certificati', gradient: 'from-green-400 to-emerald-500' },
  ];

  return (
    <RevealSection id="settori" className="py-32 lg:py-40 bg-gradient-to-b from-white via-cyan-50/20 to-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Settori Serviti</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-4 tracking-tight">
            Per Ogni<br />
            <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">Settore</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.name}
              className="group bg-white rounded-3xl p-8 border border-sky-100/50 hover:shadow-2xl hover:shadow-sky-100/30 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${sector.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-sky-200/30 group-hover:scale-110 transition-transform duration-500`}>
                {sector.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors duration-300">
                {sector.name}
              </h3>
              <p className="text-gray-500 text-sm font-light">
                {sector.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== CUSTOMIZATION =====
function Customization() {
  return (
    <RevealSection id="personalizzazione" className="py-32 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Il Tuo Brand</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-4 tracking-tight leading-[0.9] mb-8">
              La Nostra Qualità.<br />
              <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">Il Tuo Brand.</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">
              Servizio completo di personalizzazione. Stampa serigrafica, etichette in tessuto, 
              packaging dedicato. Trasforma i nostri prodotti nel tuo strumento di marketing.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Serigrafia HD', desc: 'Logo diretto ad alta risoluzione', icon: '🖨️' },
                { title: 'Etichette Tessuto', desc: 'Branding permanente e premium', icon: '🏷️' },
                { title: 'Packaging Custom', desc: 'Confezioni completamente personalizzate', icon: '📦' },
                { title: 'Color Matching', desc: 'Pantone matching per coerenza brand', icon: '🎨' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="text-gray-800 font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contatti"
              className="inline-flex items-center gap-2 mt-10 bg-gradient-to-r from-sky-400 to-cyan-400 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-sky-200/50 hover:shadow-2xl hover:shadow-sky-300/50 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              Richiedi Personalizzazione
              <span>→</span>
            </motion.a>
          </div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-sky-50 via-white to-cyan-50 rounded-3xl border border-sky-100/50 shadow-2xl shadow-sky-100/30 relative overflow-hidden p-12">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              
              {/* Center element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-200/50">
                    <span className="text-white font-black text-3xl">L</span>
                  </div>
                  <div className="text-sky-400 text-xs tracking-[0.3em] uppercase font-semibold">→ Il Tuo Logo</div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-lg border border-sky-100/50"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl">✨</div>
                <div className="text-xs text-gray-600 font-medium mt-1">Premium</div>
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-8 bg-white rounded-2xl p-4 shadow-lg border border-sky-100/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="text-2xl">💧</div>
                <div className="text-xs text-gray-600 font-medium mt-1">Fresh</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </RevealSection>
  );
}

// ===== BLOG =====
function Blog() {
  const posts = [
    { title: 'Il Kit Essenziale: 5 Panni che Ogni Professionista Deve Avere', date: 'Ago 2025', cat: 'GUIDE', emoji: '🧰' },
    { title: 'Come Lavare l\'Auto Senza Graffiarla: Guida Definitiva', date: 'Ago 2025', cat: 'DETAILING', emoji: '🚗' },
    { title: 'Panni in Microfibra per Pulizie Domestiche', date: 'Set 2025', cat: 'GUIDE', emoji: '🏠' },
  ];

  return (
    <RevealSection id="blog" className="py-32 lg:py-40 bg-gradient-to-b from-white via-sky-50/20 to-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Dal Blog</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4 tracking-tight">
              Consigli per Professionisti
            </h2>
          </div>
          <a href="#" className="text-sky-500 font-semibold hover:text-sky-600 transition-colors flex items-center gap-2">
            Tutti gli articoli →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              className="group bg-white rounded-3xl overflow-hidden border border-sky-100/50 hover:shadow-2xl hover:shadow-sky-100/30 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-12 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{post.emoji}</div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-sky-500 bg-sky-50 px-3 py-1 rounded-full">{post.cat}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-sky-600 transition-colors duration-300 mb-4">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-sky-500">
                  <span className="text-xs uppercase tracking-wider font-semibold">Leggi</span>
                  <span>→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== CONTACT =====
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nome: '', azienda: '', piva: '', email: '', tel: '', messaggio: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contatti" className="py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-cyan-50/50" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Contattaci</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-4 tracking-tight leading-[0.9] mb-8">
              Parliamo di<br />
              <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">Business</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-12">
              Il nostro team è composto da consulenti specializzati pronti ad analizzare le tue esigenze per un'offerta su misura.
            </p>

            <div className="space-y-6">
              {[
                { icon: '💰', title: 'Listino Riservato', desc: 'Condizioni B2B vantaggiose' },
                { icon: '🎯', title: 'Consulenza Gratuita', desc: 'Scelta dei prodotti performanti' },
                { icon: '📋', title: 'Schede Tecniche', desc: 'Documentazione completa' },
                { icon: '🎨', title: 'Personalizzazione', desc: 'Il tuo brand sui prodotti' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-sky-100/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="text-gray-800 font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-10 border border-sky-100/50 shadow-2xl shadow-sky-100/30"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-200/50">
                    <span className="text-white text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Richiesta Inviata!</h3>
                  <p className="text-gray-500 font-light">Ti contatteremo entro 24 ore lavorative.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Richiedi Preventivo</h3>
                  <p className="text-gray-500 text-sm font-light mb-6">Compila il form per ricevere un'offerta dedicata.</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome *"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="bg-sky-50/50 border border-sky-100 rounded-xl px-5 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-200/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Azienda"
                      value={formData.azienda}
                      onChange={(e) => setFormData({...formData, azienda: e.target.value})}
                      className="bg-sky-50/50 border border-sky-100 rounded-xl px-5 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-200/50 transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="P.IVA"
                      value={formData.piva}
                      onChange={(e) => setFormData({...formData, piva: e.target.value})}
                      className="bg-sky-50/50 border border-sky-100 rounded-xl px-5 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-200/50 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-sky-50/50 border border-sky-100 rounded-xl px-5 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-200/50 transition-all"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Telefono"
                    value={formData.tel}
                    onChange={(e) => setFormData({...formData, tel: e.target.value})}
                    className="w-full bg-sky-50/50 border border-sky-100 rounded-xl px-5 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-200/50 transition-all"
                  />
                  <textarea
                    placeholder="Descrivi le tue esigenze..."
                    rows={4}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    className="w-full bg-sky-50/50 border border-sky-100 rounded-xl px-5 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-200/50 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-400 to-cyan-400 text-white py-4 rounded-xl font-semibold shadow-xl shadow-sky-200/50 hover:shadow-2xl hover:shadow-sky-300/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Invia Richiesta
                  </button>
                  <p className="text-gray-400 text-xs text-center">
                    Inviando accetti l'informativa sulla privacy
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 border-t border-sky-100/50 py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200/50">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <span className="text-gray-800 font-bold text-xl">LINT</span>
                <span className="block text-[10px] uppercase tracking-widest text-sky-500/60">Professional</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Specialisti nella selezione e distribuzione di panni in microfibra professionali.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-6 text-sm uppercase tracking-wider">Prodotti</h4>
            <ul className="space-y-3">
              {['Microfibra', 'Accessori', 'Ricambi', 'Chimici'].map((item) => (
                <li key={item}><a href="#" className="text-gray-500 text-sm hover:text-sky-500 transition-colors font-light">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-6 text-sm uppercase tracking-wider">Settori</h4>
            <ul className="space-y-3">
              {['Detailing', 'Imprese', 'Hotel', 'Fotovoltaico'].map((item) => (
                <li key={item}><a href="#" className="text-gray-500 text-sm hover:text-sky-500 transition-colors font-light">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-6 text-sm uppercase tracking-wider">Contatti</h4>
            <ul className="space-y-3">
              <li className="text-gray-500 text-sm font-light">info@lintmicrofibercloths.it</li>
              <li className="text-gray-500 text-sm font-light">www.lintmicrofibercloths.it</li>
            </ul>
            <a
              href="https://www.ebay.it/str/lintpannimircrofibra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-gradient-to-r from-sky-400 to-cyan-400 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg shadow-sky-200/50 hover:shadow-xl transition-all"
            >
              🛒 eBay → Privati
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-sky-100/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-light">
            © 2025 LINT Professional Cleaning
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 text-sm hover:text-sky-500 transition-colors font-light">Privacy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-sky-500 transition-colors font-light">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <FreshOverlay />
      <ScrollProgress />
      <Header />
      <Hero />
      <Gamma />
      <ProductLines />
      <Qualita />
      <Settori />
      <Customization />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
