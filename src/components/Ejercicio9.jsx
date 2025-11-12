import { useEffect, useState } from 'react'

const Ejercicio9 = () => {
  
  const [tareas, setTareas] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('listaTareas')) || []
    }
    return []
  })

  const [texto, setTexto] = useState('')

  useEffect(() => {
    localStorage.setItem('listaTareas', JSON.stringify(tareas))
  }, [tareas])

  const agregarTarea = (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    setTareas([...tareas, { text: texto, completed: false }])
    setTexto('')
  }

  const actualizarTarea = (index) => {
    setTareas(tareas.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    ));
  };


  const limpiarTareas = () => {
    setTareas(tareas.filter(t => !t.completed))
  }

  return (
    <div>
      <h3>Lista de Tareas con LocalStorage</h3>
      <h5>Introduce una tarea:</h5>
      <form onSubmit={agregarTarea}>
        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)}/>
        <button type='submit'>Agregar tarea</button>
      </form>
      <ul className='listaSinPuntos'>
        {tareas.map((tarea, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={() => actualizarTarea(index)}
              />
              {tarea.text}
            </li>
          )})}
      </ul>
      <button onClick={limpiarTareas}>Limpiar tareas completadas</button>
    </div>
  )
}

export default Ejercicio9
