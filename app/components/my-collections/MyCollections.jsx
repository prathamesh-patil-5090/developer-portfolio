"use client";

import { gta } from "../../../utils/data/gtaData";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function MyCollections() {
  const [gtaVer, setGtaVer] = useState(0);
  const [isDisabledLeft, setDisabledLeft] = useState(false);
  const [isDisabledRight, setDisabledRight] = useState(false);
  const audioRef = useRef(null);

  const handleRight = () => {
    if (gtaVer < 4) {
      setGtaVer(gtaVer + 1);
    }
  };

  const handleLeft = () => {
    if (gtaVer > 0) {
      setGtaVer(gtaVer - 1);
    }
  };

  useEffect(() => {
    setDisabledLeft(gtaVer === 0);
    setDisabledRight(gtaVer === 4);

    // Reset audio when changing tracks
    if (audioRef.current && audioRef.current.audio.current) {
      audioRef.current.audio.current.pause();
      audioRef.current.audio.current.currentTime = 0;
    }
  }, [gtaVer]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-8">
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 animate-fade-in">
            GTA Collection
          </h1>
          <p className="text-gray-300 text-lg md:text-xl animate-fade-in-delay">
            Experience my favourite legendary soundtracks from the Grand Theft
            Auto series
          </p>
        </div>

        {/* Game Carousel */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-4 md:gap-16 w-full">
            {/* Left Arrow */}
            <button
              onClick={handleLeft}
              disabled={isDisabledLeft}
              className={`
                group relative p-4 rounded-full transition-all duration-300 transform hover:scale-110 
                ${
                  isDisabledLeft
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-white/10 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                }
              `}
            >
              <MdArrowBackIos
                size={40}
                className={`
                  transition-all duration-300 
                  ${
                    isDisabledLeft
                      ? "text-gray-600"
                      : "text-white group-hover:text-purple-400 drop-shadow-lg"
                  }
                `}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* Game Display */}
            <div className="flex flex-col items-center gap-6 transform transition-all duration-500 ease-out">
              {/* Image Container */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative">
                  <Image
                    src={gta[gtaVer].image}
                    width={450}
                    height={450}
                    alt={gta[gtaVer].name}
                    className="relative rounded-xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>

              {/* Game Title */}
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
                  {gta[gtaVer].name}
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleRight}
              disabled={isDisabledRight}
              className={`
                group relative p-4 rounded-full transition-all duration-300 transform hover:scale-110 
                ${
                  isDisabledRight
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-white/10 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                }
              `}
            >
              <MdArrowForwardIos
                size={40}
                className={`
                  transition-all duration-300 
                  ${
                    isDisabledRight
                      ? "text-gray-600"
                      : "text-white group-hover:text-purple-400 drop-shadow-lg"
                  }
                `}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Audio Player Container */}
          <div className="w-full max-w-lg">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <AudioPlayer
                ref={audioRef}
                src={gta[gtaVer].music}
                onPlay={() => console.log("Playing:", gta[gtaVer].name)}
                onPause={() => console.log("Paused")}
                showJumpControls={false}
                showSkipControls={false}
                showDownloadProgress={true}
                customProgressBarSection={[
                  "CURRENT_TIME",
                  "PROGRESS_BAR",
                  "DURATION",
                ]}
                customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                layout="horizontal-reverse"
                className="custom-audio-player"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for audio player */}
      <style jsx global>{`
        .custom-audio-player {
          background: transparent !important;
          box-shadow: none !important;
        }

        .custom-audio-player .rhap_container {
          background: transparent !important;
          color: white !important;
        }

        .custom-audio-player .rhap_progress-bar {
          background: rgba(255, 255, 255, 0.2) !important;
        }

        .custom-audio-player .rhap_progress-filled {
          background: linear-gradient(90deg, #8b5cf6, #ec4899) !important;
        }

        .custom-audio-player .rhap_play-pause-button {
          color: white !important;
        }

        .custom-audio-player .rhap_volume-button {
          color: white !important;
        }

        .custom-audio-player .rhap_time {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tilt {
          0%,
          50%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default MyCollections;
