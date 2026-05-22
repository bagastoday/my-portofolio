'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('LOGIN DATA:', data)
      console.log('LOGIN ERROR:', error)

      if (error) {
        alert(error.message)
        return
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      console.log('CATCH ERROR:', err)
      alert('Login gagal. Cek console untuk detail error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-120px] right-[-120px] w-[360px] h-[360px] bg-[#7D8471]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-140px] left-[-140px] w-[420px] h-[420px] bg-black/10 rounded-full blur-3xl" />

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-9 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.35)] border border-black/5"
      >
        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-8">
          <Sparkles size={22} />
        </div>

        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#7D8471]">
          BGM Atelier
        </p>

        <h1 className="text-5xl font-light uppercase tracking-tighter mt-3 text-black">
          Admin Login
        </h1>

        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          Masuk ke dashboard untuk mengelola produk, stok, order, dan analytics brand.
        </p>

        <div className="mt-9 space-y-5">
          <div>
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
              Email Admin
            </label>

            <div className="mt-2 flex items-center gap-3 bg-[#F7F7F2] rounded-2xl px-5 py-4 border border-black/5">
              <Mail size={17} className="text-[#7D8471]" />

              <input
                type="email"
                placeholder="Masukkan email admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
              Password
            </label>

            <div className="mt-2 flex items-center gap-3 bg-[#F7F7F2] rounded-2xl px-5 py-4 border border-black/5">
              <Lock size={17} className="text-[#7D8471]" />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-black transition-all"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="bg-[#7D8471]/10 border border-[#7D8471]/20 rounded-2xl p-4">
            <p className="text-[10px] text-[#59604E] font-bold leading-relaxed">
              Hint: masukkan email dan password admin yang kamu buat di Supabase Authentication → Users.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#7D8471] transition-all disabled:opacity-50"
          >
            {loading ? 'Checking Access...' : 'Login Dashboard'}
          </button>
        </div>
      </form>
    </main>
  )
}