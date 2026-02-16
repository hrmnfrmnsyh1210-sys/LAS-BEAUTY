import React from 'react';
import { Product } from '../types';
import { X, Check, FlaskConical } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const productType = product.type === 'Toner' ? 'Toner' : product.type === 'Day' ? 'Krim Siang' : 'Krim Malam';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gold-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-stone-100 transition-colors shadow-md"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 md:h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
            <div className="absolute top-0 left-0 right-0 h-2 bg-gold-gradient opacity-80 rounded-t-3xl md:rounded-tr-none"></div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-8 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 text-xs uppercase tracking-widest rounded-full font-semibold">
                {productType}
              </span>
            </div>

            <h2 className="font-serif text-3xl text-stone-900 mb-1">{product.name}</h2>
            <p className="text-stone-400 text-sm mb-4">{product.volume}</p>

            <p className="text-stone-600 leading-relaxed mb-6">{product.description}</p>

            {/* Benefits */}
            <div className="mb-6">
              <h4 className="font-serif text-lg text-stone-800 mb-3">Manfaat</h4>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-stone-600 text-sm">
                    <div className="p-1 bg-gold-100 rounded-full">
                      <Check className="w-3 h-3 text-gold-600" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            {product.ingredients.length > 0 && (
              <div className="mb-4">
                <h4 className="font-serif text-lg text-stone-800 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-gold-500" />
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-stone-50 border border-stone-200 text-stone-600 text-xs rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-stone-100">
              <p className="text-stone-400 text-xs text-center">
                Produk ini tersedia dalam paket. Lihat pilihan paket di bawah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
