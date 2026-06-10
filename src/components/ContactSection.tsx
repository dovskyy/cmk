import { MapPin, Phone, Mail, Clock, ExternalLink, Star } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

// Set clinic coordinates (example coordinates for Warsaw)
const CLINIC_POSITION = { lat: 52.2297, lng: 21.0122 };

function RouteDisplay({ origin }: { origin: google.maps.LatLngLiteral | null }) {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routesLib || !map || !origin) return;

    // Clear previous route
    polylinesRef.current.forEach((p) => p.setMap(null));

    routesLib.Route.computeRoutes({
      origin,
      destination: CLINIC_POSITION,
      travelMode: "DRIVING",
      fields: ["path", "distanceMeters", "durationMillis", "viewport"],
    }).then(({ routes }) => {
      if (routes?.[0]) {
        const newPolylines = routes[0].createPolylines();
        // Give the polyline a nice primary color
        newPolylines.forEach((p) => {
          p.setOptions({ strokeColor: "#0F2C59", strokeWeight: 5 });
          p.setMap(map);
        });
        polylinesRef.current = newPolylines;
        if (routes[0].viewport) map.fitBounds(routes[0].viewport);
      }
    });

    return () => polylinesRef.current.forEach((p) => p.setMap(null));
  }, [routesLib, map, origin]);

  return null;
}

export function ContactSection() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Nie udało się pobrać lokalizacji. Upewnij się, że masz włączone usługi lokalizacyjne.");
        }
      );
    } else {
      alert("Twoja przeglądarka nie obsługuje geolokalizacji.");
    }
  };

  return (
    <section id="kontakt" className="w-full pt-20">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl text-primary font-bold mb-4 tracking-tight">Skontaktuj się z nami</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Jesteśmy tutaj, aby pomóc Ci w sprawach Twojego zdrowia. Zadzwoń do nas, napisz wiadomość lub po prostu nas odwiedź.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="bg-surface rounded-3xl shadow-soft border border-border p-8 sm:p-12">
            <h3 className="font-display text-3xl font-bold text-primary mb-8">Informacje kontaktowe</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-secondary/15 p-3 rounded-full text-secondary h-min">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Adres</h4>
                  <p className="text-muted-foreground">ul. Przykładowa 12/3<br />00-001 Warszawa</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary h-min">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Telefon</h4>
                  <p className="text-muted-foreground">+48 123 456 789<br />+48 987 654 321</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-secondary/15 p-3 rounded-full text-secondary h-min">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">E-mail</h4>
                  <p className="text-muted-foreground">kontakt@centrumkasprzaka.pl</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary h-min">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Godziny otwarcia</h4>
                  <p className="text-muted-foreground">Poniedziałek - Piątek: 08:00 - 20:00<br />Sobota: 09:00 - 14:00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <button 
                onClick={handleGetDirections}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-4 rounded-xl font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" /> Pokaż trasę dojazdu
              </button>
            </div>
          </div>

          {/* Map Area */}
          <div className="bg-surface rounded-3xl overflow-hidden shadow-soft border border-border h-[500px] lg:h-auto min-h-[500px] relative flex flex-col">
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={CLINIC_POSITION}
                defaultZoom={15}
                mapId="CLINIC_CONTACT_MAP"
                internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                style={{ width: "100%", height: "100%", flexGrow: 1 }}
                disableDefaultUI={true}
                zoomControl={true}
              >
                <AdvancedMarker position={CLINIC_POSITION} title="Centrum Medyczne Kasprzaka" />
                <RouteDisplay origin={userLocation} />
              </Map>
            </APIProvider>

            {!API_KEY && (
              <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex items-center justify-center p-8 text-center z-10">
                <div>
                  <h3 className="font-display font-bold text-xl text-primary mb-4">Wymagany klucz API Google Maps</h3>
                  <div className="text-left max-w-sm mx-auto text-sm text-foreground">
                    <p className="mb-2"><strong>Krok 1:</strong> Uzyskaj klucz <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener" className="text-secondary underline">tutaj</a>.</p>
                    <p className="mb-2"><strong>Krok 2:</strong> Skonfiguruj w AI Studio:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Otwórz <strong>Ustawienia</strong> (ikona koła zębatego w prawym górnym rogu)</li>
                      <li>Wybierz zakładkę <strong>Secrets</strong></li>
                      <li>Stwórz zmienną o nazwie <code>GOOGLE_MAPS_PLATFORM_KEY</code> i wprowadź klucz jako jej wartość</li>
                      <li>Wciśnij Enter</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-muted py-24 mt-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="font-display text-4xl text-primary font-bold mb-4 tracking-tight">Co mówią o nas pacjenci</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Opinie naszych pacjentów są dla nas najważniejszym potwierdzeniem jakości naszych usług.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Google Reviews */}
            <div className="bg-surface rounded-3xl p-8 sm:p-10 shadow-soft border border-border flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-3 shadow-md mb-6 relative z-10 border border-border/50">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h4 className="font-display font-bold text-2xl text-foreground mb-2">Opinie Google</h4>
              <div className="flex items-center gap-1 text-[#FBBC05] mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="font-bold text-xl text-primary mb-6">4.9/5 <span className="text-sm font-normal text-muted-foreground">(ponad 300 opinii)</span></p>
              
              <a href="#" className="mt-auto flex items-center justify-center gap-2 text-primary font-bold hover:text-secondary transition-colors w-full border border-border py-4 rounded-xl bg-background/50 hover:bg-background">
                Zobacz wszystkie opinie <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* ZnanyLekarz Reviews */}
            <div className="bg-surface rounded-3xl p-8 sm:p-10 shadow-soft border border-border flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#00A38D] text-white font-bold text-2xl rounded-full flex items-center justify-center shadow-md mb-6 relative z-10">
                ZL
              </div>
              <h4 className="font-display font-bold text-2xl text-foreground mb-2">ZnanyLekarz.pl</h4>
              <div className="flex items-center gap-1 text-[#00A38D] mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="font-bold text-xl text-primary mb-6">5.0/5 <span className="text-sm font-normal text-muted-foreground">(140 opinii)</span></p>
              
              <a href="#" className="mt-auto flex items-center justify-center gap-2 text-primary font-bold hover:text-[#00A38D] transition-colors w-full border border-border py-4 rounded-xl bg-background/50 hover:bg-background">
                Sprawdź na ZnanyLekarz <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
