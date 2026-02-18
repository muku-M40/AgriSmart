
import React, { useState, useRef } from 'react';
import { diagnoseCropImage, blobToBase64 } from '../services/gemini';
import { ICONS } from '../constants';

const CropDoctor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Reset states
      setDiagnosis(null);
      setIsLoading(true);

      try {
        const base64 = await blobToBase64(file);
        const result = await diagnoseCropImage(base64);
        setDiagnosis(result || 'Unable to analyze image. Please try a clearer photo.');
      } catch (error) {
        console.error("Diagnosis failed:", error);
        setDiagnosis("Connection error. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {ICONS.CropDoctor}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Crop Health Diagnosis</h2>
          <p className="text-slate-500 mt-2">Upload a photo of your affected crop for instant AI analysis.</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div 
              className={`
                relative border-2 border-dashed rounded-3xl aspect-square flex flex-col items-center justify-center p-6 transition-all
                ${image ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-green-400'}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Crop preview" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-slate-400">
                    {ICONS.Add}
                  </div>
                  <p className="text-sm font-semibold text-slate-600">Click to upload photo</p>
                  <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG</p>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            {/* Results Area */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                AI Diagnosis Report
                {isLoading && <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>}
              </h3>
              
              <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 overflow-y-auto min-h-[300px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="text-sm font-medium">Scanning leaf patterns...</p>
                  </div>
                ) : diagnosis ? (
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                      {diagnosis}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 bg-green-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-green-700 transition-colors">
                        Buy Recommended Pesticides
                      </button>
                      <button className="px-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center px-6">
                    <p className="text-sm">Please upload an image to see the diagnosis results and treatment recommendations.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDoctor;
