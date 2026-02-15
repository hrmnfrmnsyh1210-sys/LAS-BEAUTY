import React from 'react';
import { Product } from '../types';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetail?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail }) => {
  const productType = product.type === 'Toner' ? 'Toner' : product.type === 'Day' ? 'Krim Siang' : 'Krim Malam';

  return (
    <div
      className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onViewDetail?.(product)}
    >
      {/* Decorative Gold Ring Top */}
      <div className="absolute top-0 w-full h-2 bg-gold-gradient opacity-80 z-10"></div>

      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-stone-800 text-xs uppercase tracking-widest font-medium">
            <Eye className="w-4 h-4" />
            Lihat Detail
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 text-center flex flex-col flex-1">
        <span className="text-gold-600 text-xs uppercase tracking-widest font-semibold mb-1">{productType}</span>
        <h4 className="font-serif text-lg text-stone-800 mb-1">{product.name}</h4>
        <p className="text-stone-400 text-xs mb-3">{product.volume}</p>
        <p className="text-stone-500 text-sm line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
