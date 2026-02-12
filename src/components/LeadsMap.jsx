import { useState, memo, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { RotateCcw } from 'lucide-react';
import { formatCurrency, leadsMapData } from '../data/mockData';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const VIOLET = '#7c3aed';
const VIOLET_GLOW = 'rgba(124, 58, 237, 0.25)';

const DEFAULT_CENTER = [50, 20];
const DEFAULT_ZOOM = 1;
const CITY_ZOOM = 4;

// ── Memoised geography layer (expensive to re-render) ───────────────
const MapGeographies = memo(function MapGeographies() {
  return (
    <Geographies geography={GEO_URL}>
      {({ geographies }) =>
        geographies.map((geo) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#F1F5F9"
            stroke="#CBD5E1"
            strokeWidth={0.5}
            style={{
              default: { outline: 'none' },
              hover:   { outline: 'none', fill: '#E2E8F0' },
              pressed: { outline: 'none' },
            }}
          />
        ))
      }
    </Geographies>
  );
});

// ── Single marker with glow + optional ping ─────────────────────────
function CityMarker({ city, isHovered, onEnter, onLeave, onClick }) {
  return (
    <Marker
      coordinates={city.coordinates}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Glow ring (all markers) */}
      <circle
        r={10}
        fill={VIOLET_GLOW}
        className="marker-glow-anim"
      />

      {/* Ping ring (Mumbai only) */}
      {city.highlight && (
        <circle
          r={6}
          fill="none"
          stroke={VIOLET}
          strokeWidth={1.5}
          className="marker-ping-anim"
        />
      )}

      {/* Core dot */}
      <circle
        r={isHovered ? 6 : 4}
        fill={VIOLET}
        stroke="#fff"
        strokeWidth={2}
        style={{ cursor: 'pointer', transition: 'r 150ms ease' }}
      />

      {/* Tooltip */}
      {isHovered && (
        <g>
          <rect
            x={-72}
            y={-48}
            width={144}
            height={36}
            rx={6}
            fill="#1e293b"
            stroke="#334155"
            strokeWidth={0.5}
            opacity={0.96}
          />
          <polygon
            points="-5,-12 5,-12 0,-6"
            fill="#1e293b"
          />
          <text
            textAnchor="middle"
            y={-31}
            fill="#f8fafc"
            fontSize={11}
            fontWeight={600}
            fontFamily="Inter, sans-serif"
          >
            {city.city} — {city.leads} Leads
          </text>
          <text
            textAnchor="middle"
            y={-18}
            fill="#94a3b8"
            fontSize={10}
            fontFamily="Inter, sans-serif"
          >
            {formatCurrency(city.value)}
          </text>
        </g>
      )}
    </Marker>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LEADS MAP (Global — Light Theme)
// ═══════════════════════════════════════════════════════════════════
export default function LeadsMap() {
  const [hovered, setHovered] = useState(null);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const totalLeads = leadsMapData.reduce((s, c) => s + c.leads, 0);
  const isZoomed = zoom !== DEFAULT_ZOOM;

  const handleCityClick = useCallback((coordinates) => {
    setCenter(coordinates);
    setZoom(CITY_ZOOM);
  }, []);

  const handleReset = useCallback(() => {
    setCenter(DEFAULT_CENTER);
    setZoom(DEFAULT_ZOOM);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-[340px] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[15px] font-semibold text-slate-800">Global Leads Map</h2>
        <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">
          {totalLeads} Total Leads
        </span>
      </div>

      {/* Reset Zoom button */}
      {isZoomed && (
        <button
          onClick={handleReset}
          className="absolute top-14 right-5 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
        >
          <RotateCcw size={12} />
          Reset Zoom
        </button>
      )}

      {/* Map */}
      <div className="flex-1 min-h-0 rounded-lg overflow-hidden bg-slate-50/50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [50, 20] }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            center={center}
            zoom={zoom}
            onMoveEnd={({ coordinates, zoom: z }) => {
              setCenter(coordinates);
              setZoom(z);
            }}
            translateExtent={[[-200, -100], [1200, 600]]}
          >
            <MapGeographies />

            {leadsMapData.map((city) => (
              <CityMarker
                key={city.city}
                city={city}
                isHovered={hovered === city.city}
                onEnter={() => setHovered(city.city)}
                onLeave={() => setHovered(null)}
                onClick={() => handleCityClick(city.coordinates)}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
