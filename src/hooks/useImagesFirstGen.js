import { useState, useEffect } from 'react';
import { getImages } from '../api/imagesFirstGen.js';

const useImagesFirstGen = () => {
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true)
                const data = await getImages()
                setImages(data)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [])

    return { images, isLoading, error }
}

export default useImagesFirstGen
