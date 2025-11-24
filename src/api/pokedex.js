const BASE_POKEDEX_URL = "https://kanto-api.vercel.app/pokedex"
const BASE_POKEMON_URL = "https://kanto-api.vercel.app/pokemon"

export const getPokedex = async () => {
    try {
        const res = await fetch(BASE_POKEDEX_URL)
        if (!res.ok) throw new Error("Error fetching pokedex")
        return await res.json()
    } catch (error) {
        console.log("API ERROR getPokedex: ", error)
        throw error
    }
}

export const getPokemonById = async (id) => {
    try {
        const res = await fetch(`${BASE_POKEDEX_URL}/${id}`)
        if (!res.ok) throw new Error("Pokemon not found")
        return await res.json()
    } catch (error) {
        console.log("API ERROR getPokemonById: ", error)
        throw error
    }
}

export const createPokemon = async (nombre) => {
    try {
        const res = await fetch(BASE_POKEDEX_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre: nombre })
        })
        if (!res.ok) throw new Error("Failed to create")
        return await res.json()
    } catch (error) {
        console.log("API ERROR createPokemon: ", error)
        throw error
    }
}

export const updatePokemon = async (id) => {
    try {
        const res = await fetch(`${BASE_POKEDEX_URL}/${id}`, {
            method: "PUT",
        })
        if (!res.ok) throw new Error("Failed to update captured")
        return await res.json()
    } catch (error) {
        console.log("API ERROR toggleCaptured: ", error)
        throw error
    }
}

export const removePokemon = async (id) => {
    try {
        const res = await fetch(`${BASE_POKEDEX_URL}/${id}`, {
            method: "DELETE",
        })
        if (!res.ok) throw new Error("Error removing pokemon")
        return await res.json()
    } catch (error) {
        console.log("API ERROR removePokemon: ", error)
        throw error
    }
}

export const createManyPokemons = async (nombres) => {
    try {
        const res = await fetch(`${BASE_POKEMON_URL}/bulk`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombres })
        })
        if (!res.ok) throw new Error("Failed bulk create")
        return await res.json()
    } catch (error) {
        console.log("API ERROR createManyPokemons: ", error)
        throw error
    }
}

export const removeAllPokemon = async () => {
    try {
        const res = await fetch(`${BASE_POKEDEX_URL}/clear`, {
            method: "DELETE",
        })
        if (!res.ok) throw new Error("Error removing all pokemon")
        return await res.json()
    } catch (error) {
        console.log("API ERROR removeAllPokemon:", error)
        throw error
    }
}
