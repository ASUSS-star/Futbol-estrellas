import { useNavigate } from 'react-router-dom'

export default function Tarjeta({ jugador }) {
  const navigate = useNavigate() // navegación programática
  return (
    <article className="tarjeta">
      <img
        src={jugador.imagen}
        alt={jugador.nombre}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?size=400&name=?' }}
      />
      <div className="tarjeta-cuerpo">
        <h3>{jugador.nombre}</h3>
        <p className="etiqueta">{jugador.posicion} · {jugador.pais}</p>
        <button className="btn" onClick={() => navigate(`/jugador/${jugador.id}`)}>Ver más</button>
      </div>
    </article>
  )
}
