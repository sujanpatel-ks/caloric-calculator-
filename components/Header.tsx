import React from 'react';

const NavDropdown = ({ title }: { title: string }) => (
    <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
        <span>{title}</span>
        <svg className="ml-1 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    </button>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.reload()}>
                <span className="text-3xl">🍊</span>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                NutraMind
                </h1>
            </div>
        </div>
        <nav className="hidden md:flex items-center space-x-1">
            <button onClick={() => window.location.reload()} className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
                Home
            </button>
            <span className="px-3 py-2 rounded-md text-sm font-medium bg-orange-100 text-orange-600">
                Food Calories AI
            </span>
             {/* The "AI Suggestion" button has been removed from here */}
            <NavDropdown title="Calories Calculators" />
            <NavDropdown title="Calories" />
        </nav>
      </div>
    </header>
  );
};