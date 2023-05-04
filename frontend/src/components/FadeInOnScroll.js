import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion(Box);

const FadeInOnScroll = ({ children, direction = "none" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollComponentRef = useRef(null);

  const initialPosition = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const element = scrollComponentRef.current;
    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  const initial = {
    opacity: 0,
    ...(direction !== "none" && initialPosition[direction]),
  };

  const animate = {
    opacity: isVisible ? 1 : 0,
    ...(direction !== "none" && {
      x: isVisible ? 0 : initialPosition[direction].x,
      y: isVisible ? 0 : initialPosition[direction].y,
    }),
  };

  return (
    <MotionBox
      ref={scrollComponentRef}
      initial={initial}
      animate={animate}
      transition={{ duration: 1.0 }}
    >
      {children}
    </MotionBox>
  );
};

export default FadeInOnScroll;
