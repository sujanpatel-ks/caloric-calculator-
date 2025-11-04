
import React, { useEffect } from 'react';
import type { MealEntry } from '../types';

interface MealDetailModalProps {
  meal: MealEntry;
  onClose: () => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({ meal, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="meal-detail-title"
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 id="meal-detail-title" className="text-xl font-bold text-gray-800 italic">"{meal.input}"</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-6">
                    <p className="text-3xl font-extrabold text-center">{meal.response.totalCalories}</p>
                    <p className="text-center font-medium">Total Estimated Calories</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Itemized Breakdown</h3>
                    <ul className="space-y-2">
                    {meal.response.items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                        <span className="text-gray-600 capitalize">{item.food}</span>
                        <span className="font-bold text-green-600">{item.calories} cal</span>
                        </li>
                    ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">NutraMind's Advice</h3>
                    <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-blue-700">{meal.response.advice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
