import { useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TopLoader() {
  const { state } = useNavigation();
  const [progress, setProgress] = useState(50);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  
  useEffect(() => {
    clearInterval(timer);
    if (state === "loading") {
      setProgress(50);
      setTimer(
        setInterval(() => {
          setProgress((p) => Math.min(p + 0.5, 90));
        }, 500)
      );
    } else {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }
    return () => clearInterval(timer);
  }, [state])

  return (
    <motion.div 
      className="fixed top-0 left-0 z-50 w-full h-1 bg-blue-500"
      initial={{ width: 0, height: 0 }}
      animate={{ width: progress + "%", height: state == "loading" ? "0.25rem" : 0 }}
      transition={{ duration: 0.5 }}
    >
    </motion.div>
  );
}