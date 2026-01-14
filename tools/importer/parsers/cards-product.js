/* global WebImporter */

/**
 * Parser for cards-product block
 *
 * Source: https://www.ceat.com/
 * Base Block: cards
 *
 * Block Structure:
 * - Each row: 2 columns [image | heading, description, link]
 *
 * Source HTML Pattern:
 * <div class="cmp-teaser">
 *   <a class="cmp-teaser__link" href="...">
 *     <picture><img src="..." alt="..."></picture>
 *     <div class="cmp-teaser__content">
 *       <h2 class="cmp-teaser__title">Title</h2>
 *       <div class="cmp-teaser__description"><p>Description</p></div>
 *     </div>
 *   </a>
 * </div>
 *
 * Generated: 2026-01-14
 */
export default function parse(element, { document }) {
  // Find all card items
  const cards = Array.from(element.querySelectorAll('.cmp-teaser, .card-teaser, [class*="teaser"]'));

  // Build cells array - one row per card with 2 columns
  const cells = [];

  // If element itself is a single card
  if (cards.length === 0) {
    cards.push(element);
  }

  cards.forEach(card => {
    // Extract image
    const img = card.querySelector('picture img, img');

    // Extract content
    const link = card.querySelector('a.cmp-teaser__link, a[class*="link"]');
    const heading = card.querySelector('h2, h3, .cmp-teaser__title, [class*="title"]');
    const description = card.querySelector('.cmp-teaser__description p, .cmp-teaser__description, p');
    const ctaLink = card.querySelector('a.cmp-teaser__action-link, a[class*="cta"], a[class*="action"]');

    // Build card row with 2 columns
    const row = [];

    // Column 1: Image
    if (img) {
      row.push(img.cloneNode(true));
    } else {
      row.push('');
    }

    // Column 2: Content (heading, description, link)
    const contentElements = [];

    if (heading) {
      const h = document.createElement('strong');
      h.textContent = heading.textContent.trim();
      contentElements.push(h);
    }

    if (description && description.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentElements.push(p);
    }

    // Add CTA link if present
    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href || link?.href || '#';
      a.textContent = ctaLink.textContent.trim() || 'Learn More';
      contentElements.push(a);
    } else if (link && heading) {
      // Create link from parent link if no explicit CTA
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'Explore Range';
      contentElements.push(a);
    }

    row.push(contentElements);

    if (row[0] || contentElements.length > 0) {
      cells.push(row);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Product', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
