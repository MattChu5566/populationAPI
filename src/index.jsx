import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Root from './components/Root';
import { ContextProvider } from './lib/Context';
import {
  Navbar, Background, RouteErrorPage, ResultLoader,
} from './components/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: ':year?/:county?/:district',
        element: <ResultLoader />,
        // loader: resultLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Navbar />
    <div className="bg-layout">
      <Background />
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
