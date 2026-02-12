import { Bell, ChevronDown, Globe } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-gradient-to-r from-navy-900 to-navy-800 flex items-center justify-between px-6 z-50 shadow-md">
      {/* Left — Brand + Quick Access */}
      <div className="flex items-center gap-6">
        <span className="text-3xl font-bold tracking-wide text-sky-300">CRM</span>
        <nav className="hidden lg:flex items-center gap-1">
          {['Clients', 'Leads', 'Opportunities', 'Quotation'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-3 py-1.5 text-[13px] font-medium text-white/80 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Center — Company selector */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 min-w-[320px] cursor-pointer">
          <span className="text-sm text-slate-700 flex-1">Dahlia Technologies Pvt. Ltd.</span>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-5">
        <button className="relative text-white/80 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        <div className="flex items-center gap-1.5 border border-white/20 rounded px-3 py-1.5 text-white text-sm cursor-pointer">
          <Globe size={14} />
          <span>English</span>
          <ChevronDown size={12} />
        </div>
        <div className="w-9 h-9 rounded-full bg-sky-400 flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
          DM
        </div>
      </div>
    </header>
  );
}
