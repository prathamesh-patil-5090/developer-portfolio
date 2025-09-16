"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdClose, MdArrowForward } from "react-icons/md";

const CustomAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Show toast after a brief delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRedirect = () => {
    setIsVisible(false);
    router.push("/my-collections");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Toast Notification */}
      <div className="fixed top-6 right-6 z-50 animate-slide-in">
        <div className="relative bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-4 max-w-sm min-w-[320px] group hover:scale-105 transition-transform duration-300">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white/60 hover:text-white hover:rotate-90 transform transition-all duration-300 p-1"
          >
            <MdClose size={16} />
          </button>

          {/* Content */}
          <div className="pr-6">
            {/* Header with Icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-sm">🎮</span>
              </div>
              <h4 className="text-white font-semibold text-sm">
                Special Collection
              </h4>
            </div>

            {/* Message */}
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              Here is something for the{" "}
              <span className="text-purple-400 font-semibold">boyz</span> 🔥
            </p>

            {/* Action Button */}
            <button
              onClick={handleRedirect}
              className="group/btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-3 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span>Check it out</span>
              <MdArrowForward
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-500 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-500 rounded-full opacity-60 animate-ping delay-500"></div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-xl animate-shrink"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        .animate-shrink {
          animation: shrink 8s linear;
        }

        @media (max-width: 640px) {
          .fixed.top-6.right-6 {
            top: 1rem;
            right: 1rem;
            left: 1rem;
          }

          .min-w-[320px] {
            min-width: auto;
          }
        }
      `}</style>
    </>
  );
};

export default CustomAlert;
