import React from 'react';
import { Save, Trash2, Edit3, X } from 'lucide-react';
import type { Label } from '../types';
import { LabelPreview } from './LabelPreview';

interface Props {
  label: Label;
  onSave: (label: Label) => void;
  onDelete: (id: string) => void;
}

export const LabelEditor: React.FC<Props> = ({ label, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedLabel, setEditedLabel] = React.useState(label);

  const handleSave = () => {
    onSave(editedLabel);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {label.isCustom ? 'Étiquette personnalisée' : label.product?.name}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(label.id)}
              className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <LabelPreview label={isEditing ? editedLabel : label} className="mx-auto" />
        </div>

        {isEditing && (
          <div className="space-y-4 border-t border-gray-100 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taille de l'étiquette
              </label>
              <select
                value={editedLabel.size}
                onChange={(e) =>
                  setEditedLabel({
                    ...editedLabel,
                    size: e.target.value as Label['size'],
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-shadow duration-200"
              >
                <option value="65x55">65 × 55 mm</option>
                <option value="65x95">65 × 95 mm</option>
                <option value="102x152">102 × 152 mm</option>
              </select>
            </div>

            {editedLabel.isCustom && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texte personnalisé
                </label>
                <textarea
                  value={editedLabel.customText}
                  onChange={(e) =>
                    setEditedLabel({
                      ...editedLabel,
                      customText: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-shadow duration-200"
                  rows={3}
                  placeholder="Saisissez votre texte ici..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Promotion
              </label>
              <div className="flex gap-2">
                <select
                  value={editedLabel.promo?.type || ''}
                  onChange={(e) =>
                    setEditedLabel({
                      ...editedLabel,
                      promo: e.target.value
                        ? {
                            type: e.target.value as 'percentage' | 'fixed',
                            value: editedLabel.promo?.value || 0,
                          }
                        : undefined,
                    })
                  }
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-shadow duration-200"
                >
                  <option value="">Sans promotion</option>
                  <option value="percentage">Pourcentage</option>
                  <option value="fixed">Montant fixe</option>
                </select>
                {editedLabel.promo && (
                  <input
                    type="number"
                    value={editedLabel.promo.value}
                    onChange={(e) =>
                      setEditedLabel({
                        ...editedLabel,
                        promo: {
                          ...editedLabel.promo!,
                          value: Number(e.target.value),
                        },
                      })
                    }
                    className="w-32 p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-shadow duration-200"
                    placeholder={editedLabel.promo.type === 'percentage' ? '% de réduction' : 'Montant €'}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};