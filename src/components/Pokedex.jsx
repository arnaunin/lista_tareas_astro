import { useState } from 'react'
import usePokedex from '../hooks/usePokedex'
import Buscador from './Buscador'

const PokemonList = () => {

  const { pokedex, isLoading, addPokemon, toggleCapturado } = usePokedex()

  // Estado para controlar los pokemones introducidos manualmente
  const [texto, setTexto] = useState('')

  // Estado para el buscador de pokemones
  const [text, setText] = useState('')

  const [modalMsg, setModalMsg] = useState("")
  const [modalType, setModalType] = useState("")

  const showModal = (msg, type) => {
    setModalMsg(msg);
    setModalType(type);

    setTimeout(() => {
      setModalMsg("");
      setModalType("");
    }, 2500);
  }

  const pokedexFiltrada = pokedex.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(text.toLowerCase().trim())
  )

  const URL = 'https://pokeapi.co/api/v2/pokemon'

  const handleAddPokemon = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return

    const pokemon = texto.toLowerCase().trim()

    try {
      const res = await fetch(`${URL}/${pokemon}`)

      if (!res.ok) {
        showModal("Ese Pokémon no existe.", "error")
        return
      }

      const data = await res.json()
      const imageUrl = await data.sprites.other['official-artwork'].front_default

      if (!imageUrl) {
        showModal("Este Pokémon no tiene imagen oficial.", "error")
        return
      }

      if (!isLoading) await addPokemon(texto.toLowerCase(), imageUrl)
      showModal("¡Pokémon añadido con éxito!", "success")
      setTexto('')

    } catch (error) {
      showModal("Error al conectar con el servidor.", "error")
    }
  }

  return (
    <div className='flex flex-col items-center gap-8'>
      
      {modalMsg && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
        >
          <div
            className={`
              px-6 py-4 rounded-xl text-white text-lg font-semibold shadow-lg animate-fade
              ${modalType === "success" ? "bg-green-600" : "bg-red-600"}
            `}
          >
            {modalMsg}
          </div>
        </div>
      )}

      <h3 className='text-3xl font-bold text-center mt-4 mb-2 text-gray-700'>
        Lista de Pokemones
      </h3>

      <Buscador onSearch={setText} />

      <h5 className='text-2xl font-bold text-center mt-4 mb-2 text-gray-700'>
        Introduce un Pokémon:
      </h5>

      <form
        onSubmit={handleAddPokemon}
        className='pokemonesForm flex gap-2.5 flex-wrap items-center justify-center'
      >
        <input
          className='border border-gray-400 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400 outline-none'
          type='text'
          value={texto}
          placeholder='Agrega un Pokémon...'
          onChange={(e) => setTexto(e.target.value)}
        />

        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow-md transition'
        >
          Agregar Pokémon a la pokedex
        </button>
      </form>

      <div className=''>
        {!isLoading && pokedexFiltrada.length === 0 ? 
          (<p className="text-center text-xl text-red-600 mt-8 font-semibold">No se ha encontrado ningún Pokémon que coincida con la búsqueda.</p>) :
          (<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
            {pokedexFiltrada.map((pokemon) => (
                <li
                  key={pokemon.id}
                  onClick={() => toggleCapturado(pokemon.id)}
                  className={`
                    cursor-pointer shadow-md rounded-2xl p-4 flex flex-col items-center
                    transition-transform transform hover:scale-105 hover:shadow-xl
                    ${
                      pokemon.capturado
                        ? 'bg-green-300 hover:bg-green-400'
                        : 'bg-white hover:bg-gray-100'
                    }
                  `}
                >
                  <img
                    src={pokemon.image_url}
                    alt={pokemon.nombre}
                    className='w-24 h-24 md:w-32 md:h-32 object-contain mb-2'
                  />

                  <p className='text-center font-semibold text-gray-800'>
                    {pokemon.nombre}
                  </p>
                </li>
              ))}
          </ul>)
        }
      </div>
    </div>
  )
}

export default PokemonList