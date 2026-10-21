'use client';
import { useState, useEffect } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuickDock from '../components/QuickDock';
import InquiryModal from '../components/InquiryModal';
import ProductModal from '../components/ProductModal';

export default function LayoutClientWrapper({ children }) {
  const [inquiryModalData, setInquiryModalData] = useState(null);
  const [productModalData, setProductModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3800);
  };

  useEffect(() => {
    // Expose helpers on window for any child component
    window.afgOpenInquiry = (product) => setInquiryModalData(product || { title: 'Bespoke Atelier Commission' });
    window.afgOpenProduct = (product) => setProductModalData(product);
    window.afgToast = (msg) => showToast(msg);

    // Scroll listener to toggle merged hero nav vs floating capsule dock
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Disable custom cursor if any old css was attached
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header-container ${isScrolled ? 'is-scrolled' : 'is-at-top'}`}>
        <AnnouncementBar />
        <Navbar isScrolled={isScrolled} onOpenInquiry={(p) => setInquiryModalData(p)} />
      </header>

      <main>{children}</main>

      <Footer />
      <QuickDock onOpenInquiry={(p) => setInquiryModalData(p)} />

      {/* Dynamic Product Dossier Modal */}
      {productModalData && (
        <ProductModal
          product={productModalData}
          onClose={() => setProductModalData(null)}
          onInquire={(p) => setInquiryModalData(p)}
          onToast={showToast}
        />
      )}

      {/* Bespoke Inquiry & Lead Persistence Modal */}
      {inquiryModalData && (
        <InquiryModal
          initialProduct={inquiryModalData}
          onClose={() => setInquiryModalData(null)}
          onToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-notify" role="alert">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
