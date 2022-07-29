import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import CreatePage from './pages/create-page/CreatePage';
import EditPage from './pages/edit-page/EditPage';
import HeroPage from './pages/hero-page/HeroPage';
import Main from './pages/main-page/Main';
import { QueryClient, QueryClientProvider } from 'react-query'; 

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <div className="app">
      <Navbar/>
      <div className='wrapper'>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/hero/:id" element={<HeroPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
       
    </div>
    </QueryClientProvider>
  );
}

export default App;
