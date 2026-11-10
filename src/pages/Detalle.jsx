import { useParams, Link } from 'react-router-dom'
import { Cargando, ErrorMsg } from '../components/Estado'

export default function Detalle({ jugadores, loading, error }) {
  const { id } = useParams() // parámetro dinámico

  if (loading) return <Cargando />
  if (error) return <ErrorMsg texto={error} />

  const j = jugadores.find((x) => String(x.id) === id)
  if (!j) return <ErrorMsg texto="Ese jugador no existe." />

  return (
    <article className="detalle">
      <img src={j.imagen} alt={j.nombre} />
      <div>
        <h1>{j.nombre}</h1>
        <p>{j.descripcion}</p>
        <ul className="datos">
          <li><strong>País:</strong> {j.pais}</li>
          <li><strong>Club:</strong> {j.club}</li>
          <li><strong>Posición:</strong> {j.posicion}</li>
          <li><strong>Nacimiento:</strong> {j.fechaNacimiento}</li>
          <li><strong>Balones de Oro:</strong> {j.balonesDeOro}</li>
        </ul>
        <Link to="/" className="btn">← Volver</Link>
      </div>
    </article>
  )
}
