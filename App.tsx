
import React, { useState } from 'react';
import { calculateCaloriesFromGemini } from './services/geminiService';
import type { CalorieResponse, MealEntry } from './types';
import { FoodInputForm } from './components/FoodInputForm';
import { CalorieDisplay } from './components/CalorieDisplay';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ActionButtons } from './components/ActionButtons';
import { SuggestionEngine } from './components/SuggestionEngine';
import { Footer } from './components/Footer';
import { WelcomeMessage } from './components/WelcomeMessage';
import { GoalTracker } from './components/GoalTracker';
import { HistoryPanel } from './components/HistoryPanel';
import { CalorieChart } from './components/CalorieChart';

const App: React.FC = () => {
  const [mealHistory, setMealHistory] = useState<MealEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);
  const [calorieResponse, setCalorieResponse] = useState<CalorieResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMealSubmit = async (foodInput: string, imageBase64?: string, imageMimeType?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await calculateCaloriesFromGemini(foodInput, imageBase64, imageMimeType);
      const newEntry: MealEntry = {
        id: Date.now(),
        input: foodInput.trim() || (imageBase64 ? "Image analysis" : "Meal"),
        response: response,
      };
      setMealHistory(prev => [newEntry, ...prev]);
      setCalorieResponse(response);
    } catch (err) {
      console.error('Error from Gemini API:', err);
      setError('Sorry, I couldn\'t calculate the calories. The AI model might be busy or the input was unclear. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            NutraMind <span className="text-orange-500">Powered by AI</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Calorie Tracker Just Needs Snap, Real-time analysis for effortless weight loss. No input, No errors!
          </p>
          
          <GoalTracker 
            mealHistory={mealHistory} 
            dailyGoal={dailyGoal} 
            onGoalChange={setDailyGoal}
          />
          
          <div className="mt-8 grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 text-left space-y-8">
              <FoodInputForm onSubmit={handleMealSubmit} isLoading={isLoading} />
              <ActionButtons />
              <SuggestionEngine />
            </div>

            <div className="lg:col-span-3 text-left">
              {isLoading && <LoadingSpinner />}
              {error && <ErrorDisplay message={error} />}
              
              {!isLoading && !error && (
                <div className="space-y-8">
                  {mealHistory.length === 0 && <WelcomeMessage />}
                  
                  {calorieResponse && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Last Meal Analysis</h2>
                      <CalorieDisplay response={calorieResponse} />
                    </div>
                  )}

                  {mealHistory.length > 0 && (
                    <>
                      <HistoryPanel mealHistory={mealHistory} />
                      <CalorieChart data={mealHistory} />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
