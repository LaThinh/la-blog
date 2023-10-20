"use client";

import React from "react";
//import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { motion, useScroll, useTransform } from "framer-motion";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function LoadingBar() {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <ProgressBar
        height="4px"
        color="#0ea5e9"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <motion.div
        style={{ width: y }}
        className="h-1 bg-sky-500 fixed z-50 top-0 left-0"
      ></motion.div>
    </>
  );
}
