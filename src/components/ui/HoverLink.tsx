"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const underlineVariants = {
  initial: { scaleX: 0, originX: 0 },
  enter: { scaleX: 1, originX: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  exit: (reverse: boolean) => ({
    scaleX: 0,
    originX: reverse ? 0 : 1,
    transition: { duration: 0.2, ease: "easeInOut" },
  }),
};

export function HoverLink({
  href,
  children,
  className = "",
  isExternal = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const [hovered, setHovered] = useState(false);
  const [exiting, setExiting] = useState(false);

  const onEnter = () => {
    setExiting(false);
    setHovered(true);
  };
  const onLeave = () => {
    setExiting(true);
    setTimeout(() => {
      setHovered(false);
      setExiting(false);
    }, 200);
  };

  // Props for the underlying link or anchor
  const contentProps = {
    className,
    onClick,
  };

  const Content = isExternal
    ? () => (
        <a href={href} target="_blank" rel="noopener noreferrer" {...contentProps}>
          {children}
        </a>
      )
    : () => (
        <Link href={href} {...(contentProps as any)}>
          {children}
        </Link>
      );

  return (
    <div className="relative inline-block" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Content />
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
            variants={underlineVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            custom={exiting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
