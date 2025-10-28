'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-black border-b border-wraith-gray/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-wraith-ivory font-[var(--font-space-grotesk)]">
              <span className="text-wraith-orange">👻</span> WraithWatchers
            </div>
          </Link>
          
          <div className="flex space-x-1 sm:space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-wraith-orange text-black'
                  : 'text-wraith-ivory hover:bg-wraith-gray/20 hover:text-wraith-orange'
              }`}
            >
              Sightings Map
            </Link>
            <Link
              href="/post-sighting"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/post-sighting'
                  ? 'bg-wraith-orange text-black'
                  : 'text-wraith-ivory hover:bg-wraith-gray/20 hover:text-wraith-orange'
              }`}
            >
              Post a Sighting
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

