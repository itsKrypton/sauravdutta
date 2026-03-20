"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SITE_CONFIG, ROUTES } from "@/lib/constants";
import ThemeToggle from "@/components/shared/ThemeToggle";
import SplitDoor from "./SplitDoor";

type Phase = "name" | "choose" | "split" | "zooming";

export default function EntrySequence() {
  const [phase, setPhase] = useState<Phase>("name");
  const [chosenSide, setChosenSide] = useState<
    "professional" | "personal" | null
  >(null);
  const router = useRouter();

  // Phase: "name" -> after subtitle animates in + 800ms delay -> "choose"
  useEffect(() => {
    if (phase === "name") {
      // Name fades up (0.6s) + subtitle delay (0.4s) + subtitle fade (0.5s) + 800ms wait
      const timer = setTimeout(() => {
        setPhase("choose");
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase: "choose" -> after animation + 1000ms delay -> "split"
  useEffect(() => {
    if (phase === "choose") {
      const timer = setTimeout(() => {
        setPhase("split");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase: "zooming" -> after 500ms -> navigate
  useEffect(() => {
    if (phase === "zooming" && chosenSide) {
      const timer = setTimeout(() => {
        router.push(
          chosenSide === "professional" ? ROUTES.professional : ROUTES.personal
        );
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, chosenSide, router]);

  const handleChoose = useCallback(
    (side: "professional" | "personal") => {
      setChosenSide(side);
      setPhase("zooming");
    },
    []
  );

  return (
    <div className="relative h-screen w-full overflow-hidden bg-bg-primary">
      {/* Theme toggle */}
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {phase === "name" && (
          <motion.div
            key="name"
            className="flex h-full w-full flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="font-heading text-5xl font-bold text-text-primary md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {SITE_CONFIG.name}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-text-secondary md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Software Engineer. Musician. Explorer.
            </motion.p>
          </motion.div>
        )}

        {phase === "choose" && (
          <motion.div
            key="choose"
            className="flex h-full w-full items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <h2 className="font-heading text-4xl font-bold text-text-primary md:text-6xl">
              Choose your side.
            </h2>
          </motion.div>
        )}

        {phase === "split" && (
          <motion.div
            key="split"
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SplitDoor onChoose={handleChoose} />
          </motion.div>
        )}

        {phase === "zooming" && (
          <motion.div
            key="zooming"
            className="h-full w-full"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplitDoor onChoose={() => {}} chosenSide={chosenSide} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
