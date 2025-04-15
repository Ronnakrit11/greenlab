"use client";
import Logo from "./Logo";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="fixed min-h-screen w-full bg-background left-0 top-0 flex items-center justify-center">
      <motion.div 
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Logo className="h-16 md:h-20" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loading;