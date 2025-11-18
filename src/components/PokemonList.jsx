import { useEffect, useState } from 'react'
import usePokemon from '../hooks/usePokemon'

const PokemonList = () => {

  const { pokemones: primerosPokemones, loading, error } = usePokemon("http://localhost:3000/pokemon")
  
  const [pokemones, setPokemones] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('pokedex')) || []
    }
    return []
  })

  const [texto, setTexto] = useState('')

  useEffect(() => {
    localStorage.setItem('pokedex', JSON.stringify(pokemones))
  }, [pokemones])

  const agregarPokemon = (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    setPokemones([...pokemones, { nombre: texto, capturado: false }])
    setTexto('')
  }

  const actualizarPokemon = (index) => {
    setPokemones(pokemones.map((p, i) =>
      i === index ? { ...p, capturado: !p.capturado } : p
    ));
  };

  const limpiarPokemones = () => {
    setPokemones(pokemones.filter(p => !p.capturado))
  }

  const agregarPrimerosPokemones = (e) => {
    e.preventDefault()
    setPokemones([...pokemones, ...primerosPokemones.map((pokemon) => ({ nombre: pokemon, capturado: false }))])
  }
  
  return (
    <div className='gestorPokemones'>
      <h3>Lista de Pokemones</h3>
      <form onSubmit={agregarPrimerosPokemones}>
        <button type='submit'>Agregar pokemones primera generación</button>
      </form>
      <h5>Introduce un Pokemon:</h5>
      <form onSubmit={agregarPokemon} className='pokemonesForm'>
        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)}/>
        <button type='submit'>Agregar pokemon a la pokedex</button>
      </form>
      <ul className='listaSinPuntos'>
        {pokemones.map((pokemon, index) => {
          return (
            <li key={index} >
              <input
                type="checkbox"
                checked={pokemon.capturado}
                onChange={() => actualizarPokemon(index)}
              />
              {pokemon.nombre}
            </li>
          )})}
      </ul>
      <button onClick={limpiarPokemones}>Limpiar pokemones capturados</button>
    </div>
  )
}

export default PokemonList
