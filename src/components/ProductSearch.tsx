import React from 'react';
import { Search, Plus } from 'lucide-react';
import { useLabelStore } from '../store/labelStore';
import type { Product, Label } from '../types';

export const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { products, addProduct, addLabel } = useLabelStore();

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: searchTerm,
      characteristics: [],
      price: 0,
      kits: [],
      lastUpdate: new Date().toISOString(),
    };
    
    const newLabel: Label = {
      id: Date.now().toString(),
      product: newProduct,
      size: '65x55',
      isCustom: false,
    };

    addProduct(newProduct);
    addLabel(newLabel);
    setSearchTerm('');
  };

  return (
    <div className="mb-8">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un produit sur camara.net..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-shadow duration-200 shadow-sm"
          />
        </div>
        <button
          onClick={handleAddProduct}
          disabled={!searchTerm.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>
    </div>
  );
};