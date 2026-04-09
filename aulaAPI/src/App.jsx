import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'

function App(){
  return(
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pokemon">Pokémon</Link>
      </nav>

      <hr/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pokemon" element={<Pokemon/>}/>
      </Routes>
    </div>
  )
}

export default App