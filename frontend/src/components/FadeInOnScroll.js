import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion(Box);

const FadeInOnScroll = ({ children, direction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollComponentRef = useRef(null);
  const initialPosition = direction === "left" ? -100 : 100;

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

  return (
    <MotionBox
      ref={scrollComponentRef}
      initial={{ opacity: 0, x: initialPosition }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : initialPosition,
      }}
      transition={{ duration: 1.0 }}
    >
      {children}
    </MotionBox>
  );
};

export default FadeInOnScroll;
