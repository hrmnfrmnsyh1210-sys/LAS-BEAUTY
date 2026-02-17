import React from "react";
import { Testimonial } from "../types";
import { Star, Quote, ZoomIn } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onImageClick?: (image: string) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onImageClick }) => {
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
  const hasImages = testimonial.imageBefore || testimonial.imageAfter;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Before & After Photos */}
      {hasImages && (
        <div className="flex w-full">
          {testimonial.imageBefore && (
            <div
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer group"
              onClick={() => onImageClick?.(testimonial.imageBefore!)}
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
              onClick={() => onImageClick?.(testimonial.imageAfter!)}
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
            <p className="text-stone-400 text-xs">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
