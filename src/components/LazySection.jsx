'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * LazySection
 * Progressively loads below-the-fold sections on scroll to dramatically improve initial page load speed.
 * Prevents Cumulative Layout Shift (CLS) by reserving minHeight.
 * Loads 350px before the section enters the viewport so the user never sees a delay.
 */
export default function LazySection({
  children,
  minHeight = '480px',
  rootMargin = '350px 0px',
  id,
  className = '',
  style = {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`lazy-section-wrapper ${className}`}
      style={{
        minHeight: isVisible ? 'auto' : minHeight,
        width: '100%',
        ...style,
      }}
    >
      {isVisible ? (
        children
      ) : (
        <div
          className="lazy-section-placeholder"
          aria-hidden="true"
          style={{
            height: minHeight,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
          {/* Subtle lightweight loading pulse */}
          <div
            style={{
              width: '40px',
              height: '4px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, rgba(176, 138, 79, 0.1), rgba(176, 138, 79, 0.35), rgba(176, 138, 79, 0.1))',
              opacity: 0.6,
            }}
          />
        </div>
      )}
    </div>
  );
}
