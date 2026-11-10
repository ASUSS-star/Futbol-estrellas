import { useState, useEffect } from 'react'

// Custom Hook: encapsula la lógica de consumo de la API
export default function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false
    setLoading(true)
    setError(null)
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error ' + res.status)
        return res.json()
      })
      .then((json) => { if (!cancelado) setData(json) })
      .catch(() => { if (!cancelado) setError('No se pudo cargar la información. Intenta de nuevo más tarde.') })
      .finally(() => { if (!cancelado) setLoading(false) })
    return () => { cancelado = true }
  }, [url])

  return { data, loading, error }
}
