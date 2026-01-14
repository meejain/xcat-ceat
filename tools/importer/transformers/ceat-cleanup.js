/* global WebImporter */

/**
 * Transformer for CEAT website cleanup
 * Purpose: Remove non-content elements and fix HTML issues
 * Applies to: www.ceat.com (all templates)
 * Generated: 2026-01-14
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - cleaned.html analysis
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent and privacy elements
    // EXTRACTED: Found cookie-related elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '[class*="consent"]',
      '.gdpr-banner'
    ]);

    // Remove chat and support widgets
    // EXTRACTED: Found chat widgets in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#whatsapp-chat',
      '.whatsapp-widget',
      '[class*="chat-widget"]',
      '.support-popup'
    ]);

    // Remove navigation and header (handled separately)
    // EXTRACTED: Found header structure in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header',
      'nav.main-navigation',
      '.header-wrapper',
      '.mega-menu'
    ]);

    // Remove footer (handled separately)
    // EXTRACTED: Found footer structure in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.footer-wrapper',
      '.footer-container'
    ]);

    // Remove tyre finder interactive component (requires custom development)
    // EXTRACTED: Found tyre finder form in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.tyre-finder',
      '.search-by-vehicle',
      '#tyre-search-form',
      '.vehicle-selector'
    ]);

    // Remove store locator interactive component (requires custom development)
    // EXTRACTED: Found store locator form in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.locate-store-container',
      '.ceat-locate-store',
      '#locate-shop'
    ]);

    // Re-enable scrolling if disabled
    if (element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Clean up tracking attributes
    // EXTRACTED: Found tracking attributes in captured DOM
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-track');
      el.removeAttribute('data-analytics');
      el.removeAttribute('onclick');
      el.removeAttribute('data-cmp-clickable');
    });

    // Remove remaining unwanted elements
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'iframe',
      'link',
      'noscript',
      'source.lozad'
    ]);

    // Remove empty elements
    const emptyDivs = element.querySelectorAll('div:empty, span:empty');
    emptyDivs.forEach(el => el.remove());
  }
}
