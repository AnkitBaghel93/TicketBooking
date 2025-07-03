import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // your styles
import { AuthProvider } from './context/AuthContext'; // if you have auth
import { ThemeProvider } from './context/ThemeContext';


// console.log("✅ ThemeProvider is:", ThemeProvider); 


// console.log("AuthProvider is:", AuthProvider);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <ThemeProvider>
     
    <AuthProvider>
       {/* <h1>Testing Root</h1> */}
      <App />
    </AuthProvider>
  </ThemeProvider>
</React.StrictMode>

);
