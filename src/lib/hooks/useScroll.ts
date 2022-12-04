import { useEffect, useState } from "react";

export default function useScroll() {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}
