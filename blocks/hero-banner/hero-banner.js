export default function decorate(block) {
  // Hero banner decoration - handles background image positioning
  const picture = block.querySelector('picture');
  if (picture) {
    const parent = picture.parentElement;
    if (parent && parent.tagName === 'P') {
      parent.classList.add('hero-banner-image');
    }
  }
}
