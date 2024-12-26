'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorCard = ({ error }) => {
  // Determine error type
  const isQuotaError = error?.toLowerCase().includes('quota') || 
    error?.toLowerCase().includes('limit');
  
  console.log(isQuotaError);
  
  const isNetworkError = error?.toLowerCase().includes('network') || 
    error?.toLowerCase().includes('connection');
  
  console.log(isNetworkError);
  
  // Set error content based on type
  const errorContent = {
    title: isQuotaError 
      ? "API Request Limit Reached"
      : isNetworkError 
      ? "Network Error"
      : "Error Loading Videos",
    
    message: isQuotaError
      ? "We've hit the maximum number of API requests allowed. Please try again later."
      : isNetworkError
      ? "Unable to connect to the server. Please check your internet connection."
      : error || "An unexpected error occurred while loading videos.",
    
    suggestions: isQuotaError
      ? [
          "Wait a few minutes and refresh the page",
          "Clear your browser cache and try again",
          "Contact support if the issue persists"
        ]
      : isNetworkError
      ? [
          "Check your internet connection",
          "Refresh the page and try again",
          "Check if the service is down"
        ]
      : [
          "Refresh the page and try again",
          "Clear your browser cache",
          "Contact support if the issue persists"
        ]
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {errorContent.title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errorContent.message}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs text-red-700">
          <p className="font-medium mb-1">Try these solutions:</p>
          <ul className="list-disc pl-5 space-y-1">
            {errorContent.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-3 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorCard;