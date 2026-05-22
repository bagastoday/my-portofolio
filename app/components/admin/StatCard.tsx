import { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  value: string | number
  note: string
  icon: LucideIcon
}

export default function StatCard({ title, value, note, icon: Icon }: Props) {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
      <div className="flex justify-between items-start mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#7D8471]/10 text-[#7D8471] flex items-center justify-center">
          <Icon size={20} />
        </div>

        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
          Live
        </span>
      </div>

      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-sans font-black tracking-tight">
        {value}
      </h3>

      <p className="mt-3 text-[10px] font-bold text-[#7D8471] uppercase tracking-widest">
        {note}
      </p>
    </div>
  )
}