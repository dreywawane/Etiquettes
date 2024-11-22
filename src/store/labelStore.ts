import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, Label } from '../types';

interface LabelStore {
  products: Product[];
  labels: Label[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  addLabel: (label: Label) => void;
  removeLabel: (id: string) => void;
  updateLabel: (label: Label) => void;
}

export const useLabelStore = create<LabelStore>()(
  persist(
    (set) => ({
      products: [],
      labels: [],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),
      addLabel: (label) =>
        set((state) => ({
          labels: [...state.labels, label],
        })),
      removeLabel: (id) =>
        set((state) => ({
          labels: state.labels.filter((label) => label.id !== id),
        })),
      updateLabel: (label) =>
        set((state) => ({
          labels: state.labels.map((l) =>
            l.id === label.id ? label : l
          ),
        })),
    }),
    {
      name: 'label-store',
    }
  )
);