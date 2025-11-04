
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MealEntry } from '../types';
import { MealDetailModal } from './MealDetailModal';

interface CalorieChartProps {
  data: MealEntry[];
}

export const CalorieChart: React.FC<CalorieChartProps> = ({ data }) => {
  const [selectedMeal, setSelectedMeal] = useState<MealEntry | null>(null);

  // We want to show the most recent entries, so we reverse and take the last 7
  const chartData = data.slice(0, 7).reverse().map(entry => ({
    name: entry.input.length > 15 ? entry.input.substring(0, 15) + '...' : entry.input,
    calories: entry.response.totalCalories,
    fullEntry: entry, // Keep a reference to the full entry
  }));

  const handleBarClick = (data: any) => {
    if (data && data.payload && data.payload.fullEntry) {
      setSelectedMeal(data.payload.fullEntry);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Calorie Intake</h2>
        <p className="text-sm text-gray-500 mb-4">Click on a bar to see details.</p>
        <ResponsiveContainer width="100%" height="calc(100% - 40px)">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-25}
              textAnchor="end"
              height={50}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip 
              cursor={{fill: 'rgba(236, 252, 241, 0.5)'}}
              contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="calories" 
              fill="#10B981" 
              onClick={handleBarClick} 
              style={{ cursor: 'pointer' }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedMeal && (
        <MealDetailModal 
          meal={selectedMeal} 
          onClose={() => setSelectedMeal(null)} 
        />
      )}
    </>
  );
};
