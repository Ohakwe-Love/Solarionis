// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { ShoppingCart, Heart, Plus, Minus, Trash2, Search, SlidersHorizontal, X } from 'lucide-react';

// // ============================================
// // PRODUCTS DATA
// // ============================================
// const allProducts = [
//     { id: 1, name: 'Classic Chronograph', price: '3800.00', category: 'Chronograph', brand: 'Swiss Master', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', badge: 'NEW' },
//     { id: 2, name: 'Heritage Automatic', price: '4300.00', category: 'Automatic', brand: 'Italian Elegance', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop', badge: null },
//     { id: 3, name: 'Elegant Dress Watch', price: '3400.00', category: 'Dress', brand: 'German Precision', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop', badge: 'SALE' },
//     { id: 4, name: 'Professional Diver', price: '3850.00', category: 'Sports', brand: 'Japanese Innovation', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=600&fit=crop', badge: null },
//     { id: 5, name: 'Vintage Timepiece', price: '4500.00', category: 'Dress', brand: 'Swiss Master', image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=600&fit=crop', badge: 'NEW' },
//     { id: 6, name: 'Sport Chronograph', price: '3900.00', category: 'Sports', brand: 'German Precision', image: 'https://images.unsplash.com/photo-1587836374182-f78b2c2e8d5f?w=600&h=600&fit=crop', badge: null },
//     { id: 7, name: 'Luxury Automatic', price: '5200.00', category: 'Automatic', brand: 'Italian Elegance', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop', badge: null },
//     { id: 8, name: 'Modern Classic', price: '3600.00', category: 'Chronograph', brand: 'Japanese Innovation', image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=600&fit=crop', badge: 'SALE' },
//     { id: 9, name: 'Executive Gold', price: '6200.00', category: 'Dress', brand: 'Swiss Master', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop', badge: 'NEW' },
//     { id: 10, name: 'Racing Chrono', price: '4100.00', category: 'Sports', brand: 'Italian Elegance', image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&h=600&fit=crop', badge: null },
//     { id: 11, name: 'Skeleton Auto', price: '4800.00', category: 'Automatic', brand: 'German Precision', image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&h=600&fit=crop', badge: null },
//     { id: 12, name: 'Minimalist Steel', price: '2900.00', category: 'Dress', brand: 'Japanese Innovation', image: 'https://images.unsplash.com/photo-1533139142390-e5cb0b6f9b7b?w=600&h=600&fit=crop', badge: 'SALE' }
// ];


// // ============================================
// // PRODUCT CARD COMPONENT
// // ============================================
// const ProductCard = ({ product, addToCart }) => {
//     const [isAdded, setIsAdded] = useState(false);

//     const handleAddToCart = () => {
//         addToCart(product);
//         setIsAdded(true);
//         setTimeout(() => setIsAdded(false), 2000);
//     };

//     return (
//         <div className="group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-[var(--primary-color)] transition-all duration-300">
//             <div className="relative overflow-hidden aspect-square">
//                 <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />

//                 {product.badge && (
//                     <span className="absolute top-3 right-3 bg-[var(--primary-color)] text-white text-xs font-bold px-3 py-1 rounded-full">
//                         {product.badge}
//                     </span>
//                 )}

//                 <button className="absolute top-3 left-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition opacity-0 group-hover:opacity-100">
//                     <Heart className="w-5 h-5" />
//                 </button>
//             </div>

//             <div className="p-5">
//                 <p className="text-[var(--primary-color)] text-xs font-medium tracking-wider mb-1">
//                     {product.category.toUpperCase()}
//                 </p>
//                 <h3 className="text-white text-lg font-serif mb-2 group-hover:text-[var(--primary-color)] transition">
//                     {product.name}
//                 </h3>
//                 <div className="flex items-center justify-between">
//                     <p className="text-gray-300 text-xl font-medium">${product.price}</p>
//                     <button
//                         onClick={handleAddToCart}
//                         className={`p-2 rounded-full transition ${isAdded ? 'bg-green-500 text-white' : 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90'
//                             }`}
//                     >
//                         {isAdded ? '✓' : <ShoppingCart className="w-5 h-5" />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default ShopPage;