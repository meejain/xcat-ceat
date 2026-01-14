/* global WebImporter */

/**
 * Parser for carousel-hero block
 *
 * Source: https://www.ceat.com/
 * Base Block: carousel
 *
 * Block Structure:
 * - Each row: Single slide with image and optional content
 *
 * Source HTML Pattern:
 * <div class="swiper-slide">
 *   <picture><img src="..." alt="..."></picture>
 *   <div class="content">...</div>
 * </div>
 *
 * Generated: 2026-01-14
 */
export default function parse(element, { document }) {
  // Extract slides from carousel
  const slides = Array.from(element.querySelectorAll('.swiper-slide, [class*="slide"]'));

  // Build cells array - one row per slide
  const cells = [];

  slides.forEach(slide => {
    // Extract image from slide
    const img = slide.querySelector('picture img, img');

    // Extract content if present
    const content = slide.querySelector('.cmp-teaser__content, [class*="content"]');
    const heading = slide.querySelector('h1, h2, h3, .cmp-teaser__title');
    const description = slide.querySelector('p, .cmp-teaser__description');
    const cta = slide.querySelector('a.cmp-teaser__action-link, a[class*="cta"]');

    // Build slide row
    if (img || heading) {
      const row = [];

      // Image column
      if (img) {
        row.push(img.cloneNode(true));
      }

      // Content column (if has content elements)
      if (heading || description || cta) {
        const contentElements = [];
        if (heading) contentElements.push(heading.cloneNode(true));
        if (description) contentElements.push(description.cloneNode(true));
        if (cta) contentElements.push(cta.cloneNode(true));
        row.push(contentElements);
      }

      if (row.length > 0) {
        cells.push(row.length === 1 ? row : row);
      }
    }
  });

  // If no slides found, try to extract single image
  if (cells.length === 0) {
    const img = element.querySelector('picture img, img');
    if (img) {
      cells.push([img.cloneNode(true)]);
    }
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Hero', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
