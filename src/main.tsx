import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.tsx';
import ResearchPage from './pages/Research.tsx';
import ProjectPage from './pages/Project.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import root from 'react-shadow';
// import indexStyles from './index.css?inline';
import './index.css';

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.VITE_MSW_ENABLED !== 'true') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/project-library" element={<App />} />
            <Route path="research/:researchId" element={<ResearchPage />} />
            <Route path="projects/:projectId" element={<ProjectPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
