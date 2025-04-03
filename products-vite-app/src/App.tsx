import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfiniteScrollListView from './components/InfiniteScrollListView'
import ProductDetailPage from './components/ProductDetailPage';
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  return (
    <Router> 
    <div className="container">
      <h1 className="title">{t("title")}</h1>
      <span>
      <button onClick={toggleTheme} className="toggle-btn">
      {t("toggleTheme", { theme: theme === "light" ? t("iDark") : t("iLight") })}
      </button>
      <button onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")} className="toggle-btn">
          {/*i18n.language === "en" ? */ t("language")}
        </button>
        </span>
      <Routes>
        <Route path="/" element={<InfiniteScrollListView />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  </Router>
 
  )
}

export default App
