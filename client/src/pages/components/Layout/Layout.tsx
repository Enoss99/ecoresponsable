// src/components/Layout.tsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">{children}</main>
      <Footer />
    </div>
  );
}
