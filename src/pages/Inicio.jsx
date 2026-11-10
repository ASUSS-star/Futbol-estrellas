import { useState } from 'react'
import ListaJugadores from '../components/ListaJugadores'
import { Cargando, ErrorMsg } from '../components/Estado'

export default function Inicio({ jugadores, loading, error }) {
  const [busqueda, setBusqueda] = useState('')

  if (loading) return <Cargando />
  if (error) return <ErrorMsg texto={error} />

  const filtrados = jugadores.filter((j) =>
    (j.nombre + ' ' + j.pais + ' ' + j.club).toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <h1>Los mejores jugadores del fútbol</h1>
      <input
        className="buscador"
        type="search"
        placeholder="Buscar por nombre, país o club..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ListaJugadores jugadores={filtrados} />
    </>
  )
}
