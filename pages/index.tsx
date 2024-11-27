// src/pages/index.tsx
import React, { useState } from 'react';
import ChatInterface from '@/components/chatInterface/ChatInterface';
import BudgetTracker from '@/components/BudgetTracker/BudgetTracker';
import Home from '@/components/VoiceInput/VoiceInput';

const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-3xl text-center mb-4">Welcome to Your AI Financial Advisor</h1>
      <ChatInterface />
      <BudgetTracker/>
      <Home/>
    </div>
  );
};

export default IndexPage;
