import { useParams, useNavigate } from 'react-router-dom'
import { Cargando, ErrorMsg } from '../components/Estado'
import useFotoJugador from '../hooks/useFotoJugador'
import { calcularEdad } from '../utils/edad'

function Ficha({ j, anterior, siguiente }) {
  const navigate = useNavigate()
  const foto = useFotoJugador(j.wikipedia, j.imagen, 500)
  const posicion = j.posicion.toLowerCase()
  const x = posicion.includes('extremo') ? 80 : 50
  const y = posicion.includes('portero')
    ? 90
    : posicion.includes('defensa')
      ? 72
      : posicion.includes('mediocampista')
        ? 50
        : 24

  return (
    <article className="ficha">
      <aside className="ficha-lateral" aria-label="Controles y posición en el ranking">
        <div className="ficha-barra">
          <button className="icono" onClick={() => navigate('/')} title="Cerrar" aria-label="Cerrar ficha">✕</button>
          <button className="icono" disabled={!anterior} onClick={() => navigate(`/jugador/${anterior.id}`)} title="Anterior" aria-label="Jugador anterior">←</button>
          <button className="icono" disabled={!siguiente} onClick={() => navigate(`/jugador/${siguiente.id}`)} title="Siguiente" aria-label="Jugador siguiente">→</button>
        </div>
        <div className="ficha-rank">
          <span>{j.ranking}</span>
          <small>RANKING</small>
        </div>
        <div className="ficha-lateral-pie">
          <span>TOP</span>
          <strong>JUGADORES</strong>
        </div>
      </aside>

      <div className="ficha-foto">
        <img src={foto} alt={j.nombre} onError={(e) => { e.currentTarget.src = j.imagen }} />
        <h1 className="ficha-nombre">{j.nombre}</h1>
      </div>

      <div className="ficha-datos">
        <dl>
          <div>
            <dt>EQUIPO:</dt>
            <dd><span className="ficha-sigla">{j.siglaEquipo}</span>{j.equipo}</dd>
          </div>
          <div>
            <dt>LIGA:</dt>
            <dd><span className="ficha-liga-icono" aria-hidden="true">L</span>{j.liga}</dd>
          </div>
          <div>
            <dt>NACIONALIDAD:</dt>
            <dd><img className="bandera" src={`https://flagcdn.com/w40/${j.banderaCodigo}.png`} alt="" />{j.pais}</dd>
          </div>
          <div>
            <dt>EDAD:</dt>
            <dd><span className="ficha-dato-icono" aria-hidden="true">⌛</span>{calcularEdad(j.fechaNacimiento)} AÑOS</dd>
          </div>
          <div>
            <dt>POSICIÓN:</dt>
            <dd><span className="ficha-dato-icono" aria-hidden="true">●</span>{j.posicion}</dd>
          </div>
        </dl>
        <svg className="ficha-campo" viewBox="0 0 300 180" role="img" aria-label={`Posición de ${j.nombre} en el campo`}>
          <rect x="1" y="1" width="298" height="178" />
          <line x1="150" y1="1" x2="150" y2="179" />
          <circle cx="150" cy="90" r="25" />
          <circle cx="150" cy="90" r="2" className="ficha-campo-punto" />
          <rect x="1" y="42" width="42" height="96" />
          <rect x="1" y="63" width="18" height="54" />
          <rect x="257" y="42" width="42" height="96" />
          <rect x="281" y="63" width="18" height="54" />
          <circle cx={x * 3} cy={y * 1.8} r="7" className="ficha-campo-jugador" />
        </svg>
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
