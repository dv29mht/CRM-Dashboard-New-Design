import { useState } from 'react';
import {
  LayoutDashboard, ClipboardList, Building2, TrendingUp, Megaphone,
  Settings, DollarSign, FileText, CheckSquare, Wrench, Cog,
  ChevronRight, PanelLeftClose, PanelLeft,
} from 'lucide-react';
import { sidebarMenu } from '../data/mockData';

const iconMap = {
  LayoutDashboard, ClipboardList, Building2, TrendingUp, Megaphone,
  Settings, DollarSign, FileText, CheckSquare, Wrench, Cog,
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (id) => {
    if (collapsed) return;
    setOpenGroup((prev) => (prev === id ? null : id));
  };

  const w = collapsed ? 'w-16' : 'w-[220px]';

  return (
    <aside
      className={`fixed left-0 top-[70px] bottom-0 ${w} bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-200`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>
        {!collapsed && <span className="text-sm font-semibold text-slate-800">Dashboard</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {sidebarMenu.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openGroup === item.id;

          return (
            <div key={item.id}>
              <button
                onClick={() => (hasChildren ? toggleGroup(item.id) : null)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative group
                  ${item.active
                    ? 'bg-blue-50 text-blue-700 font-medium border-l-[3px] border-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 border-l-[3px] border-transparent'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {hasChildren && (
                      <ChevronRight
                        size={14}
                        className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      />
                    )}
                  </>
                )}
                {/* Tooltip for collapsed mode */}
                {collapsed && (
                  <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                    {item.label}
                  </span>
                )}
              </button>

              {/* Children */}
              {hasChildren && !collapsed && (
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="block pl-12 pr-4 py-2 text-[13px] text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-100 text-center">
          <div className="text-[10px] tracking-wider text-slate-400 uppercase">Powered by</div>
          <div className="text-[9px] font-semibold text-slate-500 tracking-wide mt-0.5">
            DAHLIA TECHNOLOGIES PTE. LTD.
          </div>
        </div>
      )}
    </aside>
  );
}
