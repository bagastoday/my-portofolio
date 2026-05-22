import { Bell, Search } from 'lucide-react'

export default function AdminHeader({ title = 'Dashboard' }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 bg-[#F7F7F2]/90 backdrop-blur-md border-b border-black/5 px-6 md:px-10 py-6 flex justify-between items-center">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#7D8471]">
          Admin Panel
        </p>

        <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-11 h-11 rounded-full bg-white border border-black/5 flex items-center justify-center">
          <Search size={18} />
        </button>

        <button className="w-11 h-11 rounded-full bg-white border border-black/5 flex items-center justify-center">
          <Bell size={18} />
        </button>

        <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
          B
        </div>
      </div>
    </header>
  )
}