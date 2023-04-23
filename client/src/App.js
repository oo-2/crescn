import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Home from './pages/Home';

import Footer from './components/Footer'

function App() {
  return (
    <section class="body-font min-h-screen flex flex-col">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
          <Footer/>
      </section>
  )
}
export default App;