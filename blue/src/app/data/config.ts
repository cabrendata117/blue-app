// Logo de Blue. Archivo real: blue/public/logo_Blue.jpeg (se usa como imagen temporal en TODO)
export const LOGO = "/logo_Blue.jpeg";

// PUNTO DE PARTIDA del mapeo: Universidad Santo Tomás Bucaramanga.
// OJO: lat/lng son APROXIMADAS. Para afinarlas: en Google Maps clic derecho sobre la universidad ->
// clic en los números que aparecen arriba (se copian) -> pega aquí. Todas las distancias se recalculan solas.
export const USTA = {
  nombre: "Universidad Santo Tomás Bucaramanga",
  direccion: "Carrera 18 # 9-27, Bucaramanga",
  lat: 7.13682,
  lng: -73.12828,
};

// Distancia en línea recta (fórmula de Haversine) desde la USTA, en km
export const distanciaKm = (lat: number, lng: number) => {
  const R = 6371, rad = (g: number) => (g * Math.PI) / 180;
  const dLat = rad(lat - USTA.lat), dLng = rad(lng - USTA.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(USTA.lat)) * Math.cos(rad(lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

// Enlace de Google Maps a una dirección
export const mapa = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ", Santander, Colombia")}`;

// Ruta real (por calles) desde la USTA hasta el centro
export const rutaDesdeUSTA = (destino: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(USTA.direccion)}&destination=${encodeURIComponent(destino + ", Santander, Colombia")}`;