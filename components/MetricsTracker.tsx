'use client';

   import { useState } from 'react';

   const MetricsTracker = ({ onLog }) => {
     const [bloodSugar, setBloodSugar] = useState('');
     const [weight, setWeight] = useState('');
     const [painLevel, setPainLevel] = useState(0);

     const handleSubmit = (e) => {
       e.preventDefault();
       const newMetric = {
         id: Date.now().toString(),
         date: new Date().toISOString().split('T')[0],
         time: new Date().toLocaleTimeString(),
         bloodSugar: parseFloat(bloodSugar),
         weight: parseFloat(weight),
         painLevel,
       };
       onLog(newMetric);
       setBloodSugar('');
       setWeight('');
       setPainLevel(0);
     };

     return (
       <div className="p-6 bg-white rounded-lg shadow-md">
         <h2 className="text-xl font-bold mb-4 text-purple-800">Track Health Metrics</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-purple-700">
               Blood Sugar (mg/dL)
             </label>
             <input
               type="number"
               value={bloodSugar}
               onChange={(e) => setBloodSugar(e.target.value)}
               className="mt-1 p-2 w-full border rounded-md"
               placeholder="Enter blood sugar level"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-purple-700">Weight (kg)</label>
             <input
               type="number"
               value={weight}
               onChange={(e) => setWeight(e.target.value)}
               className="mt-1 p-2 w-full border rounded-md"
               placeholder="Enter weight"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-purple-700">
               Pain Level (0-10)
             </label>
             <div className="flex items-center space-x-2">
               <input
                 type="range"
                 min="0"
                 max="10"
                 value={painLevel}
                 onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                 className="w-full"
               />
               <span>{painLevel}</span>
             </div>
           </div>
           <button
             type="submit"
             className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
           >
             Log Metrics
           </button>
         </form>
       </div>
     );
   };

   export default MetricsTracker;
