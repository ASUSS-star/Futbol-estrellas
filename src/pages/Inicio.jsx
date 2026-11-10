import { useState } from 'react'
import ListaJugadores from '../components/ListaJugadores'
import { Cargando, ErrorMsg } from '../components/Estado'

const JUGADORES_POR_PAGINA = 8

export default function Inicio({ jugadores, loading, error }) {
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)

  if (loading) return <Cargando />
  if (error) return <ErrorMsg texto={error} />

  const filtrados = jugadores.filter((j) =>
    (j.nombre + ' ' + j.pais + ' ' + j.equipo + ' ' + j.liga).toLowerCase().includes(busqueda.toLowerCase())
  )
  const totalPaginas = Math.ceil(filtrados.length / JUGADORES_POR_PAGINA)
  const paginaActual = Math.min(pagina, Math.max(totalPaginas, 1))
  const inicio = (paginaActual - 1) * JUGADORES_POR_PAGINA
  const visibles = filtrados.slice(inicio, inicio + JUGADORES_POR_PAGINA)

  function cambiarPagina(nuevaPagina) {
    setPagina(nuevaPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="titulo-barra"><h1>Top {jugadores.length} jugadores 2025-26</h1></div>
      <section className="introduccion-ranking" aria-label="Acerca del ranking">
        <h2>Las estrellas del fútbol mundial</h2>
        <p>
          Descubre a los jugadores que destacan por su talento, rendimiento y huella en el fútbol.
          Explora sus equipos, ligas y perfiles, o busca por nombre, país y club.
        </p>
      </section>
      <input
        className="buscador"
        type="search"
        placeholder="Buscar por nombre, país, equipo o liga..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value)
          setPagina(1)
        }}
      />
      <ListaJugadores jugadores={visibles} />
      {totalPaginas > 1 && (
        <nav className="paginacion" aria-label="Páginas del ranking">
          <div className="paginacion-grupo">
            {paginaActual > 1 && (
              <>
                <button className="btn btn-secundario" onClick={() => cambiarPagina(1)}>
                  Volver al inicio
                </button>
                <button className="btn" onClick={() => cambiarPagina(paginaActual - 1)}>
                  ← Anterior
                </button>
              </>
            )}
          </div>
          <span className="paginacion-estado" aria-live="polite">
            {inicio + 1}–{Math.min(inicio + JUGADORES_POR_PAGINA, filtrados.length)} de {filtrados.length}
            {' · '}Página {paginaActual} de {totalPaginas}
          </span>
          <div className="paginacion-grupo">
            {paginaActual < totalPaginas && (
              <button className="btn btn-rojo" onClick={() => cambiarPagina(paginaActual + 1)}>
                Siguiente →
              </button>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
