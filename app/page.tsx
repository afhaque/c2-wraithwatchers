'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import dynamic from 'next/dynamic';
import { Sighting, SightingStats } from './types/sighting';

// Dynamic import to avoid SSR issues with Leaflet
const SightingsMap = dynamic(() => import('./components/SightingsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg bg-wraith-gray/20 animate-pulse flex items-center justify-center">
      <p className="text-wraith-gray">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [filteredSightings, setFilteredSightings] = useState<Sighting[]>([]);
  const [stats, setStats] = useState<SightingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetch('/ghost_sightings_12000_with_images.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse<Sighting>(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const data = results.data.filter(row => 
              row['Latitude of Sighting'] && row['Longitude of Sighting']
            );
            setSightings(data);
            setFilteredSightings(data);
            calculateStats(data);
            setLoading(false);
          },
        });
      });
  }, []);

  useEffect(() => {
    let filtered = sightings;
    
    if (selectedState !== 'all') {
      filtered = filtered.filter(s => s['US State'] === selectedState);
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(s => s['Tag of Apparition'] === selectedType);
    }
    
    setFilteredSightings(filtered);
    calculateStats(filtered);
  }, [selectedState, selectedType, sightings]);

  const calculateStats = (data: Sighting[]) => {
    if (data.length === 0) {
      setStats(null);
      return;
    }

    // Find most recent sighting
    const sortedByDate = [...data].sort((a, b) => 
      new Date(b['Date of Sighting']).getTime() - new Date(a['Date of Sighting']).getTime()
    );
    const mostRecent = sortedByDate[0];
    const daysAgo = Math.floor(
      (new Date().getTime() - new Date(mostRecent['Date of Sighting']).getTime()) / (1000 * 60 * 60 * 24)
    );

    // Find most ghostly city
    const cityCounts = data.reduce((acc, sighting) => {
      const key = `${sighting['Nearest Approximate City']}, ${sighting['US State']}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const [cityState, count] = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0];
    const [city, state] = cityState.split(', ');

    setStats({
      totalSightings: data.length,
      mostRecentDate: mostRecent['Date of Sighting'],
      mostRecentDaysAgo: daysAgo,
      mostGhostlyCity: city,
      mostGhostlyCityState: state,
    });
  };

  const uniqueStates = Array.from(new Set(sightings.map(s => s['US State']))).sort();
  const uniqueTypes = Array.from(new Set(sightings.map(s => s['Tag of Apparition']))).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👻</div>
          <p className="text-wraith-ivory text-xl">Loading sightings...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-wraith-ivory mb-2 font-[var(--font-space-grotesk)]">
            Sightings Stats
          </h1>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-black border-2 border-wraith-ivory rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-wraith-orange mb-2">
                {stats.totalSightings.toLocaleString()}
              </div>
              <div className="text-wraith-ivory text-sm">Total Sightings</div>
            </div>
            <div className="bg-black border-2 border-wraith-ivory rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-wraith-orange mb-2">
                {stats.mostRecentDaysAgo}
              </div>
              <div className="text-wraith-ivory text-sm">Days Since Most Recent Sighting</div>
            </div>
            <div className="bg-black border-2 border-wraith-ivory rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-wraith-orange mb-2">
                {stats.mostGhostlyCity}, {stats.mostGhostlyCityState}
              </div>
              <div className="text-wraith-ivory text-sm">Most Ghostly City</div>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-wraith-ivory mb-4 font-[var(--font-space-grotesk)]">
            Sightings Map
          </h2>
          <SightingsMap sightings={filteredSightings} />
        </div>

        {/* Filter Control Panel */}
        <div className="bg-wraith-gray/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-wraith-ivory mb-4 font-[var(--font-space-grotesk)]">
            Filter Control Panel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state-filter" className="block text-wraith-ivory text-sm mb-2">
                Filter by State:
              </label>
              <select
                id="state-filter"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-black text-wraith-ivory border border-wraith-gray rounded px-3 py-2 focus:outline-none focus:border-wraith-orange"
              >
                <option value="all">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="type-filter" className="block text-wraith-ivory text-sm mb-2">
                Filter by Type:
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-black text-wraith-ivory border border-wraith-gray rounded px-3 py-2 focus:outline-none focus:border-wraith-orange"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sightings Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-wraith-ivory mb-4 font-[var(--font-space-grotesk)]">
            Sightings Table
          </h2>
          <div className="bg-black border border-wraith-gray/30 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-wraith-gray/20 text-wraith-ivory border-b border-wraith-gray/30">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Time</th>
                    <th className="px-4 py-3 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-wraith-ivory">
                  {filteredSightings.slice(0, 50).map((sighting, idx) => (
                    <tr key={idx} className="border-b border-wraith-gray/20 hover:bg-wraith-gray/10 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">{sighting['Date of Sighting']}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {sighting['Nearest Approximate City']}, {sighting['US State']}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{sighting['Tag of Apparition']}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{sighting['Time of Day']}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{sighting['Notes about the sighting']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredSightings.length > 50 && (
              <div className="text-center py-4 text-wraith-gray text-sm border-t border-wraith-gray/30">
                Showing 50 of {filteredSightings.length} sightings
              </div>
            )}
          </div>
        </div>

        {/* Export Data Button */}
        <div className="text-center">
          <button
            onClick={() => {
              const csv = Papa.unparse(filteredSightings);
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'filtered_sightings.csv';
              a.click();
            }}
            className="bg-wraith-orange text-black font-semibold px-8 py-3 rounded-lg hover:bg-wraith-orange/80 transition-colors"
          >
            Export Data
          </button>
        </div>
      </div>
    </main>
  );
}
