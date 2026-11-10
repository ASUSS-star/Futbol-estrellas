import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <section className="mensaje">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn">Ir al inicio</Link>
    </section>
  )
}
