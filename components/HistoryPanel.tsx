
import React from 'react';
import type { MealEntry } from '../types';

interface HistoryPanelProps {
  mealHistory: MealEntry[];
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ mealHistory }) => {
  if (mealHistory.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Meal History</h2>
      <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {mealHistory.map((entry) => (
          <li key={entry.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <p className="text-gray-600 font-medium truncate italic">"{entry.input}"</p>
            <p className="text-right font-bold text-green-600 mt-1">{entry.response.totalCalories} cal</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
