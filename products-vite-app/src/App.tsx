

import { useState } from 'react';
import './App.css'
import InfiniteScrollListView from './components/InfiniteScrollListView'

function App() {

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <div className="container">
      <h1 className="title">Products - Infinite Scrolling</h1>
      <button onClick={toggleTheme} className="toggle-btn">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
        
        <InfiniteScrollListView />
      </div>
    </>
  )
}

export default App
