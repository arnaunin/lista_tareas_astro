const BASE_URL = 'https://kanto-api.vercel.app/images'

export const getImages = async () => {
    try {
        const res = await fetch(BASE_URL)
        if (!res.ok) throw new Error("Error getting images")
        return await res.json()
    } catch (error) {
        console.log("API ERROR getImages: ", error)
        throw error
    }
}