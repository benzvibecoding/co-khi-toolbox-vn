'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { UnitSystemProvider } from '@/lib/hooks/useUnitSystem';

/** Shell client: Header + Sidebar(drawer mobile) + content + Footer. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <UnitSystemProvider>
      <Header onMenuClick={() => setMobileOpen(true)} />
      <div className="container-content flex items-start gap-0 lg:gap-6">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1 py-6" id="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </UnitSystemProvider>
  );
}
