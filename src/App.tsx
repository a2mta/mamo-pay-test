import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Expensess from './pages/Expensess';
import { Route, Routes } from 'react-router-dom';
import Payments from './Payments';
import SucessPayment from './pages/SucessPayment';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/sucess-payment' element={<SucessPayment />} />
        <Route path='/expenses' element={<Expensess />} />
        <Route path='/' element={<Payments />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
