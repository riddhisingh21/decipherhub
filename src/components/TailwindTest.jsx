import React from 'react';

function TailwindTest() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 my-4">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">T</span>
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Tailwind Test</div>
        <p className="text-gray-500">Checking if Tailwind CSS is working!</p>
        <div className="mt-4 flex space-x-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button 1
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Button 2
          </button>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest;