/**
 * Takes a DOM node as an argument and sends a click event outside the node
 * @param node - DOM node to listen for clicks.
 */
export function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node));
    }
  };
  document.addEventListener('click', handleClick, true);
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
