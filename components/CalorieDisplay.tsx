
import React from 'react';
import type { CalorieResponse } from '../types';

interface CalorieDisplayProps {
  response: CalorieResponse;
}

export const CalorieDisplay: React.FC<CalorieDisplayProps> = ({ response }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutritional Breakdown</h2>
      
      <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-6">
        <p className="text-4xl font-extrabold text-center">{response.totalCalories}</p>
        <p className="text-center font-medium text-lg">Total Estimated Calories</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Itemized Breakdown</h3>
        <ul className="space-y-2">
          {response.items.map((item, index) => (
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
          <p className="text-blue-700">{response.advice}</p>
        </div>
      </div>
    </div>
  );
};