import { useState } from 'react'

const estadoInicial = {
  nombre: '',
  correo: '',
  telefono: '',
  edad: '',
  curso: '',
  modalidad: '',
  password: '',
  confirmar: '',
  terminos: false,
}

const cursos = [
  'HTML y CSS desde cero',
  'JavaScript Básico',
  'Programación en Python',
  'Bases de Datos con SQL',
  'Git y GitHub',
  'Fundamentos de Redes',
]

function validarCampo(nombre, valor, datos) {
  switch (nombre) {
    case 'nombre':
      if (!valor.trim()) return 'El nombre es obligatorio.'
      if (valor.trim().length < 3) return 'Debe tener al menos 3 caracteres.'
      return ''
    case 'correo':
      if (!valor.trim()) return 'El correo es obligatorio.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        return 'Ingresa un correo válido.'
      }
      return ''
    case 'telefono':
      if (!valor.trim()) return 'El teléfono es obligatorio.'
      if (!/^\d+$/.test(valor)) return 'Solo se permiten números.'
      if (valor.length !== 10) return 'Debe tener 10 dígitos.'
      return ''
    case 'edad': {
      if (valor === '') return 'La edad es obligatoria.'
      const edad = Number(valor)
      if (!Number.isInteger(edad)) return 'Ingresa un número entero.'
      if (edad < 16 || edad > 99) return 'Debe estar entre 16 y 99.'
      return ''
    }
    case 'curso':
      return valor === '' ? 'Debes seleccionar un curso.' : ''
    case 'modalidad':
      return valor === '' ? 'Selecciona una modalidad.' : ''
    case 'password':
      if (!valor) return 'La contraseña es obligatoria.'
      if (valor.length < 8) return 'Debe tener al menos 8 caracteres.'
      return ''
    case 'confirmar':
      if (!valor) return 'Confirma tu contraseña.'
      if (valor !== datos.password) return 'Las contraseñas no coinciden.'
      return ''
    case 'terminos':
      return valor ? '' : 'Debes aceptar los términos para continuar.'
    default: {
      const _exhaustive = nombre
      void _exhaustive
      return ''
    }
  }
}

function claseCampo(errores, tocados, nombre, valor) {
  if (!tocados[nombre]) return ''
  return errores[nombre] || valor === '' || valor === false
    ? 'is-invalid'
    : 'is-valid'
}

function Formulario() {
  const [datos, setDatos] = useState(estadoInicial)
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({})
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

  const actualizarCampo = (nombre, valor) => {
    const siguientes = { ...datos, [nombre]: valor }
    setDatos(siguientes)
    setMensaje({ tipo: '', texto: '' })

    if (tocados[nombre]) {
      setErrores((prev) => ({
        ...prev,
        [nombre]: validarCampo(nombre, valor, siguientes),
        ...(nombre === 'password' && tocados.confirmar
          ? {
              confirmar: validarCampo('confirmar', siguientes.confirmar, siguientes),
            }
          : {}),
      }))
    }
  }

  const manejarCambio = (evento) => {
    const { name, type, value, checked } = evento.target
    let valor = type === 'checkbox' ? checked : value

    if (name === 'telefono') {
      valor = String(valor).replace(/\D/g, '').slice(0, 10)
    }

    actualizarCampo(name, valor)
  }

  const manejarBlur = (evento) => {
    const { name } = evento.target
    const valor = datos[name]
    setTocados((prev) => ({ ...prev, [name]: true }))
    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, valor, datos),
    }))
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const campos = Object.keys(estadoInicial)
    const nuevosTocados = {}
    const nuevosErrores = {}
    let esValido = true

    campos.forEach((nombre) => {
      nuevosTocados[nombre] = true
      const mensajeError = validarCampo(nombre, datos[nombre], datos)
      nuevosErrores[nombre] = mensajeError
      if (mensajeError) esValido = false
    })

    setTocados(nuevosTocados)
    setErrores(nuevosErrores)

    if (!esValido) {
      setMensaje({
        tipo: 'danger',
        texto: 'Corrige los errores antes de enviar.',
      })
      return
    }

    const primerNombre = datos.nombre.trim().split(' ')[0]
    setMensaje({
      tipo: 'success',
      texto: `¡Listo, ${primerNombre}! Quedaste inscrito en "${datos.curso}" (${datos.modalidad}).`,
    })
    setDatos(estadoInicial)
    setErrores({})
    setTocados({})
  }

  return (
    <section id="inscripcion" className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div className="text-center mb-4">
              <h2 className="section-title fw-bold">Formulario de inscripción</h2>
              <p className="text-muted">
                Completa tus datos para reservar un cupo en los Cursos
                Vacacionales de UNEMI.
              </p>
            </div>

            <div className="card border-0 shadow">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={manejarEnvio} noValidate>
                  <h3 className="h5 text-unemi mb-3">1. Datos personales</h3>

                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre completo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${claseCampo(errores, tocados, 'nombre', datos.nombre)}`}
                      id="nombre"
                      name="nombre"
                      placeholder="Ej: Juan Pérez"
                      value={datos.nombre}
                      onChange={manejarCambio}
                      onBlur={manejarBlur}
                    />
                    {tocados.nombre && errores.nombre && (
                      <div className="invalid-feedback d-block">{errores.nombre}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                      Correo electrónico <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${claseCampo(errores, tocados, 'correo', datos.correo)}`}
                      id="correo"
                      name="correo"
                      placeholder="usuario@correo.com"
                      value={datos.correo}
                      onChange={manejarCambio}
                      onBlur={manejarBlur}
                    />
                    {tocados.correo && errores.correo && (
                      <div className="invalid-feedback d-block">{errores.correo}</div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-7 mb-3">
                      <label htmlFor="telefono" className="form-label">
                        Teléfono <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${claseCampo(errores, tocados, 'telefono', datos.telefono)}`}
                        id="telefono"
                        name="telefono"
                        placeholder="0991234567"
                        maxLength={10}
                        value={datos.telefono}
                        onChange={manejarCambio}
                        onBlur={manejarBlur}
                      />
                      {tocados.telefono && errores.telefono && (
                        <div className="invalid-feedback d-block">
                          {errores.telefono}
                        </div>
                      )}
                    </div>
                    <div className="col-md-5 mb-3">
                      <label htmlFor="edad" className="form-label">
                        Edad <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${claseCampo(errores, tocados, 'edad', datos.edad)}`}
                        id="edad"
                        name="edad"
                        placeholder="18"
                        min={16}
                        max={99}
                        value={datos.edad}
                        onChange={manejarCambio}
                        onBlur={manejarBlur}
                      />
                      {tocados.edad && errores.edad && (
                        <div className="invalid-feedback d-block">{errores.edad}</div>
                      )}
                    </div>
                  </div>

                  <h3 className="h5 text-unemi mb-3 mt-2">2. Detalles del curso</h3>

                  <div className="mb-3">
                    <label htmlFor="curso" className="form-label">
                      Curso disponible <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${claseCampo(errores, tocados, 'curso', datos.curso)}`}
                      id="curso"
                      name="curso"
                      value={datos.curso}
                      onChange={manejarCambio}
                      onBlur={manejarBlur}
                    >
                      <option value="">Selecciona un curso</option>
                      {cursos.map((curso) => (
                        <option key={curso} value={curso}>
                          {curso}
                        </option>
                      ))}
                    </select>
                    {tocados.curso && errores.curso && (
                      <div className="invalid-feedback d-block">{errores.curso}</div>
                    )}
                  </div>

                  <fieldset className="mb-3">
                    <legend className="form-label fs-6">
                      Modalidad de estudio <span className="text-danger">*</span>
                    </legend>
                    <div className="row g-2">
                      <div className="col-sm-6">
                        <div className="form-check border rounded-3 p-3 h-100">
                          <input
                            className="form-check-input ms-1"
                            type="radio"
                            name="modalidad"
                            id="modalidad-presencial"
                            value="Presencial"
                            checked={datos.modalidad === 'Presencial'}
                            onChange={manejarCambio}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="modalidad-presencial"
                          >
                            <strong>Presencial</strong>
                            <br />
                            <small className="text-muted">En campus</small>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-check border rounded-3 p-3 h-100">
                          <input
                            className="form-check-input ms-1"
                            type="radio"
                            name="modalidad"
                            id="modalidad-virtual"
                            value="Virtual"
                            checked={datos.modalidad === 'Virtual'}
                            onChange={manejarCambio}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="modalidad-virtual"
                          >
                            <strong>Virtual</strong>
                            <br />
                            <small className="text-muted">En vivo por Zoom</small>
                          </label>
                        </div>
                      </div>
                    </div>
                    {tocados.modalidad && errores.modalidad && (
                      <div className="invalid-feedback d-block">
                        {errores.modalidad}
                      </div>
                    )}
                  </fieldset>

                  <h3 className="h5 text-unemi mb-3 mt-2">3. Seguridad de la cuenta</h3>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={mostrarPassword ? 'text' : 'password'}
                        className={`form-control ${claseCampo(errores, tocados, 'password', datos.password)}`}
                        id="password"
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        value={datos.password}
                        onChange={manejarCambio}
                        onBlur={manejarBlur}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary password-toggle"
                        onClick={() => setMostrarPassword((prev) => !prev)}
                        aria-label="Mostrar u ocultar contraseña"
                      >
                        {mostrarPassword ? 'Ocultar' : 'Ver'}
                      </button>
                    </div>
                    {tocados.password && errores.password && (
                      <div className="invalid-feedback d-block">
                        {errores.password}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmar" className="form-label">
                      Confirmar contraseña <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={mostrarConfirmar ? 'text' : 'password'}
                        className={`form-control ${claseCampo(errores, tocados, 'confirmar', datos.confirmar)}`}
                        id="confirmar"
                        name="confirmar"
                        placeholder="Repite tu contraseña"
                        value={datos.confirmar}
                        onChange={manejarCambio}
                        onBlur={manejarBlur}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary password-toggle"
                        onClick={() => setMostrarConfirmar((prev) => !prev)}
                        aria-label="Mostrar u ocultar confirmación"
                      >
                        {mostrarConfirmar ? 'Ocultar' : 'Ver'}
                      </button>
                    </div>
                    {tocados.confirmar && errores.confirmar && (
                      <div className="invalid-feedback d-block">
                        {errores.confirmar}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 form-check">
                    <input
                      className={`form-check-input ${tocados.terminos ? (errores.terminos ? 'is-invalid' : 'is-valid') : ''}`}
                      type="checkbox"
                      id="terminos"
                      name="terminos"
                      checked={datos.terminos}
                      onChange={manejarCambio}
                    />
                    <label className="form-check-label" htmlFor="terminos">
                      Acepto los términos de servicio y las políticas de
                      privacidad.
                    </label>
                    {tocados.terminos && errores.terminos && (
                      <div className="invalid-feedback d-block">
                        {errores.terminos}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-unemi btn-lg w-100">
                    Inscribirme ahora
                  </button>

                  {mensaje.texto && (
                    <div
                      className={`alert alert-${mensaje.tipo} mt-3 mb-0`}
                      role="alert"
                    >
                      {mensaje.texto}
                    </div>
                  )}

                  <p className="small text-muted text-center mt-3 mb-0">
                    Tus datos se procesan únicamente en tu navegador.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Formulario
