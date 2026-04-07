import React, { useState } from 'react'
import {
  TopBar,
  OutlinePanel,
  SubNavMenu,
  ClearButton,
  HelpButton,
  UserButton,
  TopMenuOptions,
  HomepageSideNav,
  LibrariesSideNav,
  CaptureSideNav,
  ProjectsSideNav,
  GenericSideNav,
  NewSessionButton,
  SessionItem,
  SideNavSection,
} from './components'
import type { ButtonState } from './components'
import { BookOpen, Camera, Home, FolderOpen, LayoutDashboard } from 'lucide-react'

type SidebarVariant = 'homepage' | 'libraries' | 'capture' | 'projects-uk-q' | 'projects-usa-p' | 'generic'
type DemoSection = 'overview' | 'top-nav' | 'left-nav' | 'full-layout'

const sidebarVariants: { id: SidebarVariant; label: string }[] = [
  { id: 'homepage', label: 'Homepage' },
  { id: 'libraries', label: 'Libraries & Datasets' },
  { id: 'capture', label: 'Capture' },
  { id: 'projects-uk-q', label: 'Projects (UK / Questions)' },
  { id: 'projects-usa-p', label: 'Projects (USA / Proposals)' },
  { id: 'generic', label: 'Generic' },
]

const demoSessions = [
  { id: 's1', title: 'Interview with participant 3', subtitle: 'Capture session', timestamp: '2h', isActive: true },
  { id: 's2', title: 'Focus group recording', subtitle: 'Group session', timestamp: '1d' },
  { id: 's3', title: 'Usability test - v2 prototype', timestamp: '3d' },
  { id: 's4', title: 'Stakeholder interview', subtitle: 'Remote session', timestamp: '1w' },
]

const buttonStates: ButtonState[] = ['default', 'hover', 'pressed', 'active', 'focused', 'disabled']

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  )
}

function ComponentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">{title}</h3>
      {children}
    </div>
  )
}

function NavTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
        active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState<DemoSection>('overview')
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariant>('homepage')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [activeSectionId, setActiveSectionId] = useState<string>('home')
  const [activeSubItemId, setActiveSubItemId] = useState<string | undefined>(undefined)

  function renderSidebar() {
    const commonProps = {
      isExpanded: sidebarExpanded,
      onToggleExpand: () => setSidebarExpanded((v) => !v),
      activeSectionId,
      activeSubItemId,
      sessions: demoSessions,
      onSectionClick: setActiveSectionId,
      onSubItemClick: setActiveSubItemId,
    }

    switch (sidebarVariant) {
      case 'homepage': return <HomepageSideNav {...commonProps} />
      case 'libraries': return <LibrariesSideNav {...commonProps} />
      case 'capture': return <CaptureSideNav {...commonProps} />
      case 'projects-uk-q': return <ProjectsSideNav {...commonProps} region="uk" flow="question" />
      case 'projects-usa-p': return <ProjectsSideNav {...commonProps} region="usa" flow="proposal" />
      case 'generic': return <GenericSideNav {...commonProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">CL</span>
          </div>
          <span className="font-semibold text-gray-900">Components Library</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Secondary Navigation</span>
        </div>
        <div className="flex items-center gap-1">
          {(['overview', 'top-nav', 'left-nav', 'full-layout'] as DemoSection[]).map((s) => (
            <NavTab
              key={s}
              label={s === 'overview' ? 'Overview' : s === 'top-nav' ? 'Top Nav' : s === 'left-nav' ? 'Left Nav' : 'Full Layout'}
              active={activeSection === s}
              onClick={() => setActiveSection(s)}
            />
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Secondary Navigation</h1>
            <p className="text-gray-500 mt-2 text-lg">
              A complete navigation component system with responsive top bar and collapsible sidebar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Atoms', count: 7, desc: 'Icon buttons, section items, session items' },
              { label: 'Molecules', count: 5, desc: 'Menu groups, outline panel, section nav' },
              { label: 'Organisms', count: 7, desc: 'Top bar + 5 sidebar variants' },
            ].map((tier) => (
              <div key={tier.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">{tier.count}</div>
                <div className="font-semibold text-gray-900">{tier.label}</div>
                <div className="text-sm text-gray-500 mt-1">{tier.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComponentCard title="Top Bar Preview">
              <TopBar className="rounded-lg border border-gray-100 overflow-hidden" />
            </ComponentCard>

            <ComponentCard title="Sidebar Preview">
              <div className="flex h-48 rounded-lg overflow-hidden border border-gray-100">
                <HomepageSideNav
                  isExpanded={true}
                  activeSectionId="home"
                  showSessions={false}
                  className="flex-shrink-0"
                />
                <div className="flex-1 bg-gray-50 p-3">
                  <div className="text-xs text-gray-400">Content area</div>
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>
      )}

      {/* Top Nav Section */}
      {activeSection === 'top-nav' && (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          <SectionHeader title="Top Navigation" description="Atoms, molecules, and organisms for the top navigation bar" />

          <ComponentCard title="Atoms — Icon Buttons">
            <div className="space-y-4">
              {(['Clear', 'Help', 'User'] as const).map((type) => (
                <div key={type}>
                  <div className="text-xs text-gray-400 mb-2">{type}</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {buttonStates.map((state) => (
                      <div key={state} className="flex flex-col items-center gap-1">
                        {type === 'Clear' && <ClearButton state={state} />}
                        {type === 'Help' && <HelpButton state={state} />}
                        {type === 'User' && <UserButton state={state} />}
                        <span className="text-xs text-gray-400 capitalize">{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>

          <ComponentCard title="Atoms — User Button (Full Display)">
            <div className="flex items-center gap-4 flex-wrap">
              {buttonStates.map((state) => (
                <div key={state} className="flex flex-col items-center gap-1">
                  <UserButton state={state} displayMode="full" userName="Jane Smith" userRole="Researcher" />
                  <span className="text-xs text-gray-400 capitalize">{state}</span>
                </div>
              ))}
            </div>
          </ComponentCard>

          <ComponentCard title="Molecule — Top Menu Options">
            <div className="flex items-center gap-8 flex-wrap">
              <div>
                <div className="text-xs text-gray-400 mb-2">Icon only</div>
                <TopMenuOptions />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-2">With user display</div>
                <TopMenuOptions userDisplayMode="full" userName="Jane Smith" userRole="Researcher" />
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Molecule — Outline Panel">
            <OutlinePanel />
          </ComponentCard>

          <ComponentCard title="Molecule — Sub Navigation Menu">
            <div className="flex gap-4 flex-wrap">
              <SubNavMenu
                title="Libraries"
                items={[
                  { id: 'my-lib', label: 'My Library' },
                  { id: 'shared', label: 'Shared Libraries' },
                  { id: 'datasets', label: 'Datasets', badge: 3 },
                  { id: 'archive', label: 'Archive' },
                ]}
              />
              <SubNavMenu
                title="Capture"
                items={[
                  { id: 'new', label: 'New Session' },
                  { id: 'sessions', label: 'All Sessions', badge: 12 },
                  { id: 'recordings', label: 'Recordings' },
                ]}
                activeId="sessions"
              />
            </div>
          </ComponentCard>

          <ComponentCard title="Organism — Top Bar (Interactive)">
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <TopBar
                navItems={[
                  { id: 'home', label: 'Home' },
                  { id: 'libraries', label: 'Libraries', hasDropdown: true, dropdownItems: [
                    { id: 'my-lib', label: 'My Library' },
                    { id: 'shared', label: 'Shared' },
                  ]},
                  { id: 'capture', label: 'Capture', isActive: true },
                  { id: 'projects', label: 'Projects' },
                  { id: 'settings', label: 'Settings' },
                ]}
                userName="Jane Smith"
                userRole="Researcher"
              />
            </div>
          </ComponentCard>
        </div>
      )}

      {/* Left Nav Section */}
      {activeSection === 'left-nav' && (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          <SectionHeader title="Left Navigation" description="Sidebar atoms, molecules, and 5 organism variants" />

          <ComponentCard title="Atoms — New Session Button">
            <div className="bg-[#1e2432] rounded-lg p-4 space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-2">Expanded</div>
                <NewSessionButton isExpanded={true} platform="mac" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Collapsed</div>
                <NewSessionButton isExpanded={false} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Windows shortcut</div>
                <NewSessionButton isExpanded={true} platform="windows" />
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Atoms — Session Items">
            <div className="bg-[#1e2432] rounded-lg p-2 space-y-0.5">
              {demoSessions.map((s) => (
                <SessionItem key={s.id} {...s} />
              ))}
            </div>
          </ComponentCard>

          <ComponentCard title="Molecule — Side Nav Section">
            <div className="bg-[#1e2432] rounded-lg p-2 space-y-0.5 w-56">
              <SideNavSection
                id="libraries"
                label="Libraries"
                icon={<BookOpen size={18} />}
                state="default"
                isExpanded={true}
                sidebarExpanded={true}
                subItems={[
                  { id: 'my-lib', label: 'My Library' },
                  { id: 'shared', label: 'Shared' },
                  { id: 'datasets', label: 'Datasets' },
                ]}
                activeSubId="my-lib"
              />
              <SideNavSection
                id="capture"
                label="Capture"
                icon={<Camera size={18} />}
                state="active"
                sidebarExpanded={true}
              />
              <SideNavSection
                id="home"
                label="Home"
                icon={<Home size={18} />}
                state="default"
                sidebarExpanded={true}
              />
            </div>
          </ComponentCard>

          <ComponentCard title="Organisms — Sidebar Variants">
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              {sidebarVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSidebarVariant(v.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    sidebarVariant === v.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1.5">Expanded</div>
                <div className="h-72 rounded-lg overflow-hidden">
                  {renderSidebar()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1.5">Collapsed</div>
                <div className="h-72 rounded-lg overflow-hidden">
                  {(() => {
                    const props = {
                      isExpanded: false,
                      activeSectionId,
                      sessions: demoSessions,
                    }
                    switch (sidebarVariant) {
                      case 'homepage': return <HomepageSideNav {...props} />
                      case 'libraries': return <LibrariesSideNav {...props} />
                      case 'capture': return <CaptureSideNav {...props} />
                      case 'projects-uk-q': return <ProjectsSideNav {...props} region="uk" flow="question" />
                      case 'projects-usa-p': return <ProjectsSideNav {...props} region="usa" flow="proposal" />
                      case 'generic': return <GenericSideNav {...props} />
                    }
                  })()}
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}

      {/* Full Layout */}
      {activeSection === 'full-layout' && (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 57px)' }}>
          <TopBar
            navItems={[
              { id: 'home', label: 'Home' },
              { id: 'libraries', label: 'Libraries', hasDropdown: true, dropdownItems: [
                { id: 'my-lib', label: 'My Library' },
                { id: 'shared', label: 'Shared' },
                { id: 'datasets', label: 'Datasets' },
              ]},
              { id: 'capture', label: 'Capture', isActive: true, hasDropdown: true, dropdownItems: [
                { id: 'new', label: 'New Session' },
                { id: 'all', label: 'All Sessions' },
              ]},
              { id: 'projects', label: 'Projects' },
            ]}
            userName="Jane Smith"
            userRole="Researcher"
          />
          {/* Variant selector */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 mr-1">Sidebar:</span>
            {sidebarVariants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSidebarVariant(v.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                  sidebarVariant === v.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex flex-1 overflow-hidden">
            {renderSidebar()}
            <main className="flex-1 overflow-auto p-8 bg-gray-50">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Content Area</h1>
              <p className="text-gray-500">
                This demonstrates the full layout with the {sidebarVariants.find((v) => v.id === sidebarVariant)?.label} sidebar variant.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="h-4 bg-gray-100 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-50 rounded w-full mb-1" />
                    <div className="h-3 bg-gray-50 rounded w-2/3" />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}
