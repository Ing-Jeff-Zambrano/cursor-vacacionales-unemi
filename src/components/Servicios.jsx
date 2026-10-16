const servicios = [
  {
    icono: '01',
    titulo: 'HTML y CSS desde cero',
    descripcion:
      'Construye páginas web modernas con estructura semántica y estilos responsivos.',
  },
  {
    icono: '02',
    titulo: 'JavaScript Básico',
    descripcion:
      'Domina la lógica del navegador, eventos del DOM y validaciones interactivas.',
  },
  {
    icono: '03',
    titulo: 'Programación en Python',
    descripcion:
      'Inicia en el pensamiento computacional con ejercicios prácticos y guiados.',
  },
  {
    icono: '04',
    titulo: 'Bases de Datos con SQL',
    descripcion:
      'Aprende a consultar, filtrar y relacionar datos con lenguaje SQL.',
  },
  {
    icono: '05',
    titulo: 'Git y GitHub',
    descripcion:
      'Controla versiones de tus proyectos y colabora con repositorios remotos.',
  },
  {
    icono: '06',
    titulo: 'Fundamentos de Redes',
    descripcion:
      'Comprende modelos de red, protocolos y conceptos esenciales de conectividad.',
  },
]

function Servicios() {
  return (
    <section id="servicios" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">Información y servicios</h2>
          <p className="text-muted col-lg-8 mx-auto">
            Oferta vacacional de la Universidad Estatal de Milagro. Elige el
            curso que mejor se adapte a tu perfil y modalidad de estudio.
          </p>
        </div>

        <div className="row g-4">
          {servicios.map((servicio) => (
            <div className="col-md-6 col-lg-4" key={servicio.titulo}>
              <div className="card card-unemi h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="service-icon mb-3">{servicio.icono}</div>
                  <h3 className="h5 card-title text-unemi">{servicio.titulo}</h3>
                  <p className="card-text text-muted mb-0">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100">
              <h3 className="h6 text-unemi text-uppercase fw-bold">Modalidades</h3>
              <p className="mb-0 text-muted">
                Presencial en campus o virtual en vivo por Zoom.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100">
              <h3 className="h6 text-unemi text-uppercase fw-bold">Duración</h3>
              <p className="mb-0 text-muted">
                Bloques intensivos pensados para el período vacacional.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100">
              <h3 className="h6 text-unemi text-uppercase fw-bold">Certificación</h3>
              <p className="mb-0 text-muted">
                Constancia de participación al completar el curso inscrito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Servicios
