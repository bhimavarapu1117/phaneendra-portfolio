import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  status?: "idle" | "loading" | "success" | "error";
}

export const StatefulButton = ({ className, children, status = "idle", ...props }: ButtonProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const runAnimation = async () => {
      if (status === "loading") {
        await Promise.all([
          animate(".loader", { width: "20px", scale: 1, display: "block" }, { duration: 0.2 }),
          animate(".check", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".cross", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
        ]);
      } else if (status === "success") {
        await Promise.all([
          animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".cross", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".check", { width: "20px", scale: 1, display: "block" }, { duration: 0.2 }),
        ]);
      } else if (status === "error") {
        await Promise.all([
          animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".check", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".cross", { width: "20px", scale: 1, display: "block" }, { duration: 0.2 }),
        ]);
      } else {
        await Promise.all([
          animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".check", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
          animate(".cross", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 }),
        ]);
      }
    };
    runAnimation();
  }, [status, animate]);

  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      layout
      layoutId="stateful-button"
      ref={scope}
      className={cn(
        "flex min-w-[140px] cursor-pointer items-center justify-center gap-2 bg-primary px-6 py-3 font-medium text-primary-foreground ring-offset-background transition duration-200 hover:bg-primary/90 hover:ring-2 hover:ring-ring disabled:opacity-50",
        status === "error" && "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:ring-destructive",
        className,
      )}
      {...buttonProps}
      onClick={onClick}
    >
      <motion.div layout className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <CrossIcon />
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => (
  <motion.svg
    animate={{ rotate: [0, 360] }}
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="loader"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
);

const CheckIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="check"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </motion.svg>
);

const CrossIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cross"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);