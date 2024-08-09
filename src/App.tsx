import React from 'react';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Expensess from './Expensess';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='expenses' element={<Expensess />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
