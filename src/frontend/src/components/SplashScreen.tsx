import { Lock, Shield } from "lucide-react";
import { motion } from "motion/react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-elevated">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center accent-pulse">
            <Lock className="w-3.5 h-3.5 text-accent-foreground" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold font-display text-foreground">
            Secure Vault
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your private cloud storage
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-1.5 mt-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
