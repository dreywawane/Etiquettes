export interface Product {
  id: string;
  name: string;
  characteristics: string[];
  price: number;
  kits: Kit[];
  lastUpdate: string;
}

export interface Kit {
  name: string;
  price: number;
}

export type LabelSize = '65x55' | '65x95' | '102x152';

export interface Label {
  id: string;
  product?: Product;
  size: LabelSize;
  customText?: string;
  promo?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  isCustom: boolean;
}