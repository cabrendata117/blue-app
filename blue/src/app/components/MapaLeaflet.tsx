"use client";
import { useEffect } from "react";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import { centros } from "../data/centros";
import { USTA, distanciaKm } from "../data/config";

// Puntos de color hechos con CSS (así no hay que descargar imágenes de pines)
const punto = (color: string, tam = 18) =>
L.divIcon({
    className: "",
    html: `<div style="width:${tam}px;height:${tam}px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 0 5px rgba(0,0,0,.5)"></div>`,
    iconSize: [tam, tam],
    iconAnchor: [tam / 2, tam / 2],
});

// Ajusta el zoom para que el círculo siempre quepa completo
function AjusteZoom({ radioKm }: { radioKm: number }) {
const map = useMap();
useEffect(() => {
    map.fitBounds(L.latLng(USTA.lat, USTA.lng).toBounds(radioKm * 2000), { padding: [20, 20] });
}, [map, radioKm]);
return null;
}

export default function MapaLeaflet({ radioKm, categoria }: { radioKm: number; categoria: string }) {
return (
    <MapContainer center={[USTA.lat, USTA.lng]} zoom={13} scrollWheelZoom={false} className="h-[480px] w-full rounded-2xl">
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <AjusteZoom radioKm={radioKm} />

      {/* Radio circular desde la universidad */}
      <Circle center={[USTA.lat, USTA.lng]} radius={radioKm * 1000} pathOptions={{ color: "#1d4ed8", fillColor: "#3b82f6", fillOpacity: 0.12, weight: 2 }} />

    <Marker position={[USTA.lat, USTA.lng]} icon={punto("#0b1f5c", 26)}>
        <Popup><b>{USTA.nombre}</b><br />Punto de partida</Popup>
    </Marker>

    {centros
        .filter((c) => categoria === "todos" || c.categoria === categoria)
        .map((c) => {
        const d = distanciaKm(c.lat, c.lng);
        const dentro = d <= radioKm;
        const color = !dentro ? "#9ca3af" : c.categoria === "acopio" ? "#2563eb" : "#f97316";
        return (
            <Marker key={c.id} position={[c.lat, c.lng]} icon={punto(color)}>
            <Popup>
                <b>{c.nombre_organizacion}</b><br />
                {c.categoria === "acopio" ? "Centro de acopio" : "Transformador"} · {d.toFixed(1)} km<br />
                <Link href={`/centros/${c.id}`} style={{ color: "#1d4ed8", fontWeight: 600 }}>Ver detalle</Link>
            </Popup>
            </Marker>
        );
        })}
    </MapContainer>
);
}