
import React, { useState, useMemo } from 'react';
import type { MealEntry } from '../types';

interface GoalTrackerProps {
  mealHistory: MealEntry[];
  dailyGoal: number;
  onGoalChange: (newGoal: number) => void;
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({ mealHistory, dailyGoal, onGoalChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goalInput, setGoalInput] = useState(dailyGoal.toString());

  const totalCaloriesToday = useMemo(() => {
    // In a real app, you'd filter by date. For this session-based app, we sum all.
    return mealHistory.reduce((sum, entry) => sum + entry.response.totalCalories, 0);
  }, [mealHistory]);

  const progress = dailyGoal > 0 ? Math.min((totalCaloriesToday / dailyGoal) * 100, 100) : 0;
  const remainingCalories = Math.max(0, dailyGoal - totalCaloriesToday);

  const handleGoalSave = () => {
    const newGoal = parseInt(goalInput, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      onGoalChange(newGoal);
    } else {
      setGoalInput(dailyGoal.toString()); // Reset if input is invalid
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleGoalSave();
    }
  }

  return (
    <div className="my-8 bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Today's Progress</h2>
          <p className="text-gray-600">
            <span className="font-bold text-gray-800">{totalCaloriesToday.toLocaleString()}</span> / {dailyGoal.toLocaleString()} kcal consumed
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-right">
              <span className="font-semibold text-green-600 text-lg">{remainingCalories.toLocaleString()}</span>
              <p className="text-sm text-gray-500">kcal left</p>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={goalInput} 
                onChange={(e) => setGoalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-28 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                aria-label="Daily calorie goal"
              />
              <button onClick={handleGoalSave} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Save</button>
            </div>
          ) : (
            <button onClick={() => { setIsEditing(true); setGoalInput(dailyGoal.toString()); }} className="text-sm text-blue-600 hover:underline font-medium">
              Edit Goal
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mt-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};
