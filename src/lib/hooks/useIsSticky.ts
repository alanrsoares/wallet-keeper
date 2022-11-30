import { useEffect, useState } from "react";

/**
 * useIsSticky
 *
 * @param {number} offset - The offset from the top of the page to trigger the sticky state
 * @returns {boolean} - Whether the element is sticky or not
 */
export default function useIsSticky(offset: number = 0): boolean {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isSticky;
}
