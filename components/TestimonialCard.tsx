import React from "react";
import { Testimonial } from "../types";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const initial = testimonial.name.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Foto Hasil Pemakaian */}
      {testimonial.image && (
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={testimonial.image}
            alt={`Hasil pemakaian ${testimonial.product} - ${testimonial.name}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
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
              {testimonial.name}
            </p>
            <p className="text-stone-400 text-xs">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
