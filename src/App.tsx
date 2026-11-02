import { useState, useEffect } from 'react';

// ===== HEADER =====
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>LINT</span>
              <span className={`block text-[10px] uppercase tracking-widest ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>Professional Cleaning</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Prodotti', 'Settori', 'Personalizzazione', 'Blog', 'Contatti'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white/90'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contatti"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
            >
              Richiedi Preventivo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {['Prodotti', 'Settori', 'Personalizzazione', 'Blog', 'Contatti'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#contatti"
              className="block bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center px-6 py-3 rounded-full font-semibold mt-4"
            >
              Richiedi Preventivo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ===== HERO =====
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-[128px]" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm">Forniture B2B per Professionisti</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Panni in Microfibra
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Professionali
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Selezioniamo e distribuiamo i migliori panni in microfibra per i settori più esigenti. 
              Soluzioni tecniche progettate per resistere all'uso intensivo e garantire risultati impeccabili.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#contatti"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full text-center font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:scale-105"
              >
                Richiedi Preventivo B2B
              </a>
              <a
                href="#prodotti"
                className="border border-white/30 text-white px-8 py-4 rounded-full text-center font-semibold hover:bg-white/10 transition-all"
              >
                Esplora la Gamma
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '500+', label: 'Cicli Lavaggio' },
                { value: '99.9%', label: 'Batteri Rimossi' },
                { value: '-90%', label: 'Uso Chimici' },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-sm border border-white/10" />
              <div className="absolute inset-8 bg-gradient-to-br from-blue-600/30 to-cyan-500/30 rounded-2xl border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🧹</div>
                  <div className="text-white/80 text-sm font-medium">Qualità Certificata</div>
                  <div className="text-white text-2xl font-bold mt-2">Made for Pros</div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="text-2xl">✨</div>
                <div className="text-white text-xs mt-1">Anti-Alone</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="text-2xl">💧</div>
                <div className="text-white text-xs mt-1">Super Assorbente</div>
              </div>
              <div className="absolute top-1/2 -right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <div className="text-2xl">🛡️</div>
                <div className="text-white text-xs mt-1">Antigraffio</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// ===== CATEGORIES =====
function Categories() {
  const categories = [
    {
      icon: '🧽',
      title: 'Panni in Microfibra',
      description: 'Vasta gamma con grammature e trame specifiche per ogni applicazione, dal detailing alla pulizia industriale.',
      color: 'from-blue-500 to-blue-600',
      items: ['Multiuso', 'Vetri', 'Asciugatura', 'Detailing']
    },
    {
      icon: '🔧',
      title: 'Accessori',
      description: 'Attrezzatura che ottimizza il lavoro: spazzole anti-graffio, sistemi di lavaggio sicuri, pistole pneumatiche.',
      color: 'from-cyan-500 to-teal-500',
      items: ['Spazzole', 'Pistole Aria', 'Mop', 'Sistemi Lavaggio']
    },
    {
      icon: '⚙️',
      title: 'Ricambi',
      description: 'Ricambi di alta qualità per aspiratori, mop e sistemi a estrazione per una lunga vita operativa.',
      color: 'from-indigo-500 to-purple-500',
      items: ['Aspiratori', 'Mop', 'Estrazione', 'Componenti']
    },
    {
      icon: '🧪',
      title: 'Prodotti Chimici',
      description: 'Formule concentrate per risultati superiori: sgrassanti alcalini, soluzioni acide e detergenti innovativi.',
      color: 'from-emerald-500 to-green-500',
      items: ['Sgrassanti', 'Detergenti', 'Lucidanti', 'Disinfettanti']
    },
  ];

  return (
    <section id="prodotti" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">La Nostra Gamma</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Soluzioni per Ogni Esigenza
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Non un semplice panno: la soluzione giusta per ogni compito. Ogni prodotto è selezionato per fornire performance superiori.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PRODUCT TYPES =====
function ProductTypes() {
  const types = [
    {
      title: 'Panni Multiuso Professionali',
      subtitle: 'Il Fondamento di Ogni Kit',
      description: 'Progettati per essere i "muli da lavoro" di ogni professionista. Densità di fibre superiore per assorbimento e resistenza eccezionali.',
      features: ['Performance Affidabile', 'Costruzione Durevole', 'Efficienza Superiore'],
      gradient: 'from-blue-600 to-blue-800',
      emoji: '🧹'
    },
    {
      title: 'Panni per Vetri e Finiture',
      subtitle: 'La Perfezione Trasparente',
      description: 'Trame specifiche ingegnerizzate per offrire una finitura cristallina e assolutamente impeccabile su vetri, specchi e superfici lucide.',
      features: ['Finitura Anti-Alone', 'Tessitura Specifica', 'Sicurezza Superfici Delicate'],
      gradient: 'from-cyan-600 to-blue-700',
      emoji: '🪟'
    },
    {
      title: 'Panni per Car Detailing',
      subtitle: 'Ogni Dettaglio Conta',
      description: 'Selezione curata per detailer esigenti. Bordi in seta, senza cuciture o a taglio laser per eliminare ogni rischio di graffio.',
      features: ['Sicurezza Massima', 'Specificità per Compito', 'Grammature GSM'],
      gradient: 'from-indigo-600 to-purple-700',
      emoji: '🚗'
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Le Nostre Linee</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            La Soluzione Giusta per Ogni Compito
          </h2>
        </div>

        <div className="space-y-8">
          {types.map((type, index) => (
            <div
              key={type.title}
              className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`bg-gradient-to-br ${type.gradient} rounded-2xl p-10 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative">
                    <div className="text-6xl mb-4">{type.emoji}</div>
                    <div className="text-sm font-medium text-white/70 uppercase tracking-wider">{type.subtitle}</div>
                    <h3 className="text-2xl font-bold mt-2">{type.title}</h3>
                  </div>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                <div className="space-y-3">
                  {type.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="#contatti" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold hover:gap-3 transition-all">
                  Scopri di più
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== WHY CHOOSE US =====
function WhyChooseUs() {
  const pillars = [
    {
      icon: '🌱',
      title: 'Sostenibilità Ambientale',
      description: 'L\'alta efficacia delle nostre fibre permette di ridurre fino al 90% l\'uso di detergenti chimici, ottenendo risultati superiori con la sola acqua.',
      stat: '90%',
      statLabel: 'meno chimici'
    },
    {
      icon: '🏭',
      title: 'Durata Industriale',
      description: 'Resistenza certificata fino a 500 cicli di lavaggio a 90°C, mantenendo inalterate le proprietà di pulizia e assorbenza.',
      stat: '500+',
      statLabel: 'cicli lavaggio'
    },
    {
      icon: '🔬',
      title: 'Efficacia Certificata',
      description: 'Rimozione del 99,9% di batteri certificata da laboratori indipendenti. Soddisfa gli standard più elevati dal detailing al sanitario.',
      stat: '99.9%',
      statLabel: 'batteri rimossi'
    },
  ];

  return (
    <section id="settori" className="py-24 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-400 rounded-full blur-[128px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">La Differenza LINT</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Qualità, Durata e Sostenibilità
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Tre pilastri fondamentali che garantiscono la superiorità dei nostri prodotti rispetto alle alternative sul mercato.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-5xl mb-6">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{pillar.description}</p>
              <div className="pt-6 border-t border-white/10">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {pillar.stat}
                </span>
                <span className="text-gray-500 text-sm ml-2">{pillar.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== SECTORS =====
function Sectors() {
  const sectors = [
    { name: 'Car Detailing', icon: '🚗', desc: 'Panni edgeless, asciugatura ultra-assorbente, cura interni' },
    { name: 'Imprese Pulizia', icon: '🏢', desc: 'Color code HACCP, alta resistenza, lavaggio industriale' },
    { name: 'Hotel & Ristoranti', icon: '🏨', desc: 'Finitura cristallina, igiene certificata, personalizzazione' },
    { name: 'Fotovoltaico', icon: '☀️', desc: 'Kit dedicati, antigraffio, asciugatura senza aloni' },
    { name: 'Nautica', icon: '⛵', desc: 'Protezione superfici delicate, assorbimento massimo' },
    { name: 'Sanitario', icon: '🏥', desc: 'Rimozione batteri 99.9%, monouso e riutilizzabili' },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Settori Serviti</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Trova la Soluzione per il Tuo Settore
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">{sector.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{sector.name}</h3>
                  <p className="text-gray-500 text-sm">{sector.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CUSTOMIZATION =====
function Customization() {
  return (
    <section id="personalizzazione" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Il Tuo Brand</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6">
              La Nostra Qualità,<br />il Tuo Brand
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Servizio completo di personalizzazione per la tua linea di panni in microfibra professionali. 
              Stampa serigrafica di alta qualità o etichette in tessuto personalizzate per trasformare 
              i nostri prodotti in un potente strumento di marketing.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { title: 'Aumenta la Visibilità', desc: 'Ogni panno diventa un biglietto da visita del tuo marchio' },
                { title: 'Prodotto Esclusivo', desc: 'Distinguiti dalla concorrenza con una linea personalizzata' },
                { title: 'Massima Flessibilità', desc: 'Diverse opzioni di stampa ed etichettatura su misura' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contatti"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:scale-105"
            >
              Richiedi Personalizzazione
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border border-blue-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-4xl mb-2">🖨️</div>
                  <div className="font-semibold text-gray-900 text-sm">Serigrafia</div>
                  <div className="text-gray-500 text-xs mt-1">Logo diretto</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-4xl mb-2">🏷️</div>
                  <div className="font-semibold text-gray-900 text-sm">Etichette</div>
                  <div className="text-gray-500 text-xs mt-1">Tessuto personalizzato</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <div className="font-semibold text-gray-900 text-sm">Packaging</div>
                  <div className="text-gray-500 text-xs mt-1">Confezioni brandizzate</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <div className="font-semibold text-gray-900 text-sm">Colori</div>
                  <div className="text-gray-500 text-xs mt-1">Pantone matching</div>
                </div>
              </div>
              <div className="mt-6 bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">→ Il Tuo Logo Qui</div>
                  <div className="text-gray-500 text-xs">Trasforma i nostri prodotti nel tuo brand</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FEATURED PRODUCTS =====
function FeaturedProducts() {
  const products = [
    {
      name: 'Kit Pulizia Pannelli Fotovoltaici Solar Wash',
      category: 'Fotovoltaico',
      emoji: '☀️',
      features: ['Manico telescopico', 'Prolunga inclusa', 'Panno antigraffio']
    },
    {
      name: 'Pistola Soffiaggio Aria con Snodo Regolabile',
      category: 'Detailing',
      emoji: '💨',
      features: ['Snodo regolabile', 'Testine intercambiabili', 'Professionale']
    },
    {
      name: 'Spazzola Cerchi Auto in Microfibra',
      category: 'Car Care',
      emoji: '🔵',
      features: ['Antigraffio', 'Protezione integrata', 'Microfibra premium']
    },
    {
      name: 'Panno Asciugatura ANTRA DRY',
      category: 'Asciugatura',
      emoji: '💧',
      features: ['Extra assorbente', 'Auto/Casa/Doccia', 'Long life']
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">In Evidenza</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Le Nostre Soluzioni Top</h2>
          </div>
          <a href="#contatti" className="mt-4 sm:mt-0 text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Vedi tutti i prodotti
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-8 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform">{product.emoji}</div>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-3 mb-3 text-sm leading-snug">{product.name}</h3>
                <div className="space-y-1.5 mb-4">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1 h-1 bg-blue-400 rounded-full" />
                      {f}
                    </div>
                  ))}
                </div>
                <a
                  href="#contatti"
                  className="block text-center bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Richiedi Preventivo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== BLOG PREVIEW =====
function BlogPreview() {
  const posts = [
    {
      title: 'Il Kit di Panni in Microfibra Essenziale: I 5 Panni che Ogni Professionista Deve Avere',
      date: '18 Agosto 2025',
      category: 'Guide',
      emoji: '🧰'
    },
    {
      title: 'Come Lavare l\'Auto Senza Graffiarla: La Guida Definitiva al Lavaggio Sicuro',
      date: '17 Agosto 2025',
      category: 'Detailing',
      emoji: '🚗'
    },
    {
      title: 'Panni in Microfibra per Pulizie Domestiche: La Guida Definitiva',
      date: '24 Settembre 2025',
      category: 'Casa',
      emoji: '🏠'
    },
  ];

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Dal Blog</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Consigli e Guide per Professionisti
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            La conoscenza è uno strumento tanto importante quanto un buon panno. 
            Tecniche, segreti e guide per ottenere il massimo dalla tua attrezzatura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-10 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform">{post.emoji}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <a href="#" className="inline-flex items-center gap-1 mt-4 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Leggi l'articolo
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT FORM =====
function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '', azienda: '', piva: '', email: '', tel: '', messaggio: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contatti" className="py-24 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Contattaci</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
              Sei un Rivenditore o un Professionista?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Il nostro team non è composto da semplici venditori, ma da consulenti specializzati pronti 
              ad analizzare le tue esigenze specifiche per costruire un'offerta su misura per la tua attività.
            </p>

            <div className="space-y-6">
              {[
                { icon: '💰', title: 'Listino Prezzi Riservato', desc: 'Condizioni vantaggiose per il mercato B2B' },
                { icon: '🎯', title: 'Consulenza Tecnica Gratuita', desc: 'Guida nella scelta dei prodotti più performanti' },
                { icon: '📋', title: 'Schede Tecniche Complete', desc: 'Tutta la documentazione per le tue operazioni' },
                { icon: '🎨', title: 'Soluzioni Personalizzate', desc: 'Applichiamo il tuo brand sui nostri prodotti' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Richiesta Inviata!</h3>
                <p className="text-gray-400">Ti contatteremo entro 24 ore lavorative.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Richiedi un Preventivo</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome *"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  />
                  <input
                    type="text"
                    placeholder="Azienda"
                    value={formData.azienda}
                    onChange={(e) => setFormData({...formData, azienda: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="P.IVA"
                    value={formData.piva}
                    onChange={(e) => setFormData({...formData, piva: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefono"
                  value={formData.tel}
                  onChange={(e) => setFormData({...formData, tel: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                />
                <textarea
                  placeholder="Descrivi le tue esigenze..."
                  rows={4}
                  value={formData.messaggio}
                  onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:scale-[1.02]"
                >
                  Invia Richiesta Preventivo
                </button>
                <p className="text-gray-500 text-xs text-center">
                  Inviando accetti l'informativa sulla privacy
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">LINT</span>
                <span className="block text-[10px] uppercase tracking-widest text-gray-500">Professional Cleaning</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Specialisti nella selezione e distribuzione di panni in microfibra professionali per i settori più esigenti.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Prodotti</h4>
            <ul className="space-y-2">
              {['Panni in Microfibra', 'Accessori Pulizia', 'Ricambi', 'Prodotti Chimici', 'Kit Fotovoltaico'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-white font-semibold mb-4">Settori</h4>
            <ul className="space-y-2">
              {['Car Detailing', 'Imprese di Pulizia', 'Hotel & Ristoranti', 'Fotovoltaico', 'Nautica'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>📧</span> info@lintmicrofibercloths.it
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>📱</span> +39 XXX XXX XXXX
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>🌐</span> www.lintmicrofibercloths.it
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="https://www.ebay.it/str/lintpannimircrofibra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600/30 transition-colors"
              >
                🛒 Acquista su eBay (Privati)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 LINT Professional Cleaning. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">P.IVA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Categories />
      <ProductTypes />
      <WhyChooseUs />
      <Sectors />
      <Customization />
      <FeaturedProducts />
      <BlogPreview />
      <ContactForm />
      <Footer />
    </div>
  );
}
