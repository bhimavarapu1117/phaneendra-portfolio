import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderThree } from "@/components/ui/loader";

const PageLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 250));
    const ready =
      document.readyState !== "loading"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("DOMContentLoaded", () => r(), { once: true })
          );
    Promise.all([minDelay, ready]).then(() => setVisible(false));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          aria-label="Loading"
          role="status"
        >
          <LoaderThree />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
