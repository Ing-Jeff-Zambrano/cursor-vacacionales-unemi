function Footer() {
  return (
    <footer id="contacto" className="footer-unemi pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <h2 className="h5 fw-bold text-unemi">Cursos Vacacionales de UNEMI</h2>
            <p className="mb-0 text-muted">
              Formación práctica durante vacaciones. Universidad Estatal de
              Milagro.
            </p>
          </div>
          <div className="col-md-3">
            <h3 className="h6 text-uppercase text-unemi">Enlaces</h3>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#servicios">Cursos</a>
              </li>
              <li>
                <a href="#inscripcion">Inscripción</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="h6 text-uppercase text-unemi">Contacto</h3>
            <p className="mb-1 text-muted">Milagro, Ecuador</p>
            <p className="mb-1">
              <a href="https://www.unemi.edu.ec" target="_blank" rel="noreferrer">
                www.unemi.edu.ec
              </a>
            </p>
            <p className="mb-0 text-muted">cursos.vacacionales@unemi.edu.ec</p>
          </div>
        </div>
        <hr className="my-4 opacity-25" />
        <p className="small text-center mb-0 text-muted">
          Copyright © {new Date().getFullYear()} e-campus by UNEMI. Todos los
          derechos reservados. — Cursos Vacacionales (proyecto académico React
          + Bootstrap).
        </p>
      </div>
    </footer>
  )
}

export default Footer
