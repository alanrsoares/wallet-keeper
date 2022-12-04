import useScroll from "./useScroll";

/**
 * useIsSticky
 *
 * @param {number} offset - The offset from the top of the page to trigger the sticky state
 * @returns {boolean} - Whether the element is sticky or not
 */
export default function useIsSticky(offset: number = 0): boolean {
  const { y } = useScroll();

  return y > offset;
}
