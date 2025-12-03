import { useState, useEffect } from 'react'
import { 
  getPokedex,
  getPokemonById,
  createPokemon,
  updatePokemon,
  removePokemon,
 } from '../api/pokedex.js'

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

  const addPokemon = async (nombre, imageUrl) => {
    await createPokemon(nombre, imageUrl)
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

  return {
    pokedex,
    isLoading,
    addPokemon,
    toggleCapturado,
  }
}

export default usePokedex