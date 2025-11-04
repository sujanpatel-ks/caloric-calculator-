import React, { useState } from 'react';
import { getAiSuggestion } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';

export const SuggestionEngine: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;
        
        setIsLoading(true);
        setError(null);
        setSuggestion('');

        try {
            const result = await getAiSuggestion(userInput);
            setSuggestion(result);
        } catch (err) {
            setError('Sorry, I couldn\'t get a suggestion at this time. The AI might be busy. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Meal Planner</h2>
                <p className="text-gray-600 mb-4">Need inspiration? Ask for meal ideas, recipes, or nutritional advice!</p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="e.g., 'What are some healthy, high-protein breakfast ideas?'"
                        className="w-full h-28 p-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200 resize-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="mt-4 w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                        {isLoading ? 'Getting Suggestion...' : 'Get Suggestion'}
                    </button>
                </form>
            </div>

            <div className="mt-8">
                {isLoading && <LoadingSpinner />}
                {error && <ErrorDisplay message={error} />}
                {suggestion && (
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 prose max-w-none">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Here's a suggestion for you:</h3>
                        <div dangerouslySetInnerHTML={{ __html: suggestion.replace(/\n/g, '<br />') }} />
                    </div>
                )}
            </div>
        </div>
    );
};