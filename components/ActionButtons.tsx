import React from 'react';

const ActionButton = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <button className="flex items-center justify-center space-x-2 w-full sm:w-auto text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 hover:text-orange-600 transition-all duration-200 shadow-sm">
        {icon}
        <span>{text}</span>
    </button>
);


export const ActionButtons: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
       <ActionButton 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            text="Take a picture to identify calories"
        />
        <ActionButton 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
            text="Create a weight loss plan"
        />
        <ActionButton 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 7h.01M15 7h.01" /></svg>}
            text="Calories Calculators"
        />
    </div>
  ); 
};
