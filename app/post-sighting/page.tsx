'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import('react-leaflet').then((mod) => mod.useMapEvents),
  { ssr: false }
);

interface LocationMarkerProps {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function PostSighting() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: '',
    notes: '',
  });
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!position) {
      alert('Please select a location on the map by clicking where the sighting occurred.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send data to a backend/Supabase
    console.log('Sighting submitted:', { ...formData, position });
    
    // Redirect to thank you page
    router.push('/thank-you');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-wraith-ivory mb-4 font-[var(--font-space-grotesk)]">
            Post a Sighting
          </h1>
          <p className="text-wraith-gray text-lg">
            Did you spot a spirit? Post information below so that our community can stand vigilant!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date of Sighting */}
          <div>
            <label htmlFor="date" className="block text-wraith-ivory text-sm font-medium mb-2">
              Date of Sighting
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-wraith-ivory border border-wraith-gray rounded-lg px-4 py-3 focus:outline-none focus:border-wraith-orange transition-colors"
            />
          </div>

          {/* Time of Sighting */}
          <div>
            <label htmlFor="time" className="block text-wraith-ivory text-sm font-medium mb-2">
              Time of Sighting
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-wraith-ivory border border-wraith-gray rounded-lg px-4 py-3 focus:outline-none focus:border-wraith-orange transition-colors"
            />
          </div>

          {/* Type of Sighting */}
          <div>
            <label htmlFor="type" className="block text-wraith-ivory text-sm font-medium mb-2">
              Type of Sighting
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-wraith-ivory border border-wraith-gray rounded-lg px-4 py-3 focus:outline-none focus:border-wraith-orange transition-colors"
            >
              <option value="">Select a type...</option>
              <option value="Apparition">Apparition</option>
              <option value="Headless Spirit">Headless Spirit</option>
              <option value="Orbs">Orbs</option>
              <option value="Phantom Sounds">Phantom Sounds</option>
              <option value="Poltergeist">Poltergeist</option>
              <option value="Shadow Figure">Shadow Figure</option>
              <option value="White Lady">White Lady</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sighting Notes */}
          <div>
            <label htmlFor="notes" className="block text-wraith-ivory text-sm font-medium mb-2">
              Sighting Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full bg-black text-wraith-ivory border border-wraith-gray rounded-lg px-4 py-3 focus:outline-none focus:border-wraith-orange transition-colors resize-none"
              placeholder="Describe what you witnessed..."
            />
          </div>

          {/* Map for Location Selection */}
          <div>
            <label className="block text-wraith-ivory text-sm font-medium mb-2">
              Where Were You Exactly? (Place a Pin)
            </label>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border border-wraith-gray">
              <MapContainer
                center={[39.8283, -98.5795]}
                zoom={4}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
            {position && (
              <p className="text-wraith-gray text-sm mt-2">
                Selected location: {position[0].toFixed(6)}, {position[1].toFixed(6)}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-wraith-ivory border-2 border-wraith-ivory font-semibold px-8 py-4 rounded-lg hover:bg-wraith-orange hover:text-black hover:border-wraith-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? 'Posting Your Sighting...' : 'Post Your Sighting'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

