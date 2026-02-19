import React, { useState } from "react";
import { Testimonial } from "../types";
import { Star, Quote, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onImageClick?: (images: string[], index: number) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const censorName = (name: string) => {
    return name
      .split(" ")
      .map((word) => {
        if (word.length <= 2) return word;
        return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
      })
      .join(" ");
  };

  const initial = testimonial.name.charAt(0).toUpperCase();
  const censored = censorName(testimonial.name);
  const hasBeforeAfter = testimonial.imageBefore || testimonial.imageAfter;
  const hasMultipleImages = testimonial.images && testimonial.images.length > 0;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!testimonial.images) return;
    setCurrentIndex((i) => (i - 1 + testimonial.images!.length) % testimonial.images!.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!testimonial.images) return;
    setCurrentIndex((i) => (i + 1) % testimonial.images!.length);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Multiple Images Carousel */}
      {hasMultipleImages && !hasBeforeAfter && (
        <div
          className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100 cursor-pointer group"
          onClick={() => onImageClick?.(testimonial.images!, currentIndex)}
        >
          <img
            src={testimonial.images![currentIndex]}
            alt={`Testimoni - ${testimonial.name} ${currentIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ZoomIn className="w-4 h-4 text-stone-700" />
            </div>
          </div>

          {/* Arrows */}
          {testimonial.images!.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {testimonial.images!.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Single Photo */}
      {!hasBeforeAfter && !hasMultipleImages && testimonial.image && (
        <div
          className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100 cursor-pointer group"
          onClick={() => onImageClick?.([testimonial.image!], 0)}
        >
          <img
            src={testimonial.image}
            alt={`Testimoni - ${testimonial.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ZoomIn className="w-4 h-4 text-stone-700" />
            </div>
          </div>
        </div>
      )}

      {/* Before & After Photos */}
      {hasBeforeAfter && (
        <div className="flex w-full">
          {testimonial.imageBefore && (
            <div
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer group"
              onClick={() => {
                const imgs = [testimonial.imageBefore!, testimonial.imageAfter].filter(Boolean) as string[];
                onImageClick?.(imgs, 0);
              }}
            >
              <img
                src={testimonial.imageBefore}
                alt={`Before - ${testimonial.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <ZoomIn className="w-4 h-4 text-stone-700" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 bg-black/60 text-white text-xs rounded-full font-medium">
                  Before
                </span>
              </div>
            </div>
          )}
          {testimonial.imageAfter && (
            <div
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer group border-l-2 border-white"
              onClick={() => {
                const imgs = [testimonial.imageBefore, testimonial.imageAfter!].filter(Boolean) as string[];
                const idx = testimonial.imageBefore ? 1 : 0;
                onImageClick?.(imgs, idx);
              }}
            >
              <img
                src={testimonial.imageAfter}
                alt={`After - ${testimonial.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <ZoomIn className="w-4 h-4 text-stone-700" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 bg-gold-400 text-white text-xs rounded-full font-medium">
                  After
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Decorative quote */}
        <div className="absolute top-4 right-4 text-gold-200">
          <Quote className="w-8 h-8" />
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i <= testimonial.rating
                  ? "text-gold-400 fill-gold-400"
                  : "text-stone-200"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-4 italic">
          &ldquo;{testimonial.comment}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
          <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center border-2 border-gold-200 shrink-0">
            <span className="font-serif text-gold-400 font-bold text-sm">
              {initial}
            </span>
          </div>
          <div>
            <p className="font-serif text-stone-800 font-semibold text-sm">
              {censored}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
