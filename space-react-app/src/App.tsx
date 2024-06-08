
import {BrowserRouter, Route,  Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'
import Home from './components/Home'
import Forms from './components/Forms'
import Office from './components/Office'
import { Provider } from 'react-redux'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="App">
      <div className="Content">
   <Routes>
          <Route  path="/home" element={<Home />}>
          </Route>
          <Route path="/office"  element={<Office />}>
          </Route>
          <Route path="/forms" element={<Forms />}>
          </Route>
          <Route path="*" element={<Home />}>
          </Route>
        </Routes>
        </div>
        </div>
  </BrowserRouter>
  )
}

export default App
