"use client";

import { experiences } from "../../../../utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import experience from "../../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleExperienceClick = (exp) => {
    if (exp.pic) {
      setSelectedCertificate(exp);
      setZoomLevel(1); // Reset zoom when opening
      setImageLoading(true); // Show loading immediately
      setDragOffset({ x: 0, y: 0 }); // Reset drag offset
    }
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    setZoomLevel(1);
    setImageLoading(false);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 0.5);
      if (newZoom <= 1) {
        setDragOffset({ x: 0, y: 0 }); // Reset drag when zoomed out
      }
      return newZoom;
    });
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setDragOffset({ x: 0, y: 0 }); // Reset drag when zoom is reset
  };

  const toggleZoom = () => {
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else {
      setZoomLevel(1);
      setDragOffset({ x: 0, y: 0 }); // Reset drag when zooming out
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getCertificateImage = (exp) => {
    // Use the public path for the certificate image
    if (exp.id === 2) {
      const imagePath =
        "/certificates/Unovative_Prathamesh_Internship_Experience_Certificate.jpg";
      return imagePath;
    }
    return exp.pic;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Certificate Modal Component
  const CertificateModal = () => {
    if (!selectedCertificate || !isMounted) return null;

    return createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-98 flex items-center justify-center p-4"
        style={{
          zIndex: 2147483647, // Maximum z-index value
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.98)",
        }}
        onClick={closeCertificateModal}
      >
        <div
          className="relative max-w-7xl max-h-[98vh] w-full h-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Button Controls */}
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="flex gap-2">
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 0.5}
                className="text-white hover:text-[#16f2b3] transition-colors duration-200 bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-6"
                  />
                </svg>
              </button>
              <button
                onClick={resetZoom}
                className="text-white hover:text-[#16f2b3] transition-colors duration-200 bg-black bg-opacity-70 rounded px-4 py-3 hover:bg-opacity-90 text-sm font-medium min-w-[60px]"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={zoomIn}
                disabled={zoomLevel >= 3}
                className="text-white hover:text-[#16f2b3] transition-colors duration-200 bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 8v6m3-3H7"
                  />
                </svg>
              </button>
              {zoomLevel > 1 && (dragOffset.x !== 0 || dragOffset.y !== 0) && (
                <button
                  onClick={() => setDragOffset({ x: 0, y: 0 })}
                  className="text-white hover:text-[#16f2b3] transition-colors duration-200 bg-black bg-opacity-70 rounded px-3 py-3 hover:bg-opacity-90 text-sm"
                  title="Center Image"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v18m0-18l4 4m-4-4L8 7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12h18m-18 0l4-4m-4 4l4 4"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {zoomLevel > 1 && (
                <span className="text-white text-xs bg-black bg-opacity-70 px-2 py-1 rounded">
                  Drag to pan
                </span>
              )}
              <button
                onClick={closeCertificateModal}
                className="text-white hover:text-[#16f2b3] transition-colors duration-200 bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90"
                title="Close (Esc)"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>

          {/* Certificate Image Container */}
          <div
            className={`relative flex-1 bg-gray-900 rounded-lg overflow-hidden shadow-2xl ${
              zoomLevel > 1 ? "overflow-auto" : ""
            }`}
          >
            {/* Loading State */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#16f2b3] border-t-transparent"></div>
                  <p className="text-gray-300 text-sm font-medium">
                    Loading certificate...
                  </p>
                </div>
              </div>
            )}

            <div
              className={`relative w-full h-full transition-transform duration-300 ease-in-out ${
                zoomLevel > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
              onClick={zoomLevel > 1 ? undefined : toggleZoom}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                transform: `scale(${zoomLevel}) translate(${
                  dragOffset.x / zoomLevel
                }px, ${dragOffset.y / zoomLevel}px)`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={getCertificateImage(selectedCertificate)}
                alt={`${selectedCertificate.title} Certificate`}
                fill
                className="object-contain p-4 transition-all duration-300 ease-in-out"
                onLoad={handleImageLoad}
                onError={() => setImageLoading(false)}
                sizes="(max-width: 768px) 100vw, 90vw"
                quality={95}
                priority={true}
                unoptimized={false}
                draggable={false}
              />
            </div>
          </div>

          {/* Certificate Info */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-4 rounded-b-lg mt-2 border-t border-gray-700">
            <h3 className="text-white text-xl font-bold mb-1">
              {selectedCertificate.title}
            </h3>
            <p className="text-gray-300 text-lg">
              {selectedCertificate.company}
            </p>
            <p className="text-[#16f2b3] text-sm font-medium">
              {selectedCertificate.duration}
            </p>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeCertificateModal();
      }
    };

    if (selectedCertificate) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [selectedCertificate]);

  // Handle drag events globally
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "none"; // Prevent text selection while dragging
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
    };
  }, [isDragging, dragStart, dragOffset]);
  return (
    <div
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experiences.map((experience) => (
                <GlowCard
                  key={experience.id}
                  identifier={`experience-${experience.id}`}
                >
                  <div
                    className={`p-3 relative ${
                      experience.pic
                        ? "cursor-pointer hover:bg-opacity-80 transition-all duration-200"
                        : ""
                    }`}
                    onClick={() => handleExperienceClick(experience)}
                  >
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {experience.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                          {experience.title}
                        </p>
                        <p className="text-sm sm:text-base">
                          {experience.company}
                        </p>
                        {experience.pic && (
                          <p className="text-xs text-[#16f2b3] mt-2">
                            Click to view certificate
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal />
    </div>
  );
}

export default Experience;
