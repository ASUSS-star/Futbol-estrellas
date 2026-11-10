import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo">⚽ Estrellas del Fútbol</NavLink>
        <nav className="menu">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/acerca">Acerca de</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </div>
    </header>
  )
}
