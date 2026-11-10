import { useState, useEffect } from 'react'

// Guarda en memoria las fotos ya consultadas para no repetir peticiones
const cache = new Map()

// Busca la foto del jugador en la API pública de Wikipedia.
// Si no encuentra nada, usa la imagen del JSON (fallback).
export default function useFotoJugador(titulo, fallback, ancho = 330) {
  const [base, setBase] = useState(cache.get(titulo) ?? null)

  useEffect(() => {
    if (!titulo || cache.has(titulo)) return
    let cancelado = false
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const url = j?.thumbnail?.source ?? null
        cache.set(titulo, url)
        if (!cancelado) setBase(url)
      })
      .catch(() => {})
    return () => { cancelado = true }
  }, [titulo])

  if (!base) return fallback
  return base.replace(/\/\d+px-/, `/${ancho}px-`)
}
