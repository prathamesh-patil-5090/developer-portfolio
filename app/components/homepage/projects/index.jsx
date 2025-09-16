"use client";
import { projectsData } from "../../../../utils/data/projects-data";
import ProjectCard from "./project-card";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  EffectCreative,
  EffectCards,
  Autoplay,
} from "swiper/modules";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-cards";

const Projects = () => {
  const [effectType, setEffectType] = useState("coverflow");

  // Configure different effect options
  const effectOptions = {
    coverflow: {
      effect: "coverflow",
      coverflowEffect: {
        rotate: 10,
        stretch: 50,
        depth: 200,
        modifier: 1.5,
        slideShadows: true,
      },
    },
    creative: {
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
          rotate: [0, 0, -15],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
          rotate: [0, 0, 15],
        },
      },
    },
    cards: {
      effect: "cards",
      grabCursor: true,
      cardsEffect: {
        perSlideRotate: 5,
        perSlideOffset: 8,
      },
    },
  };

  const currentEffect = effectOptions[effectType];

  return (
    <div
      id="projects"
      className="align-center items-center relative z-50 my-12 lg:my-24"
    >
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-center relative">
          <span className="bg-[#1a1443] absolute left-1/2 transform -translate-x-1/2 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-30 mt-20 relative">
        <div className="pt-10 card-slider-container">
          <Swiper
            {...currentEffect}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={effectType === "cards" ? 1 : "auto"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            modules={[EffectCoverflow, EffectCreative, EffectCards, Autoplay]}
            className="mySwiper"
          >
            {projectsData.map((project, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="project-card-wrapper box-border flex items-center justify-center rounded-xl transition-all duration-[0.5s] w-full mx-auto max-w-2xl">
                  <ProjectCard project={project} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .card-slider-container {
          position: relative;
          padding: 0 20px;
        }

        .card-slider-container:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 30%;
          transform: translateY(-50%);
          background: linear-gradient(
            90deg,
            rgba(26, 20, 67, 0.03) 0%,
            rgba(26, 20, 67, 0.06) 50%,
            rgba(26, 20, 67, 0.03) 100%
          );
          z-index: -1;
          border-radius: 100px;
        }

        .swiper {
          width: 100%;
          padding: 70px 0;
        }

        .swiper-slide {
          width: auto;
          height: auto;
          opacity: 0.5;
          transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
          transform-origin: center center;
          filter: grayscale(40%);
        }

        .swiper-slide-active {
          opacity: 1;
          z-index: 10;
          transform: scale(1.05);
          filter: grayscale(0%);
        }

        .project-card-wrapper {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
          position: relative;
        }

        .swiper-slide-active .project-card-wrapper {
          box-shadow: 0 15px 40px rgba(26, 20, 67, 0.2),
            0 0 20px rgba(26, 20, 67, 0.1);
          animation: cardPulse 2s ease-in-out infinite alternate;
          background: linear-gradient(
            -45deg,
            #ec4899,
            #8b5cf6,
            #7c3aed,
            #4f46e5
          );
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite,
            cardPulse 2s ease-in-out infinite alternate;
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes cardPulse {
          0% {
            box-shadow: 0 15px 40px rgba(26, 20, 67, 0.2),
              0 0 20px rgba(26, 20, 67, 0.1);
          }
          100% {
            box-shadow: 0 15px 35px rgba(26, 20, 67, 0.3),
              0 0 25px rgba(26, 20, 67, 0.15);
          }
        }

        .swiper-slide-prev,
        .swiper-slide-next {
          opacity: 0.85;
          z-index: 5;
          transform: scale(0.95);
          filter: grayscale(10%);
        }

        .swiper-slide-prev .project-card-wrapper,
        .swiper-slide-next .project-card-wrapper {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        /* Animation for transition */
        @keyframes fadeInScale {
          from {
            opacity: 0.4;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .swiper-slide-active .box-border {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        /* Enhance spacing in cards if needed */
        .swiper-slide .box-border > * {
          transition: transform 0.3s;
        }

        .swiper-slide-active .box-border:hover > * {
          transform: translateY(-5px);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .swiper {
            padding: 40px 0;
            overflow: hidden;
            width: 100%;
          }

          .project-card-wrapper {
            width: 100%;
            max-width: 90vw; /* Restored to viewport width */
          }

          .card-slider-container {
            padding: 0;
            overflow: hidden;
          }
        }

        @media (max-width: 480px) {
          .swiper {
            padding: 30px 0;
            overflow: hidden;
          }

          .swiper-slide {
            width: 85vw !important; /* Restored to viewport width */
            overflow: hidden;
            display: flex;
            justify-content: center;
          }

          .project-card-wrapper {
            width: 85vw; /* Restored to previous width */
            max-width: 85vw;
            margin: 0 auto;
            overflow: hidden;
          }

          /* Keep these overflow controls */
          #projects {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }

          .card-slider-container {
            overflow: hidden;
            width: 100%;
            padding: 0;
          }

          .mySwiper {
            overflow: hidden;
          }

          /* Override gradient background for mobile */
          .swiper-slide-active .project-card-wrapper {
            background: #0a0d37; /* Solid background instead of gradient */
            background-size: unset;
            animation: cardPulse 3s ease-in-out infinite alternate;
          }

          /* Keep the box shadow animation simpler */
          @keyframes cardPulse {
            0% {
              box-shadow: 0 10px 20px rgba(26, 20, 67, 0.2);
            }
            100% {
              box-shadow: 0 12px 25px rgba(26, 20, 67, 0.3);
            }
          }

          /* Remove gradient and ensure consistent dark background */
          .project-card-wrapper {
            background: #0a0d37 !important; /* Force dark background */
            background-image: none !important; /* Remove any gradients */
          }

          .swiper-slide-active .project-card-wrapper,
          .swiper-slide-prev .project-card-wrapper,
          .swiper-slide-next .project-card-wrapper {
            background: #0a0d37 !important;
            background-image: none !important;
            animation: none !important; /* Remove gradient animations */
          }

          /* Simplify box shadow animation */
          @keyframes cardPulse {
            0%,
            100% {
              box-shadow: 0 8px 20px rgba(26, 20, 67, 0.2);
            }
          }

          /* Remove transition effects that might show white */
          .swiper-slide {
            transition: transform 0.3s ease;
            background: transparent;
          }

          /* Force transparency for all card states */
          .project-card-wrapper,
          .swiper-slide-active .project-card-wrapper,
          .swiper-slide-prev .project-card-wrapper,
          .swiper-slide-next .project-card-wrapper {
            background: transparent !important;
            background-image: none !important;
            backdrop-filter: blur(0) !important;
            -webkit-backdrop-filter: blur(0) !important;
            animation: none !important;
          }

          /* Modify box shadow for better visibility with transparent background */
          @keyframes cardPulse {
            0%,
            100% {
              box-shadow: 0 8px 20px rgba(26, 20, 67, 0.15);
            }
          }

          /* Ensure content remains visible against transparent background */
          .swiper-slide {
            background: transparent;
            backdrop-filter: none;
          }

          /* Force transparency on edges while preserving content */
          .project-card-wrapper {
            background: transparent !important;
            position: relative;
            z-index: 1;
          }

          .project-card-wrapper::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              #0a0d37 15%,
              #0a0d37 85%,
              transparent 100%
            );
            z-index: -1;
          }

          /* Keep content visible with dark background */
          .project-card-wrapper > div {
            position: relative;
            z-index: 2;
          }

          /* Remove any animations that might interfere */
          .swiper-slide-active .project-card-wrapper,
          .swiper-slide-prev .project-card-wrapper,
          .swiper-slide-next .project-card-wrapper {
            animation: none !important;
            background: transparent !important;
          }

          /* Enhanced transparency that extends beyond card borders */
          .project-card-wrapper {
            background: transparent !important;
            position: relative;
            z-index: 1;
          }

          .project-card-wrapper::before,
          .project-card-wrapper::after {
            content: "";
            position: absolute;
            left: -20px; /* Extend beyond card borders */
            right: -20px;
            height: 100px; /* Taller fade areas */
            z-index: 0;
          }

          .project-card-wrapper::before {
            top: -20px;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              transparent 40%,
              #0a0d37 100%
            );
          }

          .project-card-wrapper::after {
            bottom: -20px;
            background: linear-gradient(
              to top,
              transparent 0%,
              transparent 40%,
              #0a0d37 100%
            );
          }

          /* Main content background */
          .project-card-wrapper > div {
            position: relative;
            z-index: 2;
            background: #0a0d37;
          }

          /* Remove border on mobile to avoid sharp edges */
          .project-card-wrapper {
            border: none !important;
          }

          /* Ensure swiper doesn't clip the extended transparency */
          .swiper-slide {
            padding: 20px 0;
            margin: -20px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
