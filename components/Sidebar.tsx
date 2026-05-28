import { Search, LayoutDashboard, Briefcase, FileText, Settings, Users, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Search, label: 'Search' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Briefcase, label: 'Opportunities', active: true },
  { icon: FileText, label: 'Projects' },
  { icon: Users, label: 'Team' },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[64px] shrink-0 flex-col items-center border-r border-[#e3e3e3] bg-white px-[8px] py-[12px]">
      {/* Logo */}
      <div className="mb-[8px] flex h-[32px] w-full items-center justify-center">
        <div className="flex h-[20px] w-[20px] items-center justify-center rounded-[3px] bg-[#1b1b1b]">
          <span className="text-[10px] font-bold text-white">A</span>
        </div>
      </div>

      {/* Client logo placeholder */}
      <div className="mb-[8px] flex h-[40px] w-[40px] items-center justify-center rounded-[6px] border border-[#e3e3e3]">
        <span className="font-['Bebas_Neue',_sans-serif] text-[14px] text-[#9a9a9a]">logo</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col items-center gap-[2px] pt-[4px]">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={[
              'group relative flex h-[48px] w-[48px] items-center justify-center rounded-[5px] transition-colors',
              active ? 'bg-[#EEF2FF] text-[#3B5BDB]' : 'text-[#9a9a9a] hover:bg-[#f5f5f5] hover:text-[#1b1b1b]',
            ].join(' ')}
          >
            <Icon size={22} />
            {/* Tooltip */}
            <span className="pointer-events-none absolute left-[56px] z-50 whitespace-nowrap rounded-[4px] bg-[#2e2e2e] px-[8px] py-[4px] text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {label}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-[4px] border-transparent border-r-[#2e2e2e]" />
            </span>
          </button>
        ))}
      </nav>

      {/* Settings at bottom */}
      <button
        title="Settings"
        className="group relative flex h-[48px] w-[48px] items-center justify-center rounded-[5px] text-[#9a9a9a] hover:bg-[#f5f5f5] hover:text-[#1b1b1b]"
      >
        <Settings size={22} />
        <span className="pointer-events-none absolute left-[56px] z-50 whitespace-nowrap rounded-[4px] bg-[#2e2e2e] px-[8px] py-[4px] text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
          Settings
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-[4px] border-transparent border-r-[#2e2e2e]" />
        </span>
      </button>
    </aside>
  );
}
