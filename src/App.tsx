import React from 'react';
import { Plus, Printer, Download, Layout } from 'lucide-react';
import { ProductSearch } from './components/ProductSearch';
import { LabelEditor } from './components/LabelEditor';
import { useLabelStore } from './store/labelStore';
import type { Label } from './types';

function App() {
  const { labels, addLabel, removeLabel, updateLabel } = useLabelStore();

  const handleAddCustomLabel = () => {
    const newLabel: Label = {
      id: Date.now().toString(),
      size: '65x55',
      isCustom: true,
      customText: '',
    };
    addLabel(newLabel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layout className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Création d'étiquettes
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddCustomLabel}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Nouvelle étiquette
              </button>
              <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 shadow-sm">
                <Printer className="w-5 h-5" />
                Format A4
              </button>
              <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 shadow-sm">
                <Download className="w-5 h-5" />
                Grand format
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductSearch />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labels.map((label) => (
            <LabelEditor
              key={label.id}
              label={label}
              onSave={updateLabel}
              onDelete={removeLabel}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;