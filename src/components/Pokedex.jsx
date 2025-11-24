import { useState } from 'react'
import usePokemon from '../hooks/usePokemon'
import usePokedex from '../hooks/usePokedex';

const PokemonList = () => {

  const { pokemones: firstGen, loading } = usePokemon("https://kanto-api.vercel.app/pokemon")
  
  const {
    pokedex,
    isLoading,
    error,
    addPokemon,
    toggleCapturado,
    deletePokemon,
    addManyPokemons,
    deleteAllPokemon
  } = usePokedex()

  const [texto, setTexto] = useState('')

  const hadleAddPokemon = (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    if (!isLoading) addPokemon(texto.toLocaleLowerCase())
    setTexto("")
  }

  const handleAddFirstGen = (e) => {
    e.preventDefault()
    if (!loading) addManyPokemons(firstGen);
  }

  return (
    <div className='gestorPokemones'>
      <h3>Lista de Pokemones</h3>
      <form onSubmit={handleAddFirstGen}>
        <button type='submit'>Agregar primera generación</button>
      </form>
      <h5>Introduce un Pokemon:</h5>
      <form onSubmit={hadleAddPokemon} className='pokemonesForm'>
        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)}/>
        <button type='submit'>Agregar pokemon a la pokedex</button>
      </form>
      <button className='deleteAllButton' onClick={() => deleteAllPokemon()}>Vaciar Pokedex</button>
      <ul className='listaSinPuntos'>
        {pokedex.map((pokemon) => {
          return (
            <li key={pokemon.id} >
              <input
                type="checkbox"
                checked={pokemon.capturado}
                onChange={() => toggleCapturado(pokemon.id)}
              />
              {pokemon.nombre}
            </li>
          )})}
      </ul>
    </div>
  )
}

export default PokemonList