import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// ===== CINEMATIC GRAIN OVERLAY =====
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px'
      }} />
    </div>
  );
}

// ===== CINEMATIC LETTERBOX =====
function Letterbox() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[3vh] bg-black z-[90] pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-[3vh] bg-black z-[90] pointer-events-none" />
    </>
  );
}

// ===== SCROLL PROGRESS BAR =====
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 z-[95] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ===== HEADER =====
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-[3vh] left-0 right-0 z-[80] transition-all duration-700 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-black text-sm">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg tracking-tight">LINT</span>
            </div>
          </motion.div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {['Gamma', 'Settori', 'Qualità', 'Blog', 'Contatti'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 text-[13px] font-medium tracking-wide uppercase hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <motion.a
            href="#contatti"
            className="hidden lg:block bg-white text-black px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase hover:bg-blue-400 hover:text-white transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
          >
            Preventivo
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="w-full h-[1.5px] bg-white block" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="w-full h-[1.5px] bg-white block" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="w-full h-[1.5px] bg-white block" />
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
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-8 space-y-6">
              {['Gamma', 'Settori', 'Qualità', 'Blog', 'Contatti'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-white/80 text-lg font-light" onClick={() => setMenuOpen(false)}>
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background layers */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/80 border border-blue-400/20 px-5 py-2">
            Forniture Professionali B2B
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter text-white mb-8"
        >
          <span className="block">Panni in</span>
          <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Microfibra
          </span>
          <span className="block text-white/40 text-[0.5em] font-light tracking-normal mt-2">Professionali</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          Selezioniamo e distribuiamo i migliori panni in microfibra per i settori più esigenti. 
          Soluzioni tecniche progettate per l'uso intensivo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contatti"
            className="group relative bg-white text-black px-10 py-4 text-sm font-semibold tracking-wide uppercase overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Richiedi Preventivo</span>
            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
          <a
            href="#gamma"
            className="border border-white/20 text-white/80 px-10 py-4 text-sm font-medium tracking-wide uppercase hover:border-white/50 hover:text-white transition-all duration-300"
          >
            Esplora la Gamma
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '500+', label: 'Cicli Lavaggio' },
            { value: '99.9%', label: 'Batteri Rimossi' },
            { value: '-90%', label: 'Uso Chimici' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] md:text-[11px] text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-[6vh] left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
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
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ===== GAMMA / CATEGORIES =====
function Gamma() {
  const categories = [
    { icon: '◼', title: 'Panni in Microfibra', desc: 'Grammature e trame specifiche per ogni applicazione professionale.', tag: 'CORE' },
    { icon: '◻', title: 'Accessori', desc: 'Spazzole anti-graffio, pistole pneumatiche, sistemi di lavaggio.', tag: 'TOOLS' },
    { icon: '△', title: 'Ricambi', desc: 'Componenti per aspiratori, mop e sistemi a estrazione.', tag: 'PARTS' },
    { icon: '○', title: 'Prodotti Chimici', desc: 'Formule concentrate: sgrassanti, detergenti, disinfettanti.', tag: 'CHEM' },
  ];

  return (
    <RevealSection id="gamma" className="py-32 lg:py-44 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-20">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">01 — Gamma</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 tracking-tight leading-[0.9]">
            Non un semplice<br />
            <span className="text-white/30">panno.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mt-6 font-light">
            La soluzione giusta per ogni compito. Ogni prodotto selezionato per fornire performance superiori.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-[1px] bg-white/5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="group bg-black p-10 lg:p-14 relative overflow-hidden cursor-pointer"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase text-white/20 font-medium">
                {cat.tag}
              </div>
              <div className="text-4xl text-blue-400/60 mb-8 group-hover:text-blue-400 transition-colors duration-500">
                {cat.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-500">
                {cat.title}
              </h3>
              <p className="text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                {cat.desc}
              </p>
              <div className="mt-8 flex items-center gap-2 text-white/30 group-hover:text-blue-400 transition-all duration-500">
                <span className="text-[11px] uppercase tracking-wider font-medium">Scopri</span>
                <motion.span className="text-lg" whileHover={{ x: 5 }}>→</motion.span>
              </div>
              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== PRODUCT LINES (CINEMATIC SPLIT) =====
function ProductLines() {
  const lines = [
    {
      num: '01',
      title: 'Multiuso',
      subtitle: 'Professional Grade',
      desc: 'Densità di fibre superiore per assorbimento e resistenza eccezionali. Il fondamento di ogni kit professionale.',
      specs: ['300+ GSM', '500 cicli lavaggio', 'Multi-superficie']
    },
    {
      num: '02',
      title: 'Vetri & Finiture',
      subtitle: 'Crystal Clear',
      desc: 'Trame specifiche ingegnerizzate per finitura cristallina. Zero aloni, zero striature, zero pelucchi.',
      specs: ['Nido d\'ape', 'Ultra-fine', 'Anti-alone']
    },
    {
      num: '03',
      title: 'Car Detailing',
      subtitle: 'Edgeless Technology',
      desc: 'Bordi in seta, senza cuciture o taglio laser. La selezione curata per i detailer più esigenti.',
      specs: ['Edgeless', 'Bordo seta', 'GSM 300-1200']
    },
  ];

  return (
    <RevealSection className="py-32 lg:py-44 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">02 — Linee</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 tracking-tight leading-[0.9]">
            Ogni dettaglio<br />
            <span className="text-white/30">conta.</span>
          </h2>
        </div>

        <div className="space-y-0">
          {lines.map((line, i) => (
            <motion.div
              key={line.num}
              className="group grid lg:grid-cols-12 gap-8 lg:gap-16 py-12 lg:py-16 border-t border-white/5 items-center hover:bg-white/[0.01] transition-colors duration-500 px-4 lg:px-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              {/* Number */}
              <div className="lg:col-span-1">
                <span className="text-[11px] text-white/20 font-mono tracking-wider">{line.num}</span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-blue-400/50 mb-2">{line.subtitle}</div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-blue-300 transition-colors duration-500">
                  {line.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-white/40 font-light leading-relaxed">{line.desc}</p>
              </div>

              {/* Specs */}
              <div className="lg:col-span-3 flex lg:justify-end">
                <div className="flex flex-wrap gap-2">
                  {line.specs.map((spec) => (
                    <span key={spec} className="text-[10px] tracking-wider uppercase text-white/30 border border-white/10 px-3 py-1.5 group-hover:border-blue-400/30 group-hover:text-blue-400/60 transition-all duration-500">
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

// ===== QUALITÀ (CINEMATIC FULL-WIDTH) =====
function Qualita() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const pillars = [
    { num: 'I', title: 'Sostenibilità', value: '90%', label: 'meno chimici', desc: 'Alta efficacia pulente con la sola acqua. Riduzione drastica dei detergenti chimici.' },
    { num: 'II', title: 'Durata', value: '500+', label: 'cicli a 90°C', desc: 'Resistenza certificata. Un investimento, non un costo ricorrente.' },
    { num: 'III', title: 'Efficacia', value: '99.9%', label: 'batteri rimossi', desc: 'Certificazione indipendente. Standard sanitari e detailing.' },
  ];

  return (
    <section ref={ref} id="qualità" className="py-32 lg:py-44 bg-black relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[200px]"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">03 — Qualità</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 tracking-tight leading-[0.9]">
            La differenza<br />
            <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">LINT.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-[1px] bg-white/5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              className="bg-black p-10 lg:p-12 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <div className="text-[11px] text-white/20 font-mono mb-8">{pillar.num}</div>
              <div className="mb-8">
                <span className="text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
                  {pillar.value}
                </span>
                <span className="text-white/30 text-sm ml-2 font-light">{pillar.label}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-white/40 font-light leading-relaxed text-sm">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== SETTORI =====
function Settori() {
  const sectors = [
    { name: 'Car Detailing', icon: '◈', desc: 'Edgeless, asciugatura ultra-assorbente, cura interni premium' },
    { name: 'Imprese Pulizia', icon: '◇', desc: 'Color code HACCP, alta resistenza, lavaggio industriale' },
    { name: 'Hotel & Ristoranti', icon: '◆', desc: 'Finitura cristallina, igiene certificata, personalizzazione' },
    { name: 'Fotovoltaico', icon: '◉', desc: 'Kit dedicati, antigraffio, asciugatura senza aloni' },
    { name: 'Nautica', icon: '◎', desc: 'Protezione superfici delicate, assorbimento massimo' },
    { name: 'Sanitario', icon: '◍', desc: 'Rimozione batteri 99.9%, protocolli certificati' },
  ];

  return (
    <RevealSection id="settori" className="py-32 lg:py-44 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">04 — Settori</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 tracking-tight leading-[0.9]">
            Per ogni<br />
            <span className="text-white/30">settore.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.name}
              className="bg-black p-8 lg:p-10 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(59,130,246,0.03)' }}
            >
              <div className="text-3xl text-blue-400/40 mb-6 group-hover:text-blue-400/80 transition-colors duration-500">
                {sector.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-500">
                {sector.name}
              </h3>
              <p className="text-white/30 text-sm font-light group-hover:text-white/50 transition-colors duration-500">
                {sector.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

// ===== CUSTOMIZATION (CINEMATIC SPLIT) =====
function Customization() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="personalizzazione" className="py-32 lg:py-44 bg-black relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <div>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">05 — Brand</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight leading-[0.9] mb-8">
              La nostra<br />qualità.<br />
              <span className="text-white/30">Il tuo brand.</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-10 max-w-md">
              Servizio completo di personalizzazione. Stampa serigrafica, etichette in tessuto, 
              packaging dedicato. Trasforma i nostri prodotti nel tuo strumento di marketing.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Serigrafia HD', desc: 'Logo diretto ad alta risoluzione' },
                { title: 'Etichette Tessuto', desc: 'Branding permanente e premium' },
                { title: 'Packaging Custom', desc: 'Confezioni completamente personalizzate' },
                { title: 'Color Matching', desc: 'Pantone matching per coerenza brand' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="w-6 h-[1px] bg-blue-400/50 mt-3 group-hover:w-10 transition-all duration-500" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                    <p className="text-white/30 text-sm font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <motion.div style={{ y }} className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-sm relative overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              
              {/* Center element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center mx-auto mb-6">
                    <span className="text-white/60 font-black text-2xl">L</span>
                  </div>
                  <div className="text-white/20 text-[10px] tracking-[0.3em] uppercase">→ Il Tuo Logo</div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-blue-400/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-blue-400/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-blue-400/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-blue-400/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===== MARQUEE =====
function Marquee() {
  const items = ['MICROFIBRA', 'PROFESSIONALE', 'B2B', 'DETAILING', 'SOSTENIBILE', 'CERTIFICATO', 'PREMIUM', 'INDUSTRIALE'];
  
  return (
    <div className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-3xl md:text-5xl font-black text-white/[0.04] tracking-tight">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ===== BLOG =====
function Blog() {
  const posts = [
    { title: 'Il Kit Essenziale: 5 Panni che Ogni Professionista Deve Avere', date: 'Ago 2025', cat: 'GUIDE' },
    { title: 'Come Lavare l\'Auto Senza Graffiarla: Guida Definitiva', date: 'Ago 2025', cat: 'DETAILING' },
    { title: 'Panni in Microfibra per Pulizie Domestiche', date: 'Set 2025', cat: 'GUIDE' },
  ];

  return (
    <RevealSection id="blog" className="py-32 lg:py-44 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">06 — Journal</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight">
              Dal blog.
            </h2>
          </div>
          <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-blue-400 transition-colors border-b border-white/20 hover:border-blue-400 pb-1">
            Tutti gli articoli →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-[1px] bg-white/5">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              className="bg-black p-8 lg:p-10 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] tracking-[0.2em] uppercase text-blue-400/60 border border-blue-400/20 px-2 py-1">{post.cat}</span>
                <span className="text-[11px] text-white/20">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-300 transition-colors duration-500 mb-6">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-white/20 group-hover:text-blue-400 transition-all duration-500">
                <span className="text-[10px] uppercase tracking-wider">Leggi</span>
                <span className="text-sm">→</span>
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
    <section id="contatti" className="py-32 lg:py-44 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.08)_0%,_transparent_60%)]" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-blue-400/60">07 — Contatti</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight leading-[0.9] mb-8">
              Parliamo di<br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">business.</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-md">
              Il nostro team è composto da consulenti specializzati pronti ad analizzare le tue esigenze per un'offerta su misura.
            </p>

            <div className="space-y-8">
              {[
                { icon: '—', title: 'Listino Riservato', desc: 'Condizioni B2B vantaggiose' },
                { icon: '—', title: 'Consulenza Gratuita', desc: 'Scelta dei prodotti performanti' },
                { icon: '—', title: 'Schede Tecniche', desc: 'Documentazione completa' },
                { icon: '—', title: 'Personalizzazione', desc: 'Il tuo brand sui prodotti' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="text-blue-400/50 text-sm mt-1">{item.icon}</span>
                  <div>
                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                    <p className="text-white/30 text-sm font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white/[0.02] border border-white/5 p-8 lg:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                >
                  <div className="w-16 h-16 border border-blue-400/30 rounded-full flex items-center justify-center mb-6">
                    <span className="text-blue-400 text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Richiesta Inviata</h3>
                  <p className="text-white/40 text-sm font-light">Ti contatteremo entro 24 ore lavorative.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-bold text-white mb-2">Richiedi Preventivo</h3>
                  <p className="text-white/30 text-sm font-light mb-8">Compila il form per ricevere un'offerta dedicata.</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome *"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="bg-transparent border-b border-white/10 pb-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-400/50 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Azienda"
                      value={formData.azienda}
                      onChange={(e) => setFormData({...formData, azienda: e.target.value})}
                      className="bg-transparent border-b border-white/10 pb-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-400/50 transition-colors"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="P.IVA"
                      value={formData.piva}
                      onChange={(e) => setFormData({...formData, piva: e.target.value})}
                      className="bg-transparent border-b border-white/10 pb-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-400/50 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-transparent border-b border-white/10 pb-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-400/50 transition-colors"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Telefono"
                    value={formData.tel}
                    onChange={(e) => setFormData({...formData, tel: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-400/50 transition-colors"
                  />
                  <textarea
                    placeholder="Descrivi le tue esigenze..."
                    rows={4}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-400/50 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-4 text-sm font-semibold tracking-wide uppercase hover:bg-blue-400 hover:text-white transition-all duration-500 mt-4"
                  >
                    Invia Richiesta
                  </button>
                  <p className="text-white/15 text-[10px] text-center tracking-wider uppercase">
                    Accettando l'informativa sulla privacy
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-sm">L</span>
              </div>
              <span className="text-white font-bold text-lg">LINT</span>
            </div>
            <p className="text-white/30 text-sm font-light leading-relaxed">
              Specialisti nella selezione e distribuzione di panni in microfibra professionali.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">Prodotti</h4>
            <ul className="space-y-3">
              {['Microfibra', 'Accessori', 'Ricambi', 'Chimici'].map((item) => (
                <li key={item}><a href="#" className="text-white/30 text-sm hover:text-white transition-colors font-light">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">Settori</h4>
            <ul className="space-y-3">
              {['Detailing', 'Imprese', 'Hotel', 'Fotovoltaico'].map((item) => (
                <li key={item}><a href="#" className="text-white/30 text-sm hover:text-white transition-colors font-light">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">Contatti</h4>
            <ul className="space-y-3">
              <li className="text-white/30 text-sm font-light">info@lintmicrofibercloths.it</li>
              <li className="text-white/30 text-sm font-light">www.lintmicrofibercloths.it</li>
            </ul>
            <a
              href="https://www.ebay.it/str/lintpannimircrofibra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-[10px] tracking-[0.2em] uppercase text-blue-400/60 border border-blue-400/20 px-4 py-2 hover:border-blue-400/50 hover:text-blue-400 transition-all"
            >
              eBay → Privati
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[11px] tracking-wider">
            © 2025 LINT Professional Cleaning
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-[11px] hover:text-white/50 transition-colors tracking-wider">Privacy</a>
            <a href="#" className="text-white/20 text-[11px] hover:text-white/50 transition-colors tracking-wider">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <GrainOverlay />
      <Letterbox />
      <ScrollProgress />
      <Header />
      <Hero />
      <Gamma />
      <ProductLines />
      <Qualita />
      <Settori />
      <Customization />
      <Marquee />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
