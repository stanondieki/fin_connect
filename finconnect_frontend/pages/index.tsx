// src/pages/index.tsx
import React, { useState } from 'react';
// import ChatInterface from '@/components/chatInterface/ChatInterface';
// import BudgetTracker from '@/components/BudgetTracker/BudgetTracker';
// import Home from '@/components/VoiceInput/VoiceInput';
import LandingPage from '@/components/landing/landing';

const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-3xl text-center text-black text-bold mb-4">Welcome to Financial Connect,</h1>
      {/* <ChatInterface />
      <BudgetTracker/>
      <Home/> */}
      <LandingPage/>
    </div>
  );
};

export default IndexPage;
