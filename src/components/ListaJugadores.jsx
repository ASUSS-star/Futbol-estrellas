import Tarjeta from './Tarjeta'

export default function ListaJugadores({ jugadores }) {
  if (jugadores.length === 0) return <p className="mensaje">No se encontraron jugadores.</p>
  return (
    <section className="grid">
      {jugadores.map((j) => <Tarjeta key={j.id} jugador={j} />)}
    </section>
  )
}
