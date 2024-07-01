import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Create from './pages/create/Create'
import Home from './pages/home/Home'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'

// styles
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/create" Component={Create} />
          <Route exact path="/recipes/:id" Component={Recipe} />
          <Route exact path="/search" Component={Search} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App