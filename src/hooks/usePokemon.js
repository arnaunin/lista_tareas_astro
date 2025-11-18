import { setErrorMap } from 'astro:schema'
import { useState, useEffect } from 'react'

const usePokemon = (url) => {
    const [pokemones, setPokemones] = useState([])
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null)


    useEffect(() => {
        setLoading(true)
        fetch(url, { cache: 'no-store' })
            .then((response) => response.json())
            .then((pokemones) => setPokemones(pokemones))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [url])

    return { pokemones, loading, error }
}

export default usePokemon