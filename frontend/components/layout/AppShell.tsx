'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming Button component exists

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close mobile sidebar on route change
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen md:flex">
      {/* Mobile menu button / Top Bar */}
      <div className="bg-background-dark text-text-primary-dark flex justify-between md:hidden sticky top-0 z-30 border-b border-border-dark">
        <Link href="/" className="block p-4 font-bold">ibe160</Link>
        <button className="p-4 focus:outline-none focus:bg-content-dark" onClick={toggleMobileSidebar} aria-label="Open mobile menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`bg-background-dark border-r border-border-dark flex-col p-4 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex z-40
          ${isSidebarCollapsed ? 'w-[80px]' : 'w-[220px]'}
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isMobileSidebarOpen ? 'flex' : 'hidden'} md:flex`}
      >
        <div className={`flex items-center gap-3 mb-8 ${isSidebarCollapsed ? 'justify-center' : ''} logo-container`}>
          <div className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyKrKzNZ2dzHCiPU5hpsTon_I7CMbryH7wdM2h_7p4NsM8qCzbDF3wlU3BaGRqQyDI2Cbpa5nfBSPlSrB8UZ88NDMRD6ybP-gbuFOhd-TwIw7rCPcepyTnuZKgftvDU6vJJpiYUlvIuhTxvyHJulTigwpAVJSB7KpWpJWlZvadOOI3AU-h8H0wjOjqH_jplu7K1nWU27kgGacEnFNSuQbA8ZBnA7FPQRy9a7RvT3JfRdasTivgc8LW5KmwZyUEpPKdyHnij0TXYVQ")' }}></div>
          <div className={`${isSidebarCollapsed ? 'hidden' : 'user-info'}`}>
            <h1 className="font-bold text-text-primary-dark">ibe160</h1>
            <p className="text-xs text-text-secondary-dark">Shift Management</p>
          </div>
        </div>
        <nav className="flex flex-col flex-grow gap-2">
          {['Dashboard', 'Shift Reports', 'Historical', 'Settings'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className={`nav-link flex items-center gap-3 px-3 py-2 rounded-md hover:bg-content-dark transition-colors
                ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <span className="material-symbols-outlined text-text-secondary-dark">
                {item === 'Dashboard' && 'dashboard'}
                {item === 'Shift Reports' && 'assignment'}
                {item === 'Historical' && 'history'}
                {item === 'Settings' && 'settings'}
              </span>
              <span className={`font-medium text-sm ${isSidebarCollapsed ? 'hidden' : 'sidebar-text'}`}>{item}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 mt-auto"> {/* mt-auto pushes this section to the bottom */}
          <Button className="w-full h-10 px-4 flex items-center justify-center bg-primary-accent text-background-dark font-bold text-sm rounded-md hover:bg-primary-accent/90 transition-colors">
            <span className={`material-symbols-outlined ${!isSidebarCollapsed ? 'mr-2' : ''} ${isSidebarCollapsed ? '' : 'new-report-icon'}`}>add</span>
            <span className={`${isSidebarCollapsed ? 'hidden' : 'new-report-text'}`}>New Report</span>
          </Button>
          {['Help', 'Logout'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`nav-link flex items-center gap-3 px-3 py-2 rounded-md hover:bg-content-dark transition-colors
                ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <span className="material-symbols-outlined text-text-secondary-dark">
                {item === 'Help' && 'help_outline'}
                {item === 'Logout' && 'logout'}
              </span>
              <span className={`font-medium text-sm ${isSidebarCollapsed ? 'hidden' : 'sidebar-text'}`}>{item}</span>
            </Link>
          ))}
        </div>
        <div className="border-t border-border-dark mt-4 pt-4 hidden md:block">
          <button className="w-full flex items-center justify-center text-text-secondary-dark hover:text-text-primary-dark" onClick={toggleSidebarCollapse} aria-label="Toggle sidebar collapse">
            <span className={`material-symbols-outlined sidebar-toggle-icon transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`}>chevron_left</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={closeMobileSidebar}></div>
      )}
      
      <main className="flex-1 p-4 md:p-8 bg-background-dark">
        <div className="mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
