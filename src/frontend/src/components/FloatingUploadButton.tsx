import { Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { motion } from "motion/react";

export function FloatingUploadButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      className="fixed bottom-20 right-4 z-50"
    >
      <Link
        to="/upload"
        aria-label="Upload files"
        data-ocid="fab.upload_button"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-elevated accent-pulse focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          tabIndex={-1}
        >
          <Upload className="w-6 h-6" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
