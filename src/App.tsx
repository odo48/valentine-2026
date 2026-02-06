import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const SAD_IMAGE_DURATION_MS = 3000;

// Bubu & Dudu GIF assets
const IMG_ASK =
  "https://media.tenor.com/0cNM_9li440AAAAi/dudu-giving-flowers-bubu-flowers.gif";
const IMG_NO_HOVER =
  "https://media.tenor.com/0kUtrWrek8oAAAAj/bubu-dudu-angry-cute.gif";
const IMG_CELEBRATION =
  "https://media.tenor.com/wcDQ5VaLa9MAAAAi/bubu-dudu.gif";

export default function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showSadImage, setShowSadImage] = useState(false);
  const sadImageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setShowSadImage(true);
    if (sadImageTimeoutRef.current) clearTimeout(sadImageTimeoutRef.current);
    sadImageTimeoutRef.current = setTimeout(() => {
      setShowSadImage(false);
      sadImageTimeoutRef.current = null;
    }, SAD_IMAGE_DURATION_MS);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Logic to make the "Yes" button grow
  const yesButtonSize = noCount * 20 + 16; // Base size 16px, grows by 20px each time

  // Logic for random position of "No" button
  // We'll use a simple random offset for the "No" button when hovered
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPosition({ x, y });
    setNoCount(noCount + 1);
    setShowSadImage(true);
    if (sadImageTimeoutRef.current) clearTimeout(sadImageTimeoutRef.current);
    sadImageTimeoutRef.current = setTimeout(() => {
      setShowSadImage(false);
      sadImageTimeoutRef.current = null;
    }, SAD_IMAGE_DURATION_MS);
  };

  useEffect(() => {
    return () => {
      if (sadImageTimeoutRef.current) clearTimeout(sadImageTimeoutRef.current);
    };
  }, []);

  const currentAskImage = showSadImage ? IMG_NO_HOVER : IMG_ASK;
  const isShowingSad = showSadImage;

  return (
    <div className="valentine-screen valentine-bg">
      <ul className="circles" aria-hidden>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="valentine-center flex justify-center items-center">
        <motion.div
          className="valentine-card-inner w-1/2 h-1/2"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="valentine-card w-full h-full md:w-1/2 md:h-1/2 rounded-[2rem] p-8 md:p-10 text-center shadow-valentine border-2 border-white/60">
            {yesPressed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="h-64 w-64 mx-auto mb-6 rounded-2xl overflow-hidden ring-4 ring-pink-300/50 shadow-xl flex-shrink-0">
                  <motion.img
                    key={IMG_CELEBRATION}
                    src={IMG_CELEBRATION}
                    alt="Bubu and Dudu celebrating"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-fredoka text-valentine-title mb-3 leading-tight">
                  Hehehe, I knew you'd say yes! ❤️
                </h1>
                <p className="text-lg md:text-xl font-fredoka text-pink-700/90">
                  Happy Valentine's Day!
                </p>
              </motion.div>
            ) : (
              <>
                <h1 className="text-2xl md:text-4xl font-bold font-fredoka text-valentine-question mb-6 leading-tight text-center">
                  Will you be my Valentine?
                </h1>
                <div className="h-64 w-64 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0 bg-[#e0f2fe]/30">
                  <motion.img
                    key={currentAskImage}
                    src={currentAskImage}
                    alt={
                      isShowingSad
                        ? "Bubu and Dudu sad"
                        : "Bubu and Dudu asking"
                    }
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>

                <div className="relative flex flex-row items-center justify-center gap-6 sm:gap-8 min-h-[4rem]">
                  <motion.button
                    className="valentine-btn-yes"
                    style={{ fontSize: Math.min(yesButtonSize, 28) }}
                    onClick={handleYesClick}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Yes
                  </motion.button>
                  <div className="relative">
                    {isShowingSad && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 text-sm text-gray-700 font-sans font-medium whitespace-nowrap z-10"
                      >
                        Dudu is going to cry...
                      </motion.p>
                    )}
                    <motion.button
                      className="valentine-btn-no"
                      onClick={handleNoClick}
                      onMouseEnter={moveNoButton}
                      animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      No
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
