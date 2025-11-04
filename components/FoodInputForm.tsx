import React, { useState, useRef } from 'react';

interface FoodInputFormProps {
  onSubmit: (foodInput: string, imageBase64?: string, imageMimeType?: string) => void;
  isLoading: boolean;
}

const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve({ base64, mimeType: file.type });
        };
        reader.onerror = error => reject(error);
    });
};

export const FoodInputForm: React.FC<FoodInputFormProps> = ({ onSubmit, isLoading }) => {
  const [foodInput, setFoodInput] = useState('');
  const [image, setImage] = useState<{ preview: string; base64: string; mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { base64, mimeType } = await fileToBase64(file);
      setImage({ preview: URL.createObjectURL(file), base64, mimeType });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((foodInput.trim() || image) && !isLoading) {
      onSubmit(foodInput, image?.base64, image?.mimeType);
      setFoodInput('');
      setImage(null);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="Describe your food, or send a picture of the food..."
            className="w-full h-36 p-4 pr-24 border-2 border-blue-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 resize-none text-gray-700"
            disabled={isLoading}
          />
          <div className="absolute top-4 right-4 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V8.25a2.25 2.25 0 0 0-2.25-2.25H8.25A2.25 2.25 0 0 0 6 8.25v7.5A2.25 2.25 0 0 0 8.25 18Z" />
            </svg>
          </div>
        </div>

        {image && (
            <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={image.preview} alt="Meal preview" className="w-full h-full object-cover" />
                <button 
                    type="button" 
                    onClick={() => setImage(null)} 
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 leading-none"
                    aria-label="Remove image"
                >
                    &times;
                </button>
            </div>
        )}

        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors" aria-label="Upload image">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
                <button type="button" onClick={() => cameraInputRef.current?.click()} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors" aria-label="Take picture">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
            </div>
            <button
                type="submit"
                disabled={isLoading || (!foodInput.trim() && !image)}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Submit for calculation"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
        </div>
      </form>
    </div>
  );
};
