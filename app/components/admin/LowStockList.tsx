export default function LowStockList({ products }: any) {
  const lowStock = products.filter((item: any) => item.stock <= 12)

  return (
    <section className="bg-white rounded-[2.5rem] border border-black/5 p-8">
      <div className="mb-8">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
          Low Stock Alert
        </p>

        <h3 className="text-3xl font-light uppercase tracking-tighter">
          Restock List
        </h3>
      </div>

      <div className="space-y-4">
        {lowStock.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#F7F7F2]"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-xl object-cover"
              />

              <div>
                <p className="text-xs font-black uppercase tracking-wider">
                  {item.name}
                </p>

                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                  {item.tag}
                </p>
              </div>
            </div>

            <span className="text-xs font-black text-red-500">
              {item.stock} left
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}