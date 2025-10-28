export default function Footer() {
  return (
    <footer className="bg-black border-t border-wraith-gray/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-wraith-gray text-sm">
          <p>© {new Date().getFullYear()} WraithWatchers. Keeping watch on the spectral realm.</p>
        </div>
      </div>
    </footer>
  );
}

