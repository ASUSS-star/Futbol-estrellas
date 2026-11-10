export function Cargando() {
  return (
    <div className="mensaje">
      <div className="spinner" />
      <p>Cargando jugadores...</p>
    </div>
  )
}

export function ErrorMsg({ texto }) {
  return <div className="mensaje error">⚠️ {texto}</div>
}
