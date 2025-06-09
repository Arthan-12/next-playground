'use client';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import { SessionProvider } from '@/contexts/SessionContext';
import ProtectedRoute from '@/guard/ProtectedRoute';
import { userService } from '@/services/user/user-services';
import { Geist, Geist_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/login' && pathname !== '/create-account';
  const showHeader = pathname !== '/login';

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SessionProvider>
            <div className="w-full flex flex-col">
              {showHeader && <Header />}
              <div className="flex">
                {showSidebar && (
                  <ProtectedRoute>
                    <Sidebar />
                  </ProtectedRoute>
                )}
                {children}
              </div>
            </div>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
