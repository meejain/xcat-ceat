/* global WebImporter */

/**
 * Parser for hero-banner block
 *
 * Source: https://www.ceat.com/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image + heading + description + CTAs
 *
 * Source HTML Pattern:
 * <div class="banner-teaser cmp-teaser">
 *   <div class="cmp-teaser__content">
 *     <h2 class="cmp-teaser__title">Title</h2>
 *     <div class="cmp-teaser__description"><p>Description</p></div>
 *     <div class="cmp-teaser__action-container">
 *       <a class="cmp-teaser__action-link" href="...">CTA</a>
 *     </div>
 *   </div>
 *   <picture><img src="..." alt="..."></picture>
 * </div>
 *
 * Generated: 2026-01-14
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('picture img, img');

  // Extract content
  const heading = element.querySelector('h2, h1, .cmp-teaser__title, [class*="title"]');
  const description = element.querySelector('.cmp-teaser__description p, .cmp-teaser__description, p');
  const ctaLinks = Array.from(element.querySelectorAll('a.cmp-teaser__action-link, a[class*="action-link"]'));

  // Build cells array
  const cells = [];

  // Single row with all content
  const contentRow = [];

  // Add background image if present
  if (bgImage) {
    contentRow.push(bgImage.cloneNode(true));
  }

  // Add heading
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading.textContent.trim();
    contentRow.push(h);
  }

  // Add description
  if (description && description.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentRow.push(p);
  }

  // Add CTAs
  ctaLinks.forEach(cta => {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    contentRow.push(a);
  });

  if (contentRow.length > 0) {
    cells.push(contentRow);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Banner', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
