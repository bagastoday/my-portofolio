'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Search,
  Menu,
  Zap,
  Globe,
  Star,
  ArrowRight,
  Instagram,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
} from 'lucide-react'

type Product = {
  id: string | number
  name: string
  price: number | string
  stock?: number
  sold?: number
  tag: string
  status?: string
  image: string
}

export default function BGMFinalDeploy() {
  const [currentSlider, setCurrentSlider] = useState(0)
  const [supabaseProducts, setSupabaseProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    fetchProducts()

    const channel = supabase
      .channel('products-realtime-client')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        () => {
          fetchProducts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .neq('status', 'Draft')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error.message)
      return
    }

    setSupabaseProducts(data || [])
  }

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  const priceToNumber = (price: number | string) => {
    if (typeof price === 'number') return price
    return Number(price.replace(/[^\d]/g, '')) || 0
  }

  const addToCart = (product: Product) => {
    if (
      product.status === 'Sold Out' ||
      (typeof product.stock === 'number' && product.stock <= 0)
    ) {
      return
    }

    setCart((prev) => [...prev, product])
    setIsCartOpen(true)
  }

  const removeFromCart = (indexToRemove: number) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const totalCart = cart.reduce((total, item) => {
    return total + priceToNumber(item.price)
  }, 0)

  const sliders = [
    {
      id: 1,
      title: 'Adidas Adizero Evo SL',
      subtitle: 'Black White Men',
      price: 'Rp 1.999.000',
      img: '/images/adidas.jpg',
    },
    {
      id: 2,
      title: 'Limited Drop 02',
      subtitle: 'Adidas Adizero Performance',
      price: 'Rp 449.000',
      img: '/images/adidas1.jpg',
    },
    {
      id: 3,
      title: 'BGM Archive',
      subtitle: 'Culture Heavy Hoodie',
      price: 'Rp 379.000',
      img: '/images/bagasmbois1.png',
    },
  ]

  const nextSlide = () =>
    setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1))

  const prevSlide = () =>
    setCurrentSlider((prev) => (prev === 0 ? sliders.length - 1 : prev - 1))

  const products: Product[] = [
    {
      id: 1,
      name: 'Signature Mbois Tee',
      price: 'Rp 189.000',
      tag: 'Essential',
      image: '/images/bagas.png',
    },
    {
      id: 2,
      name: 'Atelier Work Jacket',
      price: 'Rp 449.000',
      tag: 'Limited',
      image: '/images/adidas1.jpg',
    },
    {
      id: 3,
      name: 'Culture Heavy Hoodie',
      price: 'Rp 379.000',
      tag: 'Archive',
      image: '/images/bagasmbois1.png',
    },
    {
      id: 4,
      name: 'Cargo Utility Pants',
      price: 'Rp 329.000',
      tag: 'Drop',
      image: '/images/adidas.jpg',
    },
  ]

  const displayProducts = supabaseProducts.length > 0 ? supabaseProducts : products

  return (
    <main className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A] font-serif antialiased selection:bg-[#7D8471] selection:text-white overflow-x-hidden">
      <header className="fixed top-0 w-full z-[1000] bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-tighter uppercase italic">
            BGM<span className="text-[#7D8471]">.</span>
          </h1>

          <nav className="hidden md:flex gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
            <a href="#collection" className="hover:text-black transition-all">
              Collections
            </a>
            <a href="#about" className="hover:text-black transition-all">
              Heritage
            </a>
            <a href="#contact" className="hover:text-black transition-all">
              Contact
            </a>
          </nav>

          <div className="flex gap-6 items-center">
            <Search size={18} />

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 bg-[#7D8471] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </button>

            <Menu size={20} className="md:hidden" />
          </div>
        </div>

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

      <section className="relative min-h-screen pt-40 pb-20 flex flex-col items-center justify-center bg-[#F9F9F7]">
        <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[#7D8471] text-[10px] font-bold uppercase tracking-[0.8em]">
              Premium Atelier
            </span>

            <h2 className="text-7xl md:text-8xl font-extralight leading-[0.9] tracking-tighter uppercase">
              Mbois <br />{' '}
              <span className="opacity-30 italic font-light">Culture.</span>
            </h2>

            <p className="text-sm text-gray-500 italic max-w-sm leading-relaxed font-sans">
              Eksplorasi gaya autentik dengan kualitas hardware terbaik. Karena mbois adalah hak segala bangsa.
            </p>

            <a
              href="#collection"
              className="inline-flex bg-black text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#7D8471] transition-all"
            >
              Shop Collection
            </a>
          </motion.div>

          <div className="relative h-[550px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlider}
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full max-w-[400px] h-full bg-white rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-black/5 flex flex-col"
              >
                <img
                  src={sliders[currentSlider].img}
                  className="w-full h-2/3 object-cover"
                  alt="Hero"
                />

                <div className="p-8 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#7D8471]">
                      {sliders[currentSlider].title}
                    </span>

                    <span className="text-[10px] font-sans font-bold text-gray-300">
                      0{currentSlider + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl uppercase tracking-tight font-light leading-tight">
                    {sliders[currentSlider].subtitle}
                  </h3>

                  <div className="flex justify-between items-center pt-4">
                    <span className="text-sm font-sans font-bold">
                      {sliders[currentSlider].price}
                    </span>

                    <button className="bg-black text-white p-3 rounded-full hover:bg-[#7D8471] transition-colors">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-10 flex gap-4">
              <button
                onClick={prevSlide}
                className="p-4 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="p-4 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="relative z-20 bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-4">
              <span className="text-[#7D8471] font-bold text-[10px] tracking-widest uppercase italic">
                01 // Summer Drop
              </span>

              <h3 className="text-5xl font-light uppercase tracking-tighter">
                Current <br /> In-Stock
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((item) => {
              const isUnavailable =
                item.status === 'Sold Out' ||
                (typeof item.stock === 'number' && item.stock <= 0)

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -12 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border border-black/5 flex flex-col h-full">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full">
                        {item.tag}
                      </div>

                      {isUnavailable && (
                        <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                            Sold Out
                          </span>
                        </div>
                      )}

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-6 space-y-3 bg-white">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[11px] font-bold uppercase tracking-tight text-gray-800 leading-tight">
                          {item.name}
                        </h4>

                        <ArrowRight
                          size={14}
                          className="-rotate-45 opacity-20 group-hover:opacity-100 group-hover:text-[#7D8471] transition-all"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-black/5">
                        <p className="text-[12px] text-[#7D8471] font-sans font-black">
                          {typeof item.price === 'number'
                            ? formatRupiah(item.price)
                            : item.price}
                        </p>

                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          disabled={isUnavailable}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isUnavailable
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-50 group-hover:bg-black group-hover:text-white'
                          }`}
                        >
                          <ShoppingBag size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
                  Shopping Cart
                </p>

                <h3 className="text-3xl font-light uppercase tracking-tighter">
                  Your Cart
                </h3>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-xs uppercase tracking-widest font-black">
                  Cart Empty
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-4 p-4 rounded-2xl bg-[#F7F7F2]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-xs font-black uppercase">
                        {item.name}
                      </p>

                      <p className="text-[10px] text-[#7D8471] uppercase">
                        {item.tag}
                      </p>

                      <p className="mt-2 text-sm font-black">
                        {typeof item.price === 'number'
                          ? formatRupiah(item.price)
                          : item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-10 border-t border-black/5 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Total
                </span>

                <span className="text-xl font-black">
                  {formatRupiah(totalCart)}
                </span>
              </div>

              <button
                disabled={cart.length === 0}
                className="w-full bg-black text-white py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#7D8471] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="about" className="bg-[#1A1A1A] py-32 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <ShieldCheck size={40} className="mx-auto text-[#7D8471]" />

          <h3 className="text-5xl font-light uppercase italic tracking-tighter">
            Build with Respect, <br /> Worn with Pride.
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-10">
            {['Premium Fabric', 'Signature Cut', 'Limited Batch', 'Authenticity Card'].map((f) => (
              <div key={f} className="space-y-1">
                <p className="text-[8px] text-[#7D8471] font-bold uppercase tracking-widest">
                  Guaranteed
                </p>
                <p className="text-[10px] font-bold uppercase">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h3 className="text-5xl font-light uppercase tracking-tighter">
              Location
            </h3>

            <div className="space-y-6">
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#7D8471] group-hover:text-white transition-all">
                  <MessageCircle size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest italic">
                  WhatsApp Admin
                </span>
              </a>

              <a href="#" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#7D8471] group-hover:text-white transition-all">
                  <Instagram size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest italic">
                  @bagasgaulmbois
                </span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-full aspect-video bg-[#F5F5F5] rounded-[2rem] border border-black/5 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.123!2d112.79!3d-7.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9!2sSukolilo%2C%20Surabaya!5e0!3m2!1sid!2sid!4v1700000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider">
              Jl. Mbois Nomor 1, Sukolilo, Surabaya <br />
              Mon - Sat // 10.00 - 22.00
            </p>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-black/5 pt-10 gap-6">
          <h2 className="text-2xl font-light italic">
            BGM<span className="text-[#7D8471]">.</span>
          </h2>

          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.5em]">
            © 2026 BGM ATELIER — SURABAYA
          </p>
        </div>
      </footer>

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[4px] bg-[#7D8471] z-[2000] origin-left"
      />

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: #7d8471;
        }
      `}</style>
    </main>
  )
}