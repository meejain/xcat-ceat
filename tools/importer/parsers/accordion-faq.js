/* global WebImporter */

/**
 * Parser for accordion-faq block
 *
 * Source: https://www.ceat.com/
 * Base Block: accordion
 *
 * Block Structure:
 * - Each row: 2 columns [question | answer]
 *
 * Source HTML Pattern:
 * <div class="cmp-accordion__item">
 *   <h3 class="cmp-accordion__header">
 *     <button class="cmp-accordion__button">
 *       <span class="cmp-accordion__title">Question</span>
 *     </button>
 *   </h3>
 *   <div class="cmp-accordion__panel">
 *     <p>Answer content</p>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-14
 */
export default function parse(element, { document }) {
  // Find all accordion items
  const items = Array.from(element.querySelectorAll('.cmp-accordion__item, [class*="accordion-item"]'));

  // Build cells array - one row per Q&A pair with 2 columns
  const cells = [];

  items.forEach(item => {
    // Extract question
    const questionEl = item.querySelector('.cmp-accordion__title, .cmp-accordion__button span, [class*="title"]');
    const question = questionEl ? questionEl.textContent.trim() : '';

    // Extract answer
    const answerPanel = item.querySelector('.cmp-accordion__panel, [class*="panel"]');
    const answerText = answerPanel ? answerPanel.textContent.trim() : '';

    // Build row with 2 columns [question | answer]
    if (question && answerText) {
      const questionCell = document.createTextNode(question);
      const answerCell = document.createElement('p');
      answerCell.textContent = answerText;

      cells.push([questionCell, answerCell]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion-Faq', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
