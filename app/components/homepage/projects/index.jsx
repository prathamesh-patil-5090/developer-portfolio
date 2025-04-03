'use client';
import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectCreative, EffectCards, Autoplay } from 'swiper/modules';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';

const Projects = () => {
  const [effectType, setEffectType] = useState('coverflow');
  
  // Configure different effect options
  const effectOptions = {
    coverflow: {
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 10,
        stretch: 50,
        depth: 200,
        modifier: 1.5,
        slideShadows: true,
      },
    },
    creative: {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-120%', 0, -500],
          rotate: [0, 0, -15],
        },
        next: {
          shadow: true,
          translate: ['120%', 0, -500],
          rotate: [0, 0, 15],
        },
      },
    },
    cards: {
      effect: 'cards',
      grabCursor: true,
      cardsEffect: {
        perSlideRotate: 5,
        perSlideOffset: 8,
      },
    },
  };
  
  const currentEffect = effectOptions[effectType];
  
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0  w-fit text-white px-5 py-3 text-xl rounded-md">
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
            slidesPerView={effectType === 'cards' ? 1 : 'auto'}
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
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 30%;
          transform: translateY(-50%);
          background: linear-gradient(90deg, rgba(26, 20, 67, 0.03) 0%, rgba(26, 20, 67, 0.06) 50%, rgba(26, 20, 67, 0.03) 100%);
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
          transition: all 0.8s cubic-bezier(0.215, 0.610, 0.355, 1);
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
          box-shadow: 0 15px 40px rgba(26, 20, 67, 0.2), 0 0 20px rgba(26, 20, 67, 0.1);
          animation: cardPulse 2s ease-in-out infinite alternate;
          background: linear-gradient(-45deg, #ec4899, #8b5cf6, #7c3aed, #4f46e5);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite, cardPulse 2s ease-in-out infinite alternate;
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
            box-shadow: 0 15px 40px rgba(26, 20, 67, 0.2), 0 0 20px rgba(26, 20, 67, 0.1);
          }
          100% {
            box-shadow: 0 15px 35px rgba(26, 20, 67, 0.3), 0 0 25px rgba(26, 20, 67, 0.15);
          }
        }
        
        .swiper-slide-prev, .swiper-slide-next {
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
          }
          
          .swiper-slide-active {
            transform: scale(1.02); /* Less scale on mobile */
          }
          
          .project-card-wrapper {
            max-width: 95vw; /* Full width with small margin on mobile */
          }
          
          .card-slider-container {
            padding: 0 10px;
          }
        }
        
        @media (max-width: 480px) {
          .swiper {
            padding: 30px 0;
          }
          
          .swiper-slide {
            width: 100% !important; /* Force full width on very small screens */
          }
          
          .swiper-slide-active {
            transform: scale(1); /* No scale on very small screens */
          }
          
          .swiper-slide-prev, 
          .swiper-slide-next {
            opacity: 0.5;
            transform: scale(0.9);
          }
          
          /* Make the gradient animation subtler on mobile to improve performance */
          .swiper-slide-active .project-card-wrapper {
            background-size: 200% 200%;
            animation: gradientFlow 20s ease infinite, cardPulse 3s ease-in-out infinite alternate;
          }
          
          /* Adjust the project card content for better mobile readability */
          .project-card-wrapper {
            border-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
