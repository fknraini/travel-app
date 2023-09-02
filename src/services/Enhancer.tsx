import { useState, useEffect } from "react";
import { getWindowDimensions } from "../utils/helper";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimensions.width < 576;
  const isTablet = {
    portrait: windowDimensions.width < 992,
    landscape: windowDimensions.width < 1200,
  };
  const isDesktop = windowDimensions.width < 1400;

  const width = windowDimensions.width;
  const height = windowDimensions.height;

  return { width, height, isMobile, isTablet, isDesktop };
};

export { useWindowDimensions };