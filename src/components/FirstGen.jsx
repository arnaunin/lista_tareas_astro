import usePokedex from '../hooks/usePokedex'


const FirstGen = () => {
  const { pokedex, isLoading, error } = usePokedex()

  if (isLoading) return <p className="text-center mt-8 text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error al cargar imágenes</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 flex flex-col items-center">
      <h3 className='text-3xl md:text-4xl font-bold text-center mb-8 text-gray-700'>
        Pokemones Primera Generación
      </h3>

      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {pokedex.filter((poke) => poke.base === true).map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white cursor-pointer shadow-md rounded-2xl p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={pokemon.image_url}
              alt={pokemon.nombre}
              className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2"
            />
            <p className="text-center font-semibold text-gray-800">{pokemon.nombre}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FirstGen
