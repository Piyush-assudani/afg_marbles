'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuickDock from '../components/QuickDock';
import InquiryModal from '../components/InquiryModal';
import ProductModal from '../components/ProductModal';
import AtelierSoundscape from '../components/AtelierSoundscape';
import CookieConsent from '../components/CookieConsent';
import ImageLightbox from '../components/ImageLightbox';
import { PRODUCTS } from '../products.js';

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = !pathname || pathname === '/';

  const [inquiryModalData, setInquiryModalData] = useState(null);
  const [productModalData, setProductModalData] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const originalTitleRef = useRef('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3800);
  };

  // Find product by id from master catalog
  const findProductById = useCallback((id) => {
    if (!id) return null;
    const cleanId = id.trim().toLowerCase();
    const normalized = cleanId.replace(/[^a-z0-9]/g, '');
    return (
      PRODUCTS.find((p) => {
        if (!p.id) return false;
        const pid = p.id.toLowerCase();
        return pid === cleanId || pid.replace(/[^a-z0-9]/g, '') === normalized;
      }) || null
    );
  }, []);

  // Extract product ID from hash (#product/id, #id) or search (?product=id)
  const extractProductIdFromUrl = useCallback(() => {
    if (typeof window === 'undefined') return null;
    try {
      // 1. Search param: ?product=id or ?id=id
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('product') || params.get('id');
      if (queryId) return queryId.trim();

      // 2. Hash: #product/id, #product=id, or direct #slug
      const hash = window.location.hash;
      if (hash) {
        const raw = hash.replace(/^#/, '').trim();
        if (raw.startsWith('product/')) return raw.replace('product/', '').trim();
        if (raw.startsWith('product=')) return raw.replace('product=', '').trim();
        if (PRODUCTS.some((p) => p.id?.toLowerCase() === raw.toLowerCase())) {
          return raw;
        }
      }
    } catch (e) {}
    return null;
  }, []);

  // Open product modal and push ID to address bar
  const openProduct = useCallback((product, updateUrl = true) => {
    if (!product) return;
    setProductModalData(product);

    if (typeof document !== 'undefined') {
      if (!originalTitleRef.current) {
        originalTitleRef.current = document.title;
      }
      document.title = `${product.title} | A.F.G Marble & Arts`;
    }

    if (updateUrl && typeof window !== 'undefined') {
      const targetHash = `#product/${product.id}`;
      if (window.location.hash !== targetHash) {
        const cleanPath = window.location.pathname + window.location.search;
        window.history.pushState(
          { productId: product.id },
          `${product.title} | A.F.G Marble & Arts`,
          `${cleanPath}${targetHash}`
        );
      }
    }
  }, []);

  // Close product modal and clean address bar URL
  const closeProduct = useCallback((updateUrl = true) => {
    setProductModalData(null);

    if (typeof document !== 'undefined' && originalTitleRef.current) {
      document.title = originalTitleRef.current;
    }

    if (updateUrl && typeof window !== 'undefined') {
      const hash = window.location.hash;
      const isProductHash =
        hash.startsWith('#product/') ||
        hash.startsWith('#product=') ||
        PRODUCTS.some((p) => hash.toLowerCase() === `#${p.id?.toLowerCase()}`);

      const params = new URLSearchParams(window.location.search);
      const hasProductQuery = params.has('product') || params.has('id');

      if (isProductHash || hasProductQuery) {
        let newSearch = '';
        if (hasProductQuery) {
          params.delete('product');
          params.delete('id');
          const qs = params.toString();
          newSearch = qs ? `?${qs}` : '';
        } else {
          newSearch = window.location.search;
        }
        const cleanUrl = window.location.pathname + newSearch;
        window.history.pushState(null, '', cleanUrl);
      }
    }
  }, []);

  useEffect(() => {
    // Expose helpers on window for any child component
    window.afgOpenInquiry = (product) => setInquiryModalData(product || { title: 'Bespoke Atelier Commission' });
    window.afgOpenProduct = (product) => openProduct(product, true);
    window.afgCloseProduct = () => closeProduct(true);
    window.afgOpenLightbox = (img) => setLightboxData(img);
    window.afgToast = (msg) => showToast(msg);

    // Initial sync from URL on page load / refresh / direct link
    const syncFromUrl = () => {
      const productId = extractProductIdFromUrl();
      if (productId) {
        const found = findProductById(productId);
        if (found) {
          openProduct(found, false);
        }
      } else {
        // If no product in URL, close modal (handles browser Back button)
        setProductModalData(null);
        if (typeof document !== 'undefined' && originalTitleRef.current) {
          document.title = originalTitleRef.current;
        }
      }
    };

    syncFromUrl();

    // Listen to hash changes and browser Back/Forward (popstate)
    const handlePopState = () => {
      syncFromUrl();
    };

    window.addEventListener('hashchange', handlePopState);
    window.addEventListener('popstate', handlePopState);

    // Scroll listener to toggle merged hero nav vs floating capsule dock
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Disable custom cursor if any old css was attached
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';

    // Self-healing for live deployment chunk updates (ChunkLoadError recovery)
    const handleChunkError = (e) => {
      const msg = (e?.message || e?.reason?.message || '').toLowerCase();
      if (
        msg.includes('chunkloaderror') ||
        msg.includes('loading chunk') ||
        msg.includes('failed to fetch dynamically imported module') ||
        msg.includes('connection closed') ||
        msg.includes('failed to find server action')
      ) {
        window.location.reload();
      }
    };
    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleChunkError);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleChunkError);
    };
  }, [openProduct, closeProduct, extractProductIdFromUrl, findProductById]);

  return (
    <>
      <header className={`site-header-container ${isScrolled ? 'is-scrolled' : 'is-at-top'} ${!isHomePage ? 'site-header-container--subpage' : ''}`}>
        {isHomePage && <AnnouncementBar />}
        <Navbar isScrolled={isScrolled} onOpenInquiry={(p) => setInquiryModalData(p)} />
      </header>

      <main>{children}</main>

      <Footer />
      <QuickDock onOpenInquiry={(p) => setInquiryModalData(p)} />

      {/* Dynamic Product Dossier Modal with URL Sync */}
      {productModalData && (
        <ProductModal
          product={productModalData}
          onClose={() => closeProduct(true)}
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

      {/* Floating Patron Privacy & Cookie Charter Capsule */}
      <CookieConsent />

      {/* Global High-Resolution Architectural Image Lightbox */}
      {lightboxData && (
        <ImageLightbox
          image={lightboxData}
          onClose={() => setLightboxData(null)}
        />
      )}
    </>
  );
}
