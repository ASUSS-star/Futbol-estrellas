import { useState } from 'react'
import ListaJugadores from '../components/ListaJugadores'
import { Cargando, ErrorMsg } from '../components/Estado'

export default function Inicio({ jugadores, loading, error }) {
  const [busqueda, setBusqueda] = useState('')

  if (loading) return <Cargando />
  if (error) return <ErrorMsg texto={error} />

  const filtrados = jugadores.filter((j) =>
    (j.nombre + ' ' + j.pais + ' ' + j.equipo + ' ' + j.liga).toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <div className="titulo-barra"><h1>Top {jugadores.length} jugadores 2025-26</h1></div>
      <input
        className="buscador"
        type="search"
        placeholder="Buscar por nombre, país, equipo o liga..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ListaJugadores jugadores={filtrados} />
    </>
  )
}
