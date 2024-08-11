import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Expensess from './pages/Expensess';
import Payments from './pages/Payments';
import { Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/expenses' element={<Expensess />} />
        <Route path='/' element={<Payments />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
