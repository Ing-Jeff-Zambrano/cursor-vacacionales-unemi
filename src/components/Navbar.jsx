function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-unemi sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">
          Cursos Vacacionales UNEMI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#servicios">
                Cursos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#inscripcion">
                Inscripción
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>
          <a className="btn btn-unemi-orange btn-sm ms-lg-3 fw-semibold" href="#inscripcion">
            Inscribirme
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
