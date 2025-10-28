# WraithWatchers Application

A modern, mobile-responsive web application for tracking and reporting ghost sightings across the United States.

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS v4
- **Mapping:** Leaflet.js with react-leaflet
- **Data Processing:** PapaParse for CSV handling
- **Typography:** Inter & Space Grotesk fonts
- **Deployment:** Vercel-ready

## Features

### 1. Sightings Map Page (`/`)
- **Statistics Dashboard:** Displays total sightings, days since most recent sighting, and most ghostly city
- **Interactive Map:** Black & white Leaflet map with clickable markers showing sighting details and images
- **Filter Controls:** Filter by US State and Apparition Type
- **Data Table:** Sortable table showing first 50 sightings (with export functionality)
- **Export Feature:** Download filtered data as CSV

### 2. Post a Sighting Page (`/post-sighting`)
- Form fields for date, time, type, and detailed notes
- Interactive map for pin-drop location selection
- Form validation and submission handling
- Redirects to confirmation page on success

### 3. Thank You Page (`/thank-you`)
- Confirmation message with decorative ghost emoji
- Quick navigation back to map or to post another sighting

## Visual Identity

### Color Scheme
- **Primary Black:** `#000000` (backgrounds)
- **Ghost White/Ivory:** `#F8F8F8` (main text and borders)
- **Accent Orange:** `#FF9F40` (buttons, highlights, active states)
- **Muted Gray:** `#6E6E6E` (secondary elements)

### Design Principles
- Minimalist, playful-yet-mysterious aesthetic
- High contrast for readability
- Flat design with clean borders
- Responsive grid layouts
- Subtle hover states and transitions
- Custom grayscale map styling

## Project Structure

```
app/
├── components/
│   ├── Footer.tsx          # Shared footer component
│   ├── Navbar.tsx          # Navigation with active states
│   └── SightingsMap.tsx    # Leaflet map with markers
├── post-sighting/
│   └── page.tsx            # Sighting submission form
├── thank-you/
│   └── page.tsx            # Confirmation page
├── types/
│   └── sighting.ts         # TypeScript interfaces
├── globals.css             # Custom styles & Leaflet imports
├── layout.tsx              # Root layout with nav/footer
└── page.tsx                # Home page with map & stats

public/
└── ghost_sightings_12000_with_images.csv  # Data source
```

## Data Structure

CSV columns:
- Date of Sighting
- Latitude of Sighting
- Longitude of Sighting
- Nearest Approximate City
- US State
- Notes about the sighting
- Time of Day
- Tag of Apparition (type)
- Image Link

## Mobile Responsiveness

All pages implement responsive design:
- Flexible grid layouts (`grid-cols-1 md:grid-cols-3`)
- Responsive navigation spacing
- Adaptive map heights (400px mobile, 500px desktop)
- Responsive typography scales
- Touch-friendly form inputs
- Horizontal scrolling tables on small screens

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Future Enhancements

- [ ] Supabase integration for persistent storage
- [ ] User authentication
- [ ] Image upload functionality
- [ ] Advanced filtering (date range, radius search)
- [ ] Heat map visualization
- [ ] Real-time sighting notifications
- [ ] Community voting/verification system

## Performance Optimizations

- Dynamic imports for Leaflet (client-side only)
- Map markers limited to 500 for initial load
- Table pagination (showing 50 rows)
- CSV parsed client-side for flexibility
- Optimized with Next.js App Router

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

