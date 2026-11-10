import { useNavigate } from 'react-router-dom'
import useFotoJugador from '../hooks/useFotoJugador'

export default function Tarjeta({ jugador }) {
  const navigate = useNavigate() // navegación programática
  const foto = useFotoJugador(jugador.wikipedia, jugador.imagen, 330)

  return (
    <article className="escudo" onClick={() => navigate(`/jugador/${jugador.id}`)}>
      <div className="escudo-rank">{jugador.ranking}</div>
      <div className="escudo-forma">
        <div className="escudo-top">
          <span>{jugador.siglaEquipo}</span>
          <img
            className="bandera"
            src={`https://flagcdn.com/w40/${jugador.banderaCodigo}.png`}
            alt={jugador.pais}
          />
        </div>
        <h3 className="escudo-nombre">{jugador.nombre}</h3>
        <div className="escudo-foto">
          <img
            src={foto}
            alt={jugador.nombre}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = jugador.imagen }}
          />
        </div>
      </div>
      <button className="btn btn-tarjeta">Ver más</button>
    </article>
  )
}
