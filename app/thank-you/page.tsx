import Link from 'next/link';
import Image from 'next/image';

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-wraith-ivory mb-6 font-[var(--font-space-grotesk)]">
          Thank You!
        </h1>
        
        <p className="text-wraith-ivory text-xl mb-12">
          May you be clear of scary spirits!
        </p>

        {/* Decorative Image Area */}
        <div className="relative w-full max-w-md mx-auto mb-12 rounded-full overflow-hidden bg-wraith-orange/20 p-12">
          <div className="text-9xl">👻</div>
          <div className="absolute inset-0 bg-gradient-to-br from-wraith-orange/20 to-transparent rounded-full"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-wraith-orange text-black font-semibold px-8 py-3 rounded-lg hover:bg-wraith-orange/80 transition-colors"
          >
            View Sightings Map
          </Link>
          <Link
            href="/post-sighting"
            className="bg-black text-wraith-ivory border-2 border-wraith-ivory font-semibold px-8 py-3 rounded-lg hover:bg-wraith-ivory hover:text-black transition-colors"
          >
            Post Another Sighting
          </Link>
        </div>
      </div>
    </main>
  );
}

