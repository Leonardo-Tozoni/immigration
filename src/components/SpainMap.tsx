import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { Layer, Map as LeafletMap, Path } from 'leaflet'
import type { Feature, FeatureCollection, MultiPolygon } from 'geojson'
import 'leaflet/dist/leaflet.css'
import boundaries from '../data/spainRegions.geo.json'
import { IT_RATINGS, REGIONS, itCitiesRanked } from '../data/spainPlaces'
import type { City, Region } from '../data/spainPlaces'
import styles from './SpainMap.module.css'

type RegionFeature = Feature<MultiPolygon, { code: string }>

const REGION_COLLECTION = boundaries as unknown as FeatureCollection<MultiPolygon, { code: string }>
const SPAIN_BOUNDS: L.LatLngBoundsExpression = [[27.5, -18.5], [44, 4.5]]

const COLORS = { low: '#2e7d32', mid: '#f9a825', high: '#c62828' }

export function unemploymentColor(rate: number) {
  if (rate < 8.5) return COLORS.low
  if (rate < 12) return COLORS.mid
  return COLORS.high
}

function regionByCode(code: string) {
  return REGIONS.find((region) => region.code === code)
}

export type MapMode = 'desemprego' | 'ti'

const NEUTRAL_REGION = '#9e9e9e'

interface SpainMapProps {
  mode: MapMode
  region: Region | null
  city: City | null
  onSelectRegion: (region: Region) => void
  onSelectCity: (city: City) => void
}

export default function SpainMap({ mode, region, city, onSelectRegion, onSelectCity }: SpainMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const regionLayersRef = useRef(new Map<string, L.Layer & Path & { getBounds: () => L.LatLngBounds }>())
  const markersRef = useRef<L.LayerGroup | null>(null)
  const handlersRef = useRef({ onSelectRegion, onSelectCity })

  useEffect(() => {
    handlersRef.current = { onSelectRegion, onSelectCity }
  })

  useEffect(() => {
    if (!containerRef.current) return
    const regionLayers = regionLayersRef.current

    const map = L.map(containerRef.current, { zoomSnap: 0.25 })
    map.fitBounds(SPAIN_BOUNDS)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    L.geoJSON(REGION_COLLECTION, {
      style: (feature) => ({
        color: '#ffffff',
        weight: 1,
        fillColor: unemploymentColor(regionByCode((feature as RegionFeature).properties.code)?.unemployment ?? 0),
        fillOpacity: 0.45,
      }),
      onEachFeature: (feature: RegionFeature, layer: Layer) => {
        const code = feature.properties.code
        const target = regionByCode(code)
        if (!target) return
        regionLayers.set(code, layer as L.Layer & Path & { getBounds: () => L.LatLngBounds })
        layer.bindTooltip(`${target.name}: ${target.unemployment.toLocaleString('pt-BR')}%`, { sticky: true })
        layer.on('click', () => handlersRef.current.onSelectRegion(target))
      },
    }).addTo(map)

    markersRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = null
      regionLayers.clear()
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const markers = markersRef.current
    if (!map || !markers) return

    regionLayersRef.current.forEach((layer, code) => {
      const selected = code === region?.code
      layer.setStyle({
        color: selected ? '#1a1a1a' : '#ffffff',
        weight: selected ? 2 : 1,
        fillColor: mode === 'ti' ? NEUTRAL_REGION : unemploymentColor(regionByCode(code)?.unemployment ?? 0),
        fillOpacity: !region || selected ? 0.45 : 0.15,
      })
    })

    markers.clearLayers()
    const visibleCities = region?.cities ?? (mode === 'ti' ? itCitiesRanked() : [])
    visibleCities.forEach((item) => {
      const selected = item.id === city?.id
      const ratingColor = mode === 'ti' && item.itRating ? IT_RATINGS[item.itRating].color : '#c60b1e'
      L.circleMarker([item.lat, item.lng], {
        radius: selected ? 12 : 9,
        color: '#ffffff',
        weight: 2,
        fillColor: selected ? '#1a1a1a' : ratingColor,
        fillOpacity: 1,
      })
        .bindTooltip(item.name, { direction: 'top', permanent: Boolean(region), offset: [0, -8] })
        .on('click', () => handlersRef.current.onSelectCity(item))
        .addTo(markers)
    })

    if (city) {
      map.flyTo([city.lat, city.lng], 11, { duration: 0.6 })
    } else if (region) {
      const layer = regionLayersRef.current.get(region.code)
      if (layer) map.flyToBounds(layer.getBounds(), { duration: 0.6, padding: [20, 20], maxZoom: 11 })
    } else {
      map.flyToBounds(SPAIN_BOUNDS, { duration: 0.6 })
    }
  }, [mode, region, city])

  return <div ref={containerRef} className={styles.map} role="application" aria-label="Mapa da Espanha" />
}
