
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'

function App() {

  return (
    <Router>
      <Nav />
   <Routes>
          <Route  path="/home" element={<Home />}>
          </Route>
          <Route path="/office"  element={<Office />}>
          </Route>
          <Route path="/forms" element={<Forms />}>
          </Route>
          <Route path="*">
          </Route>
        </Routes>
  </Router>
  )
}

export default App
