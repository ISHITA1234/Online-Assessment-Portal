import React from 'react';

export function Spinner() {
  return (    
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="h-32 w-32 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};
