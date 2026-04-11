"use client";

export default function BackButton({ className }) {
  return (
    <button 
      onClick={() => window.history.back()} 
      className={className}
    >
      Go Back
    </button>
  );
}
