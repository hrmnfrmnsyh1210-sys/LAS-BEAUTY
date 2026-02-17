import React from 'react';
import { Package, Product } from '../types';
import { MessageCircle, Sparkles } from 'lucide-react';

interface PackageCardProps {
  pkg: Package;
  products: Product[];
  whatsappNumber: string;
  featured?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, products, whatsappNumber, featured }) => {
  const includedProducts = products.filter(p => pkg.productIds.includes(p.id));

  const handleOrderWhatsApp = () => {
    const productList = includedProducts
      .map(p => {
        const type = p.type === 'Toner' ? 'Toner' : p.type === 'Day' ? 'Lotion Siang' : 'Lotion Malam';
        return `- ${type} ${p.name} (${p.volume})`;
      })
      .join('\n');

    const message = encodeURIComponent(
      `Halo kak, saya mau tanya-tanya tentang *${pkg.name}* LAS Brightening dong.\n\n` +
      `Isi paketnya:\n${productList}\n\n` +
      `Boleh info harga dan cara pemesanannya kak? Terima kasih!`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${featured ? 'border-gold-400 ring-2 ring-gold-200' : 'border-stone-100'}`}>
      {/* Badge */}
      {pkg.badge && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gold-400 text-white text-xs uppercase tracking-widest rounded-full font-bold flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          {pkg.badge}
        </div>
      )}

      {/* Package Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        {featured && <div className="absolute top-0 w-full h-2 bg-gold-gradient"></div>}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-2xl text-stone-900 mb-2">{pkg.name}</h3>
        <p className="text-stone-500 text-sm mb-4 leading-relaxed">{pkg.description}</p>

        {/* Included Products */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">Isi Paket</p>
          <div className="space-y-2">
            {includedProducts.map(product => {
              const type = product.type === 'Toner' ? 'Toner' : product.type === 'Day' ? 'Lotion Siang' : 'Lotion Malam';
              return (
                <div key={product.id} className="flex items-center gap-3 bg-stone-50 rounded-xl p-2.5">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-stone-800 text-sm font-medium">{type} — {product.name}</p>
                    <p className="text-stone-400 text-xs">{product.volume}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-auto">
          <button
            onClick={handleOrderWhatsApp}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center gap-3 font-medium uppercase text-sm tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Pesan via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
