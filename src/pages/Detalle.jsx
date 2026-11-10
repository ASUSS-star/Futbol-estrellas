import { useParams, Link, useNavigate } from 'react-router-dom'
import { Cargando, ErrorMsg } from '../components/Estado'
import useFotoJugador from '../hooks/useFotoJugador'
import { calcularEdad } from '../utils/edad'

function Ficha({ j, anterior, siguiente }) {
  const navigate = useNavigate()
  const foto = useFotoJugador(j.wikipedia, j.imagen, 500)

  return (
    <article className="ficha">
      <div className="ficha-foto">
        <div className="ficha-barra">
          <button className="icono" onClick={() => navigate('/')} title="Cerrar">✕</button>
          <button className="icono" disabled={!anterior} onClick={() => navigate(`/jugador/${anterior.id}`)} title="Anterior">←</button>
          <button className="icono" disabled={!siguiente} onClick={() => navigate(`/jugador/${siguiente.id}`)} title="Siguiente">→</button>
        </div>
        <div className="ficha-rank"><span>{j.ranking}</span><small>RANKING</small></div>
        <img src={foto} alt={j.nombre} onError={(e) => { e.currentTarget.src = j.imagen }} />
        <h1 className="ficha-nombre">{j.nombre}</h1>
      </div>

      <div className="ficha-datos">
        <dl>
          <div><dt>EQUIPO:</dt><dd>{j.equipo}</dd></div>
          <div><dt>LIGA:</dt><dd>{j.liga}</dd></div>
          <div><dt>NACIONALIDAD:</dt><dd><img className="bandera" src={`https://flagcdn.com/w40/${j.banderaCodigo}.png`} alt="" /> {j.pais}</dd></div>
          <div><dt>EDAD:</dt><dd>{calcularEdad(j.fechaNacimiento)} AÑOS</dd></div>
          <div><dt>POSICIÓN:</dt><dd>{j.posicion}</dd></div>
        </dl>
        <Link to="/" className="btn btn-rojo">← Volver al top</Link>
      </div>

      <div className="ficha-texto">
        <h2>{j.nombre}</h2>
        <p>{j.descripcion}</p>
      </div>
    </article>
  )
}

export default function Detalle({ jugadores, loading, error }) {
  const { id } = useParams() // parámetro dinámico

  if (loading) return <Cargando />
  if (error) return <ErrorMsg texto={error} />

  const i = jugadores.findIndex((x) => String(x.id) === id)
  if (i === -1) return <ErrorMsg texto="Ese jugador no existe." />

  return <Ficha j={jugadores[i]} anterior={jugadores[i - 1]} siguiente={jugadores[i + 1]} />
}
