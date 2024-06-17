import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Recipes from './components/Recipes.tsx'
import Recipe from './components/Recipe.tsx'
import Meals from './components/Meals.tsx'
import Favorites from './components/Favorites.tsx'
import Header from './components/Header.tsx'
import Footer from './components/static/Footer.tsx'
import NoMatch from './components/static/NoMatch.tsx'
import YourRecipes from './components/YourRecipes.tsx'
import { FavoriteProvider } from './context/FavoriteProvider.tsx'
import { DarkModeProvider } from './context/DarkModeProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeProvider>
    <Header />
    <FavoriteProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/meals' element={<Meals />}/>
          <Route path='/recipe' element={<Recipe />} />
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/your-recipes' element={<YourRecipes/>}/>
          <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
    </FavoriteProvider>
    <Footer />
    </DarkModeProvider>
  </React.StrictMode>,
)
