import React from 'react';
import type { Label } from '../types';

interface Props {
  label: Label;
  className?: string;
}

export const LabelPreview: React.FC<Props> = ({ label, className = '' }) => {
  const basePrice = label.product?.price || 0;
  const finalPrice = label.promo
    ? label.promo.type === 'percentage'
      ? basePrice * (1 - label.promo.value / 100)
      : basePrice - label.promo.value
    : basePrice;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${
        label.size === '102x152' ? 'label-102x152' : label.size === '65x95' ? 'label-65x95' : 'label-65x55'
      } ${className}`}
    >
      <div className="p-4 h-full">
        {label.isCustom ? (
          <div className="h-full flex flex-col">
            <div className="flex-1 whitespace-pre-wrap text-sm">
              {label.customText}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{label.product?.name}</h3>
            
            {label.product?.characteristics.length > 0 && (
              <ul className="text-sm text-gray-600 mb-3 space-y-1">
                {label.product.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-auto">
              {label.promo && (
                <div className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded-md text-sm font-semibold mb-2">
                  -{label.promo.type === 'percentage' ? `${label.promo.value}%` : `${label.promo.value}€`}
                </div>
              )}
              
              <div className="flex items-baseline gap-2">
                {label.promo && (
                  <span className="text-gray-400 line-through">{basePrice.toFixed(2)}€</span>
                )}
                <span className="text-2xl font-bold text-gray-900">{finalPrice.toFixed(2)}€</span>
              </div>

              {label.product?.kits.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  {label.product.kits.map((kit, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>{kit.name}</span>
                      <span className="font-medium">{kit.price.toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};