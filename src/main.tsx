import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './pages/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ClerkWithRouter } from './features/auth/ClerkWithRouter.tsx';
import { queryClient } from './shared/config/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkWithRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ClerkWithRouter>
    </BrowserRouter>
  </StrictMode>,
);
