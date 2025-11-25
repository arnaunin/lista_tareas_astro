import { useState, useEffect } from 'react'
import { 
  getPokedex,
  getPokemonById,
  createPokemon,
  updatePokemon,
  removePokemon,
 } from '../api/pokedex'

const usePokedex = () => {

  const [pokedex, setPokedex] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshPokedex = async () => {
    try {
      setIsLoading(true)
      const data = await getPokedex()
      setPokedex(data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshPokedex()
  }, [])

  const addPokemon = async (nombre) => {
    await createPokemon(nombre)
    await refreshPokedex()
  }

  const toggleCapturado = async (id) => {
    await updatePokemon(id)
    await refreshPokedex()
  }

  const deletePokemon = async (id) => {
    await removePokemon(id)
    await refreshPokedex()
  }

  /*
  const addManyPokemons = async (nombres) => {
    await createManyPokemons(nombres)
    await refreshPokedex()
  }

  const deleteAllPokemon = async () => {
    await removeAllPokemon()
    await refreshPokedex()
  }
  */

  return {
    pokedex,
    isLoading,
    addPokemon,
    toggleCapturado,
  }
}

export default usePokedex