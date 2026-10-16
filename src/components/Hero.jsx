function Hero() {
  return (
    <header id="inicio" className="hero-section d-flex align-items-center">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-8 col-xl-7">
            <span className="badge hero-badge mb-3 px-3 py-2">
              Inscripciones abiertas 2026
            </span>
            <h1 className="display-4 fw-bold mb-3">
              Cursos Vacacionales de UNEMI
            </h1>
            <p className="lead mb-4 opacity-90">
              Aprende programación, redes y herramientas digitales durante tus
              vacaciones. Reserva tu cupo prioritario en modalidad presencial o
              virtual.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <a href="#inscripcion" className="btn btn-unemi-orange btn-lg fw-semibold">
                Reservar cupo
              </a>
              <a href="#servicios" className="btn btn-outline-light btn-lg">
                Ver cursos
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
