import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Detalle from './pages/Detalle'
import Acerca from './pages/Acerca'
import Contacto from './pages/Contacto'
import NoEncontrada from './pages/NoEncontrada'
import useFetch from './hooks/useFetch'
import { API_URL } from './config'

export default function App() {
  const { data, loading, error } = useFetch(API_URL)
  const estado = { jugadores: data, loading, error }

  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Inicio {...estado} />} />
          <Route path="/jugador/:id" element={<Detalle {...estado} />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <footer className="footer">© 2026 Estrellas del Fútbol · Proyecto Final React</footer>
    </>
  )
}
