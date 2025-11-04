
import React from 'react';

export const WelcomeMessage: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="mb-4">
                <span className="text-5xl">🥗</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to NutraMind!</h2>
            <p className="text-gray-600">
                Ready to understand your meals better? Just type what you ate into the box on the left, and I'll provide a full nutritional breakdown.
            </p>
            <p className="text-sm text-gray-400 mt-4">
                Example: "A cup of black coffee and two slices of toast with butter"
            </p>
        </div>
    );
};