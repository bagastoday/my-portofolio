'use client'

import React, { useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Search, Menu, Zap, Globe, Star, 
  ArrowRight, Instagram, MessageCircle, MapPin, ShieldCheck,
  ChevronLeft, ChevronRight
} from 'lucide-react'

export default function BGMFinalDeploy() {
  const [currentSlider, setCurrentSlider] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // DATA SLIDER HERO (Sesuaikan path gambar Bos)
  const sliders = [
    {
      id: 1,
      title: "Adidas Adizero Evo SL Black White Men",
      subtitle: "Adidas Adizero Evo SL Black White Men",
      price: "Rp 1.999.000",
      img: "/images/adidas.jpg", // Ganti dengan foto Bos
      color: "#7D8471"
    },
    {
      id: 2,
      title: "Limited Drop 02",
      subtitle: "Adidas Adizero",
      price: "Rp 449.000",
      img: "/images/adidas1.jpg", // Ganti dengan foto Bos
      color: "#7D8471"
    },
    {
      id: 3,
      title: "BGM Archive",
      subtitle: "Culture Heavy Hoodie",
      price: "Rp 379.000",
      img: "/images/bagasmbois1.png", // Ganti dengan foto Bos
      color: "#54594C"
    }
  ];

  const nextSlide = () => setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlider((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));

  const products = [
    { id: 1, name: "Signature Mbois Tee", price: "Rp 189.000", tag: "Essential" },
    { id: 2, name: "Atelier Work Jacket", price: "Rp 449.000", tag: "Limited" },
    { id: 3, name: "Culture Heavy Hoodie", price: "Rp 379.000", tag: "Archive" },
    { id: 4, name: "Cargo Utility Pants", price: "Rp 329.000", tag: "Drop" }
  ];

  return (
    <main className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A] font-serif antialiased selection:bg-[#7D8471] selection:text-white overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <header className="fixed top-0 w-full z-[1000] bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-tighter uppercase italic">
            BGM<span className="text-[#7D8471]">.</span>
          </h1>
          <nav className="hidden md:flex gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
            <a href="#collection" className="hover:text-black transition-all">Collections</a>
            <a href="#about" className="hover:text-black transition-all">Heritage</a>
            <a href="#contact" className="hover:text-black transition-all">Contact</a>
          </nav>
          <div className="flex gap-6 items-center">
            <Search size={18} />
            <div className="relative cursor-pointer">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 bg-[#7D8471] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
            <Menu size={20} className="md:hidden" />
          </div>
        </div>
        
        {/* MARQUEE */}
        <div className="w-full bg-[#7D8471] py-2 overflow-hidden border-t border-white/10">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap gap-12 text-[8px] font-bold uppercase tracking-[0.4em] text-white font-sans">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-12 items-center">
                 <span>New Drop: Atelier Collection 2026</span>
                 <Zap size={10} fill="white" />
                 <span>Quality Over Quantity</span>
                 <Globe size={10} />
                 <span>Mbois is a Choice</span>
                 <Star size={10} fill="white" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH CARD SLIDER */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-[#F9F9F7]">
        <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Teks Sebelah Kiri */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[#7D8471] text-[10px] font-bold uppercase tracking-[0.8em]">Premium Atelier</span>
            <h2 className="text-7xl md:text-8xl font-extralight leading-[0.9] tracking-tighter uppercase">
              Mbois <br /> <span className="opacity-30 italic font-light">Culture.</span>
            </h2>
            <p className="text-sm text-gray-500 italic max-w-sm leading-relaxed font-sans">
              Eksplorasi gaya autentik dengan kualitas hardware terbaik. Karena mbois adalah hak segala bangsa.
            </p>
            <button className="bg-black text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#7D8471] transition-all">
              Shop Collection
            </button>
          </motion.div>

          {/* Slider Card Sebelah Kanan */}
          <div className="relative h-[550px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlider}
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-[400px] h-full bg-white rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-black/5"
              >
                {/* Gambar Card */}
                <img 
                  src={sliders[currentSlider].img} 
                  className="w-full h-2/3 object-cover" 
                  alt="Product" 
                />
                
                {/* Info Card */}
                <div className="p-8 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#7D8471]">
                      {sliders[currentSlider].title}
                    </span>
                    <span className="text-[10px] font-sans font-bold text-gray-300">0{currentSlider + 1}</span>
                  </div>
                  <h3 className="text-2xl uppercase tracking-tight font-light leading-tight">
                    {sliders[currentSlider].subtitle}
                  </h3>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-sm font-sans font-bold">{sliders[currentSlider].price}</span>
                    <button className="bg-black text-white p-3 rounded-full hover:bg-[#7D8471] transition-colors">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigasi Slider */}
            <div className="absolute -bottom-10 flex gap-4">
              <button onClick={prevSlide} className="p-4 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="p-4 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COLLECTION SECTION */}
      <section id="collection" className="relative z-20 bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-4">
              <span className="text-[#7D8471] font-bold text-[10px] tracking-widest uppercase italic">01 // Summer Drop</span>
              <h3 className="text-5xl font-light uppercase tracking-tighter">Current <br/> In-Stock</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((item) => (
              <motion.div key={item.id} whileHover={{ y: -10 }} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#F5F5F5] overflow-hidden mb-6 relative border border-black/5">
                   <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                      {item.tag}
                   </div>
                   <div className="w-full h-full bg-[#EAE8E4] flex items-center justify-center text-gray-300 italic group-hover:scale-110 transition-transform duration-700">
                      [Image]
                   </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight mb-1">{item.name}</h4>
                    <p className="text-[10px] text-[#7D8471] font-sans font-bold">{item.price}</p>
                  </div>
                  <ArrowRight size={16} className="-rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BRANDING SECTION */}
      <section id="about" className="bg-[#1A1A1A] py-32 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <ShieldCheck size={40} className="mx-auto text-[#7D8471]" />
          <h3 className="text-5xl font-light uppercase italic tracking-tighter">Build with Respect, <br/> Worn with Pride.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-10">
             {['Premium Fabric', 'Signature Cut', 'Limited Batch', 'Authenticity Card'].map(f => (
               <div key={f} className="space-y-1">
                 <p className="text-[8px] text-[#7D8471] font-bold uppercase tracking-widest">Guaranteed</p>
                 <p className="text-[10px] font-bold uppercase">{f}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT & SHARELOK */}
      <section id="contact" className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h3 className="text-5xl font-light uppercase tracking-tighter">Location</h3>
            <div className="space-y-6">
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#7D8471] group-hover:text-white transition-all">
                  <MessageCircle size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest italic">WhatsApp Admin</span>
              </a>
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#7D8471] group-hover:text-white transition-all">
                  <Instagram size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest italic">@bagasgaulmbois</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="w-full aspect-video bg-[#F5F5F5] border border-black/5 flex items-center justify-center italic text-gray-400 text-xs grayscale">
              [Google Maps Sharelok Embed]
            </div>
            <p className="text-xs font-sans text-gray-500 uppercase">
              Jl. Mbois Nomor 1, Sukolilo, Surabaya <br/>
              Mon - Sat // 10.00 - 22.00
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-black/5 pt-10 gap-6">
          <h2 className="text-2xl font-light italic">BGM<span className="text-[#7D8471]">.</span></h2>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.5em]">© 2026 BGM ATELIER — SURABAYA</p>
        </div>
      </footer>

      {/* PROGRESS BAR */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[4px] bg-[#7D8471] z-[2000] origin-left" />

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #7D8471; }
      `}</style>
    </main>
  )
}