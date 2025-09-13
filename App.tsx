
import React, { useState, useCallback } from 'react';
import { WebcamFeed } from './components/WebcamFeed';
import { DetectionResults } from './components/DetectionResults';
import { Header } from './components/Header';
import { Detection } from './types';
import { detectObjectsAndGender } from './services/geminiService';

const App: React.FC = () => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFrame = useCallback(async (base64Image: string) => {
    if (isDetecting) return;

    setIsDetecting(true);
    setError(null);
    try {
      const result = await detectObjectsAndGender(base64Image);
      setDetections(result);
    } catch (err) {
      console.error(err);
      setError('Failed to get detections from the API. Please check the console for details.');
      setDetections([]);
    } finally {
      setIsDetecting(false);
    }
  }, [isDetecting]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col p-4 md:p-8">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2">
           <WebcamFeed onFrame={handleFrame} detections={detections} isDetecting={isDetecting} />
        </div>
        <div className="lg:col-span-1 bg-gray-800/50 rounded-lg p-6 shadow-2xl backdrop-blur-sm border border-gray-700">
          <DetectionResults detections={detections} isDetecting={isDetecting} error={error} />
        </div>
      </main>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p>Powered by Google Gemini. This application is for demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
