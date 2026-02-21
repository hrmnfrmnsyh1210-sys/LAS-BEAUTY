import React, { useState, useEffect } from "react";
import { Product, Package, Testimonial } from "./types";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import PackageCard from "./components/PackageCard";
import TestimonialCard from "./components/TestimonialCard";
import {
  Star,
  Menu,
  X,
  ArrowRight,
  Facebook,
  Award,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Nomor WhatsApp untuk pemesanan (ganti dengan nomor kamu, format: 62xxx tanpa +)
const WHATSAPP_NUMBER = "6283856177628";

// Data Produk - ganti path image dengan file lokal kamu
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Siang",
    type: "Day",
    description:
      "Lotion siang dengan perlindungan SPF 70 yang melindungi kulit dari paparan sinar matahari, melembapkan, mencerahkan, dan meratakan warna kulit. Aturan pakai: 1 hari 1x (di siang hari).",
    volume: "100ml",
    benefits: [
      "Melindungi kulit dari paparan sinar matahari dengan SPF 70",
      "Melembapkan kulit dan mencegah kulit kering",
      "Menjaga kelembutan dan kehalusan kulit",
      "Membantu menenangkan kulit dari iritasi ringan dan kemerahan",
      "Membantu mencerahkan dan meratakan warna kulit",
      "Menutrisi kulit agar tetap sehat dan elastis",
      "Memperkuat lapisan pelindung (skin barrier) kulit",
    ],
    ingredients: [
      "Glycerin",
      "Aloe Vera Extract",
      "Niacinamide",
      "Squalane",
      "Jojoba Oil",
      "Panthenol (Vitamin B5)",
      "Vitamin E",
      "Zinc Oxide / Titanium Dioxide",
    ],
    image: "/images/siang.jpg",
  },
  {
    id: "2",
    name: "Toner LAS",
    type: "Toner",
    description:
      "Toner penyeimbang PH yang menyegarkan dan mempersiapkan kulit untuk penyerapan skincare maksimal. Aturan pakai: 1 hari 2x (siang & malam).",
    volume: "100ml",
    benefits: [
      "Membantu mencerahkan dan meratakan warna kulit",
      "Menjaga kelembapan kulit agar tidak terasa kering",
      "Membantu menenangkan kulit dan mengurangi rasa tidak nyaman",
      "Membantu menyegarkan kulit setelah mandi",
      "Membantu memperhalus tekstur kulit",
      "Mendukung skin barrier agar kulit lebih sehat",
      "Membantu mempersiapkan kulit agar lebih optimal menyerap lotion atau body serum",
      "Membantu membuat kulit terasa lebih lembut dan halus",
    ],
    ingredients: [
      "Aqua (Water)",
      "Glycerin",
      "Niacinamide",
      "Alpha-Arbutin",
      "Sodium Ascorbyl Phosphate (Vitamin C)",
      "Aloe Barbadensis Leaf Extract",
      "Panthenol (Vitamin B5)",
      "Allantoin",
      "Betaine",
      "Sodium Hyaluronate",
      "Licorice Root Extract",
      "Centella Asiatica Extract",
      "Ceramide NP",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    image: "/images/toner.jpg",
  },
  {
    id: "3",
    name: "Malam",
    type: "Night",
    description:
      "Lotion malam yang bekerja saat Anda tidur untuk mencerahkan kulit dan meratakan warna kulit. Aturan pakai: 1 hari 1x (di malam hari).",
    volume: "100ml",
    benefits: [
      "Membantu mencerahkan kulit dan membuat warna kulit tampak lebih merata",
      "Membantu menyamarkan noda hitam dan bekas luka",
      "Membantu menjaga kelembapan kulit agar tidak kering",
      "Membantu memperkuat lapisan pelindung kulit",
      "Membantu memperbaiki tekstur kulit agar lebih halus",
    ],
    ingredients: [
      "Aqua",
      "Glycerin",
      "Niacinamide",
      "Alpha-Arbutin",
      "Panthenol",
      "Sodium Ascorbyl Phosphate",
      "Aloe Barbadensis Leaf Extract",
      "Ceramide NP",
      "Shea Butter",
      "Squalane",
      "Allantoin",
    ],
    image: "/images/malam.jpg",
  },
];

// Data Paket
const PACKAGES: Package[] = [
  {
    id: "pkg-2",
    name: "Paket Lengkap",
    description:
      "Paket lengkap 3-in-1 untuk hasil maksimal. Toner + Lotion Siang + Lotion Malam untuk rutinitas perawatan kulit menyeluruh.",
    price: 385000,
    originalPrice: 435000,
    productIds: ["2", "1", "3"],
    image: "/images/hb toner.jpeg",
    badge: "Best Seller",
  },
  {
    id: "pkg-1",
    name: "Paket Day & Night",
    description:
      "Paket dasar untuk rutinitas pagi dan malam. Lindungi kulit di siang hari dan perbaiki di malam hari.",
    price: 280000,
    originalPrice: 315000,
    productIds: ["1", "3"],
    image: "/images/siang malam.png",
  },
  {
    id: "pkg-3",
    name: "Paket Fresh",
    description:
      "Kombinasi toner dan lotion siang untuk kulit cerah dan terlindungi sepanjang hari.",
    price: 240000,
    originalPrice: 270000,
    productIds: ["2", "1"],
    image: "/images/toner  siang.png",
  },
  {
    id: "pkg-4",
    name: "Paket Night Care",
    description:
      "Kombinasi toner dan lotion malam untuk perawatan kulit optimal saat tidur. Bersihkan dan perbaiki kulit semalaman.",
    price: 250000,
    originalPrice: 280000,
    productIds: ["2", "3"],
    image: "/images/toner malam.png",
  },
];

// Data Testimoni
const TESTIMONIALS: Testimonial[] = [
  // Before & After (5 pasang foto)
  {
    id: "t1",
    name: "Rina Sari",
    rating: 5,
    comment: "Ini sih definisi putih nyata, bukan cuma klaim",
    product: "Paket Lengkap",
    image: "/testimoni/testi1.jpeg",
  },
  {
    id: "t2",
    name: "Dwi Putri",
    rating: 5,
    comment: "Rutin 3 mingguan, sekarang keliatan banget bedanya",
    product: "Lotion Malam",
    image: "/testimoni/testi2.jpeg",
  },
  {
    id: "t3",
    name: "Anisa Rahma",
    rating: 5,
    comment: "Udah cocok bngt sama las brightening ini pemakaian yg ke 2 paket",
    product: "Toner LAS",
    imageBefore: "/before/before1.jpeg",
    imageAfter: "/after/after1.jpeg",
  },
  {
    id: "t4",
    name: "Maya Lestari",
    rating: 4,
    comment: "Baru beberapa minggu, udah keliatan bedanya",
    product: "Lotion Siang",
    image: "/testimoni/testi3.jpeg",
  },
  {
    id: "t5",
    name: "Siti Nurhaliza",
    rating: 5,
    comment: "Awalnya ragu ternya di kulit badakku juga bisa putih.",
    product: "Paket Day & Night",
    image: "/testimoni/testi4.jpeg",
  },
  // Testimoni dengan single foto (testi1 - testi28)
  {
    id: "t6",
    name: "Fitri Handayani",
    rating: 5,
    comment: " Putihnya dapet, tetap natural suka banget",
    product: "Paket Lengkap",
    imageBefore: "/before/before2.jpeg",
    imageAfter: "/after/after2.jpeg",
  },
  {
    id: "t7",
    name: "Lina Marlina",
    rating: 5,
    comment: "Rutin pakai lotionnya putih tanpa dosting bebb",
    product: "Paket Lengkap",
    image: "/testimoni/testi5.jpeg",
  },
  {
    id: "t8",
    name: "Yuni Astuti",
    rating: 5,
    comment:
      "Belum terlalu kelihatan hasilnya karna baru pemakaian 4hari tapi kulit jadi halus banget",
    product: "Toner LAS",
    image: "/testimoni/testi6.jpeg",
  },
  {
    id: "t9",
    name: "Desi Ratnasari",
    rating: 5,
    comment:
      "Bukan cuman ampuh memutihkan tapi juga bisa menghilangkan bekas luka ampuh banget 😍",
    product: "Lotion Malam",
    image: "/testimoni/testi7.jpeg",
  },
  {
    id: "t10",
    name: "Nurul Hidayah",
    rating: 5,
    comment: "Teksturnya ringan, gampang banget di blend",
    product: "Paket Day & Night",
    image: "/testimoni/testi8.jpeg",
  },
  {
    id: "t11",
    name: "Ratna Dewi",
    rating: 5,
    comment:
      "Lotion siang dengan tone up natural, langsung cerah ga bikin kulit abu2 🫰🏻",
    product: "Paket Lengkap",
    image: "/testimoni/testi9.jpeg",
  },
  {
    id: "t12",
    name: "Wulan Sari",
    rating: 5,
    comment:
      "Dulu kulit aku belang dan kusam, setelah rutin pakai lotion malam ini, pelan-pelan warnanya lebih rata dan cerah 🤭",
    product: "Lotion Malam",
    image: "/testimoni/testi10.jpeg",
  },
  {
    id: "t13",
    name: "Indah Permata",
    rating: 5,
    comment:
      "Udah gak perlu takut lagi siang keluar rumah karna lotion spf nya tinggi jadi aman 😁",
    product: "Paket Lengkap",
    image: "/testimoni/testi11.jpeg",
  },
  {
    id: "t14",
    name: "Sri Wahyuni",
    rating: 4,
    comment:
      "Paket hb malam nigh care , toner nya beneran ampuh mengangkat sel kulit mati😭",
    product: "Toner LAS",
    images: ["/slide/slide1.jpeg", "/slide/slides1.jpeg"],
  },
  {
    id: "t15",
    name: "Eka Putri",
    rating: 5,
    comment: "Bagus kulitku jadi cerahan",
    product: "Lotion Malam",
    image: "/testimoni/testi12.jpeg",
  },
  {
    id: "t16",
    name: "Nadia Safitri",
    rating: 5,
    comment:
      "Baru order yg pertama next mau order yang paket lengkapnya deh 😁",
    product: "Paket Day & Night",
    image: "/testimoni/testi13.jpeg",
  },
  {
    id: "t17",
    name: "Rini Anggraini",
    rating: 5,
    comment: "Bagus kulit jadi putih mulus ga bikin kulit tipis",
    product: "Paket Lengkap",
    imageBefore: "/before/before3.jpeg",
    imageAfter: "/after/after3.jpeg",
  },
  {
    id: "t18",
    name: "Mega Wati",
    rating: 5,
    comment: "Baru coba semoga cocok di kulit ku yang susah putih",
    product: "Paket Fresh",
    image: "/testimoni/testi15.jpeg",
  },
  {
    id: "t19",
    name: "Ayu Lestari",
    rating: 4,
    comment: "Paket lengkap hasilnya lebih maksimal 😇",
    product: "Lotion Siang",
    images: ["/slide/slide2.jpeg", "/slide/slides2.jpeg"],
  },
  {
    id: "t20",
    name: "Diana Putri",
    rating: 5,
    comment: "Before After 2 Mingguan",
    product: "Paket Lengkap",
    image: "/testimoni/testi16.jpeg",
  },
  {
    id: "t21",
    name: "Kartini Wulan",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap1.jpeg",
  },
  {
    id: "t22",
    name: "Novi Hartini",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap2.jpeg",
  },
  {
    id: "t23",
    name: "Putri Amelia",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap3.jpeg",
  },
  {
    id: "t24",
    name: "Sari Mutiara",
    rating: 4,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap4.jpeg",
  },
  {
    id: "t26",
    name: "Lia Susanti",
    rating: 5,
    comment: "-",
    product: "Paket Fresh",
    image: "/nocap/nocap5.jpeg",
  },
  {
    id: "t27",
    name: "Tika Rahayu",
    rating: 5,
    comment: "Real Putih Bersih",
    product: "Lotion Malam",
    image: "/testimoni/testi17.jpeg",
  },
  {
    id: "t28",
    name: "Hesti Wulandari",
    rating: 5,
    comment: "Cerah seketika dengan Las Brightening 😘",
    product: "Paket Lengkap",
    image: "/testimoni/testi18.jpeg",
  },
  {
    id: "t29",
    name: "Rani Oktavia",
    rating: 4,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap6.jpeg",
  },
  {
    id: "t30",
    name: "Yanti Permata",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap7.jpeg",
  },
  {
    id: "t31",
    name: "Intan Cahaya",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap8.jpeg",
  },
  {
    id: "t32",
    name: "Melati Sari",
    rating: 5,
    comment: "Baru beberapa hari tapi sudah kelihatan cerah ",
    product: "Paket Day & Night",
    imageBefore: "/before/before4.jpeg",
    imageAfter: "/after/after4.jpeg",
  },
  {
    id: "t33",
    name: "Bunga Citra",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap9.jpeg",
  },
  {
    id: "t34",
    name: "Rosa Damayanti",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap10.jpeg",
  },
  {
    id: "t35",
    name: "Dian Purnama",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap11.jpeg",
  },
  {
    id: "t36",
    name: "Suci Ramadhani",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap12.jpeg",
  },
  {
    id: "t37",
    name: "Naomi Kusuma",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap13.jpeg",
  },
  {
    id: "t38",
    name: "Bella Safira",
    rating: 5,
    comment: "Mantul Real Putih",
    product: "Lotion Siang",
    image: "/testimoni/testi19.jpeg",
  },
  {
    id: "t39",
    name: "Citra Dewi",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap14.jpeg",
  },
  {
    id: "t40",
    name: "Reva Santika",
    rating: 5,
    comment: "-",
    product: "Paket Fresh",
    image: "/nocap/nocap15.jpeg",
  },
  {
    id: "t41",
    name: "Aisyah Nur",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap16.jpeg",
  },
  {
    id: "t42",
    name: "Febri Wulandari",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap17.jpeg",
  },
  {
    id: "t43",
    name: "Tiara Agustin",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap18.jpeg",
  },
  {
    id: "t44",
    name: "Mila Kusumawati",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap19.jpeg",
  },
  {
    id: "t45",
    name: "Hana Pratiwi",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap20.jpeg",
  },
  {
    id: "t46",
    name: "Vira Andini",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap21.jpeg",
  },
  {
    id: "t47",
    name: "Yulia Rahayu",
    rating: 5,
    comment: "Sebelum Dan Sesudah",
    product: "Lotion Malam",
    imageBefore: "/before/before5.jpeg",
    imageAfter: "/after/after5.jpeg",
  },
  {
    id: "t48",
    name: "Risa Amelia",
    rating: 5,
    comment: "😍",
    product: "Toner LAS",
    image: "/testimoni/testi20.jpeg",
  },
  {
    id: "t49",
    name: "Nita Kurniawati",
    rating: 5,
    comment: "Buat kulit halus lembut 🫰🏻",
    product: "Paket Lengkap",
    images: ["/slide/slide3.jpeg", "/slide/slides3.jpeg"],
  },
  {
    id: "t50",
    name: "Gita Puspita",
    rating: 5,
    comment: "Lotion malam favoritku buat bantu cerahin kulit",
    product: "Lotion Siang",
    image: "/testimoni/testi21.jpeg",
  },
  {
    id: "t51",
    name: "Ira Septiani",
    rating: 5,
    comment: "Sekali Oleh Langsung Meresap Dan Harum",
    product: "Paket Fresh",
    images: ["/slide/slide4.jpeg", "/slide/slides4.jpeg"],
  },
  {
    id: "t52",
    name: "Laras Setyowati",
    rating: 5,
    comment: "Kelihatan sekali bedanya setelah kenal hb ini 😭",
    product: "Paket Lengkap",
    images: [
      "/slide/slide5.jpeg",
      "/slide/slides5.jpeg",
      "/slide/slidest5.jpeg",
    ],
  },
  {
    id: "t53",
    name: "Devi Anggraeni",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    imageBefore: "/before/before6.jpeg",
    imageAfter: "/after/after6.jpeg",
  },
  {
    id: "t54",
    name: "Siska Maharani",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap22.jpeg",
  },
  {
    id: "t55",
    name: "Reina Maharani",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap23.jpeg",
  },
  {
    id: "t56",
    name: "Putri Handayani",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap24.jpeg",
  },
  {
    id: "t57",
    name: "Winda Lestari",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap25.jpeg",
  },
  {
    id: "t58",
    name: "Amelia Putri",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap26.jpeg",
  },
  {
    id: "t59",
    name: "Sari Dewi",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap27.jpeg",
  },
  {
    id: "t60",
    name: "Fitria Rahayu",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap28.jpeg",
  },
  {
    id: "t61",
    name: "Nabila Salsabila",
    rating: 5,
    comment: "Awal pemakaian sudah terasa hasilnya🫣",
    product: "Paket Fresh",
    images: ["/slide/slide6.jpeg", "/slide/slides6.jpeg"],
  },
  {
    id: "t62",
    name: "Karina Septiani",
    rating: 5,
    comment: "Tonernya Buat Kulit Jadi Segar hihi",
    product: "Lotion Malam",
    images: ["/slide/slide7.jpeg", "/slide/slides7.jpeg"],
  },
  {
    id: "t63",
    name: "Hilda Pramesti",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap29.jpeg",
  },
  {
    id: "t64",
    name: "Zahra Amalia",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap30.jpeg",
  },
  {
    id: "t65",
    name: "Lusi Anggraini",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap31.jpeg",
  },
  {
    id: "t66",
    name: "Novi Susanti",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap32.jpeg",
  },
  {
    id: "t67",
    name: "Anis Fitriani",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap33.jpeg",
  },
  {
    id: "t68",
    name: "Rini Puspitasari",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap34.jpeg",
  },
  {
    id: "t69",
    name: "Dwi Cahyani",
    rating: 5,
    comment: "-",
    product: "Paket Fresh",
    image: "/nocap/nocap35.jpeg",
  },
  {
    id: "t70",
    name: "Mega Pratiwi",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap36.jpeg",
  },
  {
    id: "t71",
    name: "Titi Nurwati",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap37.jpeg",
  },
  {
    id: "t72",
    name: "Esti Wahyuni",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap38.jpeg",
  },
  {
    id: "t73",
    name: "Shinta Rahmawati",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap39.jpeg",
  },
  {
    id: "t74",
    name: "Yeni Kurniasih",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap40.jpeg",
  },
  {
    id: "t75",
    name: "Lina Agustina",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap41.jpeg",
  },
  {
    id: "t76",
    name: "Ratih Purnawati",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap42.jpeg",
  },
  {
    id: "t77",
    name: "Devy Kusumastuti",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap43.jpeg",
  },
  {
    id: "t78",
    name: "Nisa Fauziah",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap44.jpeg",
  },
  {
    id: "t79",
    name: "Rara Setiawati",
    rating: 5,
    comment: "Awal pemakaian aja udah promising banget",
    product: "Paket Day & Night",
    images: ["/slide/slide8.jpeg", "/slide/slides8.jpeg"],
  },
  {
    id: "t80",
    name: "Indri Wahyuningsih",
    rating: 5,
    comment: "Dipakai pertama kali, langsung suka teksturnya",
    product: "Paket Lengkap",
    images: ["/slide/slide9.jpeg", "/slide/slides9.jpeg"],
  },
  {
    id: "t81",
    name: "Tari Novitasari",
    rating: 5,
    comment:
      "Nih before after di kulitku , jangan di ragukan lagi produk ini 🥰",
    product: "Paket Fresh",
    imageBefore: "/before/before7.jpeg",
    imageAfter: "/after/after7.jpeg",
  },
  {
    id: "t82",
    name: "Mira Oktaviani",
    rating: 5,
    comment: "Alhamdulillah bisa menghilangkan belang di tangan",
    product: "Lotion Malam",
    imageBefore: "/before/before8.jpeg",
    imageAfter: "/after/after8.jpeg",
  },
  {
    id: "t83",
    name: "Sinta Permatasari",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap45.jpeg",
  },
  {
    id: "t84",
    name: "Eka Rahmawati",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap46.jpeg",
  },
  {
    id: "t85",
    name: "Yuli Handayani",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap47.jpeg",
  },
  {
    id: "t86",
    name: "Pipit Andriani",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap48.jpeg",
  },
  {
    id: "t87",
    name: "Reni Marliana",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap49.jpeg",
  },
  {
    id: "t88",
    name: "Dita Febriani",
    rating: 5,
    comment: "-",
    product: "Lotion Malam",
    image: "/nocap/nocap50.jpeg",
  },
  {
    id: "t89",
    name: "Ulfah Nurhayati",
    rating: 5,
    comment: "-",
    product: "Paket Fresh",
    image: "/nocap/nocap51.jpeg",
  },
  {
    id: "t90",
    name: "Rizka Amalia",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap52.jpeg",
  },
  {
    id: "t91",
    name: "Sela Oktaria",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap53.jpeg",
  },
  {
    id: "t92",
    name: "Nuri Rahmadani",
    rating: 5,
    comment: "HB Pemutih cukup ringan dan enak dipakai setiap hari",
    product: "Lotion Siang",
    image: "/testimoni/testi22.jpeg",
  },
  {
    id: "t93",
    name: "Dewi Pramudita",
    rating: 5,
    comment: "Teksturnya nyaman, hasilnya terlihat",
    product: "Paket Day & Night",
    image: "/testimoni/testi23.jpeg",
  },
  {
    id: "t94",
    name: "Fitri Ramadhani",
    rating: 5,
    comment: "Sukaaa banget sama hasilnya beneran putih dong😭",
    product: "Paket Lengkap",
    image: "/testimoni/testi24.jpeg",
  },
  {
    id: "t95",
    name: "Amel Puspitasari",
    rating: 5,
    comment: "Orderan pertama varian day night 🥰",
    product: "Lotion Malam",
    image: "/testimoni/testi25.jpeg",
  },
  {
    id: "t96",
    name: "Wulandari Setia",
    rating: 5,
    comment: "-",
    product: "Paket Lengkap",
    image: "/nocap/nocap54.jpeg",
  },
  {
    id: "t97",
    name: "Nia Rosalinda",
    rating: 5,
    comment: "-",
    product: "Toner LAS",
    image: "/nocap/nocap55.jpeg",
  },
  {
    id: "t98",
    name: "Sari Puspita",
    rating: 5,
    comment: "-",
    product: "Lotion Siang",
    image: "/nocap/nocap56.jpeg",
  },
  {
    id: "t99",
    name: "Kartika Dewi",
    rating: 5,
    comment: "-",
    product: "Paket Day & Night",
    image: "/nocap/nocap57.jpeg",
  },
  {
    id: "t100",
    name: "Riana Safitri",
    rating: 5,
    comment: "Lotion siang malamnya ringan, nggak lengket",
    product: "Paket Fresh",
    image: "/testimoni/testi26.jpeg",
  },
  {
    id: "t101",
    name: "Melinda Cahyani",
    rating: 5,
    comment: "-",
    product: "Paket Fresh",
    image: "/nocap/nocap58.jpeg",
  },
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  const openLightbox = (images: string[], index: number) =>
    setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const lightboxPrev = () =>
    setLightbox((lb) =>
      lb
        ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }
        : lb,
    );
  const lightboxNext = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb,
    );
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 sparkle-bg pointer-events-none z-[-1]"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-cream-50 via-white to-amber-50/30 pointer-events-none z-[-2]"></div>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center border border-gold-400">
              <span className="font-serif text-gold-400 font-bold text-lg">
                L
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-widest text-stone-900">
              LAS{" "}
              <span className="text-sm font-sans font-light tracking-[0.3em] text-gold-600 ml-1">
                BRIGHTENING
              </span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest uppercase text-stone-600">
            <a href="#" className="hover:text-gold-600 transition-colors">
              Beranda
            </a>
            <a
              href="#packages"
              className="hover:text-gold-600 transition-colors"
            >
              Paket
            </a>
            <a
              href="#testimonials"
              className="hover:text-gold-600 transition-colors"
            >
              Testimoni
            </a>
            <a href="#about" className="hover:text-gold-600 transition-colors">
              Tentang
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-stone-800" />
            ) : (
              <Menu className="w-6 h-6 text-stone-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-100 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4 font-sans text-sm tracking-widest uppercase text-stone-600">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-600 transition-colors py-2"
              >
                Beranda
              </a>
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-600 transition-colors py-2"
              >
                Paket
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-600 transition-colors py-2"
              >
                Testimoni
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-600 transition-colors py-2"
              >
                Tentang
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left z-10">
              <div className="inline-block px-4 py-1 mb-6 border border-gold-300 rounded-full bg-gold-100/50 backdrop-blur-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-gold-700 font-semibold flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Koleksi Terbaru
                </span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-stone-900 mb-6">
                Kulit Putih &<br />
                <span className="text-gold-gradient italic pr-2">Sehat</span>
              </h2>
              <p className="font-sans text-stone-500 text-lg leading-relaxed max-w-lg mx-auto md:mx-0 mb-10">
                Rasakan kemewahan LAS Brightening. Formula triple-action kami
                menyeimbangkan, melindungi, dan memperbaiki kulit Anda untuk
                kilau golden hour yang abadi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#packages"
                  className="px-8 py-4 bg-stone-900 text-white rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Lihat Paket <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 relative w-full flex justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold-200/30 bg-gradient-to-tr from-gold-100/20 to-transparent blur-3xl animate-pulse-slow"></div>
              <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 md:gap-4 items-end transform translate-y-10">
                  <div className="transform scale-90 translate-x-4 z-0">
                    <ProductCard
                      product={PRODUCTS[2]}
                      onViewDetail={setSelectedProduct}
                    />
                  </div>
                  <div className="transform scale-110 z-20 -translate-y-4 shadow-2xl">
                    <ProductCard
                      product={PRODUCTS[1]}
                      onViewDetail={setSelectedProduct}
                    />
                  </div>
                  <div className="transform scale-90 -translate-x-4 z-0">
                    <ProductCard
                      product={PRODUCTS[0]}
                      onViewDetail={setSelectedProduct}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Indicators */}
      <section className="bg-white py-12 border-y border-stone-100">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Pelanggan Puas", val: "10rb+" },
            { label: "Bahan Alami", val: "100%" },
            { label: "Teruji Dermatologi", val: "Ya" },
            { label: "Berhasil Memutihkan", val: "Terverifikasi" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-serif text-3xl text-gold-500 font-bold mb-1">
                {stat.val}
              </p>
              <p className="text-stone-400 text-xs uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 bg-stone-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-2 block">
              Pilihan Paket
            </span>
            <h3 className="font-serif text-4xl text-stone-900 mb-4">
              Pesan Sekarang
            </h3>
            <p className="text-stone-500 max-w-lg mx-auto">
              Dapatkan harga spesial dengan membeli paket. Pemesanan langsung
              via WhatsApp.
            </p>
            <div className="w-20 h-1 bg-gold-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className="flex justify-center">
                <PackageCard
                  pkg={pkg}
                  products={PRODUCTS}
                  whatsappNumber={WHATSAPP_NUMBER}
                  featured={!!pkg.badge}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-2 block">
              Testimoni
            </span>
            <p className="text-stone-500 max-w-lg mx-auto">
              Dengarkan pengalaman nyata dari pelanggan setia LAS Brightening
              yang telah merasakan perubahan pada kulit mereka.
            </p>
            <div className="w-20 h-1 bg-gold-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, visibleCount).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onImageClick={openLightbox}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            {visibleCount < TESTIMONIALS.length ? (
              <button
                onClick={() => setVisibleCount((c) => c + 9)}
                className="px-8 py-4 bg-stone-900 text-white rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Lihat Lebih Banyak
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(9)}
                className="px-8 py-4 bg-stone-900 text-white rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Lihat Lebih Sedikit
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Benefit/About Section */}
      <section
        id="about"
        className="py-24 bg-stone-900 text-white relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                Mengapa Memilih <br />
                <span className="text-gold-gradient">LAS Brightening?</span>
              </h3>
              <p className="text-stone-300 leading-relaxed font-light">
                Diformulasikan dengan bahan-bahan premium yang dirancang untuk
                bekerja selaras dengan ritme alami kulit Anda. Dari aplikasi
                pagi yang menyegarkan hingga perbaikan mendalam di malam hari,
                setiap tetes adalah janji kecerahan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-500/20 rounded-full text-gold-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Kilau Instan</h4>
                    <p className="text-sm text-stone-400">
                      Hasil terlihat sejak pemakaian pertama dengan teknologi
                      micro-pearl kami.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-500/20 rounded-full text-gold-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">
                      Kualitas Premium
                    </h4>
                    <p className="text-sm text-stone-400">
                      Bahan berkualitas tinggi yang bersumber secara bertanggung
                      jawab untuk pengalaman perawatan kulit terbaik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative h-96 w-full bg-stone-800 rounded-3xl overflow-hidden border border-stone-700 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="font-serif text-gold-400/20 text-9xl font-bold italic">
                    LAS
                  </h4>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="font-serif text-2xl italic mb-4">
                    "Investasi terbaik yang bisa Anda lakukan adalah pada kulit
                    Anda sendiri."
                  </p>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold-400 fill-gold-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sertifikat Section */}
      <section className="py-24 bg-stone-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-2 block">
              Legalitas
            </span>
            <h3 className="font-serif text-4xl text-stone-900 mb-4">
              Sertifikat Kami
            </h3>
            <p className="text-stone-500 max-w-lg mx-auto">
              Produk LAS Brightening telah tersertifikasi dan terjamin kualitasnya.
            </p>
            <div className="w-20 h-1 bg-gold-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden p-6 max-w-md w-full hover:shadow-2xl transition-shadow">
              <img
                src="/sertifikat/sertifikat.png"
                alt="Sertifikat LAS Brightening"
                className="w-full h-auto object-contain rounded-2xl cursor-pointer"
                onClick={() => openLightbox(["/sertifikat/sertifikat.png"], 0)}
              />
              <div className="mt-4 flex items-center gap-3 justify-center">
                <div className="p-2 bg-gold-100 rounded-full">
                  <Award className="w-5 h-5 text-gold-600" />
                </div>
                <p className="text-stone-700 text-sm font-semibold">
                  Produk Bersertifikat Resmi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Area Penjualan / Map Section */}
      <section id="area" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-2 block">
              Area Penjualan
            </span>
            <h3 className="font-serif text-4xl text-stone-900 mb-4">
              Jangkauan Kami
            </h3>
            <p className="text-stone-500 max-w-lg mx-auto">
              Saat ini LAS Brightening melayani pemesanan dan pengiriman di area
              Pontianak dan Sambas, Kalimantan Barat.
            </p>
            <div className="w-20 h-1 bg-gold-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Pontianak Card + Map */}
            <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="rounded-t-3xl overflow-hidden h-64">
                <iframe
                  title="Peta Pontianak"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.75772082988!2d109.28629!3d-0.02278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3104c5401c0e668d%3A0x2e6b81ecaa8cd96d!2sPontianak%2C%20Kota%20Pontianak%2C%20Kalimantan%20Barat!5e0!3m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-100 rounded-full">
                    <MapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-stone-900 mb-2">
                      Kota Pontianak
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Melayani seluruh area Kota Pontianak dan sekitarnya.
                      Pengiriman cepat 1-2 hari kerja.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sambas Card + Map */}
            <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="rounded-t-3xl overflow-hidden h-64">
                <iframe
                  title="Peta Sambas"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255345.5!2d108.9!3d1.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31e4a7064047b3ed%3A0xb8e89cc3e5eb12c7!2sKabupaten%20Sambas%2C%20Kalimantan%20Barat!5e0!3m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-100 rounded-full">
                    <MapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-stone-900 mb-2">
                      Kabupaten Sambas
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Melayani seluruh area Kabupaten Sambas dan sekitarnya.
                      Pengiriman 2-3 hari kerja.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-gold-100/50 rounded-2xl p-6 border border-gold-200 max-w-2xl mx-auto">
            <p className="text-stone-700 text-sm leading-relaxed text-center">
              Untuk pemesanan di luar area tersebut, silakan hubungi kami via
              WhatsApp untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
                LAS
              </h2>
              <p className="text-stone-500 text-sm max-w-xs">
                Dosis harian kemewahan dan kecerahan Anda. <br />
                Kalimantan Barat, Indonesia.
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/profile.php?id=61588199164566"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-stone-600 hover:text-gold-500 hover:scale-110 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 uppercase tracking-widest">
            <p>&copy; 2024 LAS Brightening. Hak cipta dilindungi.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold-600">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-gold-600">
                Syarat Layanan
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal - Info Only (no buy button) */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gold-400 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightbox.images[lightbox.index]}
            alt="Testimoni"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxPrev();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxNext();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {lightbox.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((lb) => (lb ? { ...lb, index: i } : lb));
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.index ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
