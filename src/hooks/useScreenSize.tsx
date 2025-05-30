'use client'
import { useEffect, useState } from "react"


export const useScreenSize = () => {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width };
}