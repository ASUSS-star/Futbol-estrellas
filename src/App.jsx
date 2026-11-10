import { Routes, Route, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const esDetalle = pathname.startsWith('/jugador/')
  const estado = { jugadores: data, loading, error }

  return (
    <>
      {!esDetalle && <Navbar />}
      <main className={esDetalle ? 'contenedor contenedor-detalle' : 'contenedor'}>
        <Routes>
          <Route path="/" element={<Inicio {...estado} />} />
          <Route path="/jugador/:id" element={<Detalle {...estado} />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      {!esDetalle && <footer className="footer">© 2026 Top Jugadores · Proyecto Final React</footer>}
    </>
  )
}
