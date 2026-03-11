# Changelog - Legendary Cave Frontend

## [Version 2.0.0] - 2026-03-11

### Design & UI Improvements

#### Before
- Logo was small (36x36 in navbar, 40x40 in footer) and barely visible
- Header and footer had minimal visual hierarchy
- "Cave" text had gradient effect inconsistent with design

#### After
- Navbar logo: Enlarged to 72x72 pixels with better visibility
- Footer logo: Enlarged to 60x60 pixels, removed yellow background and border for cleaner look
- Typography: "Cave" text changed from gradient to solid violet (#a486d5) for better visual consistency
- Logo fixes: All logos now display properly with enhanced contrast

---

### Photo Gallery Features

#### Before
- No photo gallery functionality
- Only mock placeholder images from Unsplash
- No "Nos Souvenirs" section

#### After
COMPLETE PHOTO GALLERY SYSTEM
- New "Nos Souvenirs" toggle badge next to "Annuaire Alumni" 
- Interactive carousel with 5 real photos from Cloudinary
- Navigation buttons (previous/next) with hover effects
- Photo indicators showing position (e.g., "3 / 5")
- Large carousel display (400px height) with hover zoom effect on images
- Photo descriptions with date overlay

COMMENT SYSTEM ON PHOTOS
- Users can add comments with name and text
- Comments display below each photo
- Comment count indicator
- Real-time comment updates
- Clean comment card design with user name and date

PHOTO GRID DISPLAY
- Grid layout (280px min-width) below carousel
- All 5 photos displayed with full descriptions
- Filterable and searchable photo gallery
- Smooth animations on load

---

### Real Photo Integration

#### Before
```javascript
src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?...'
```
(Generic stock images)

#### After
```javascript
src: 'https://res.cloudinary.com/dkpacwzgb/image/upload/v1773231607/...'
```
5 Real Photos from Promotion 2027:
1. `db8f2e19a2914f238dda524c2317f4b5_nmpxhh.jpg` - Promo group photo 1
2. `FB_IMG_1730070701137_hf7wqy.jpg` - Promo group photo 2
3. `FB_IMG_1730070796894_d7thir.jpg` - Event/gathering photo
4. `2bcb60453e6840a0bd1aedc375a2ba07_iaagsb.jpg` - Team photo
5. `IMG_20250207_140019_777_kgajup.jpg` - Training/formation photo

---

### Navigation Improvements

#### Before
- "Voir toute la galerie" button scrolled to preview section
- No seamless transition to photo gallery

#### After
- "Voir toute la galerie" button navigates to `/galerie?section=souvenirs`
- Automatically opens "Nos Souvenirs" section with carousel
- Clean URL parameter handling with React Router

---

###  Home Page Preview Section

#### Before
- 3 generic Unsplash placeholder images in "Un aperçu de notre aventure"

#### After
- 3 real photos from Cloudinary matching the promotion
- **Moments d'étude** - Real group photo 1
- **Événements spéciaux** - Real group photo 2
- **Vie étudiante** - Real team photo
- Better visual representation of actual cohort

---

### Content Cleanup

#### Before
- Multiple emoji characters throughout:
  - Decorative stars
  - Various icon symbols
  - Glowing box-shadow effects on availability dots

#### After
- All emoji removed for professional appearance
- All decorative symbols removed
- Glowing effects removed from UI elements
- Cleaner, more modern aesthetic

---

### Alumni Data

#### Before
- 127 mock alumni entries
- Fake names and companies
- Multiple countries spread

#### After
- 65 Real Student Names from actual enrollment roster
- Realistic role assignments (Software Engineer, Data Scientist, etc.)
- Real tech companies:
  - Google, Meta, Microsoft, Amazon, Apple
  - DeepMind, OpenAI, Criteo, OVHcloud
  - IBM, Airbnb, Stripe, Figma, Deezer
  - Mistral AI, AWS, Thales, Freelance
- Organized by 7 technical domains:
  - Intelligence Artificielle (15)
  - Développement Web (15)
  - DevOps (12)
  - Data Science (10)
  - Cybersécurité (8)
  - UX/UI Design (3)
  - Mobile Dev (2)
- All from **Cotonou, Bénin** - Promotion **2027**
- Realistic availability mix (~66% available, ~34% unavailable)

---

## Key Metrics

| Metric | Before | After |
|--------|--------|-------|
| Logo Size (Navbar) | 36x36px | 72x72px |
| Logo Size (Footer) | 40x40px | 60x60px |
| Photo Gallery | None | Full system |
| Real Photos | 0 | 5 |
| Comment System | None | Functional |
| Alumni Entries | 127 | 65 |
| Alumni Location | 18 countries | 1 country |
| Emoji Count | 50+ | 0 |

---

## Technical Updates

### Dependencies
- Added `useSearchParams` from React Router for section navigation
- Cloudinary integration for image hosting

### File Changes
- `src/pages/home.js` - Hero text fix, preview images, button navigation
- `src/pages/galerie.js` - Complete photo gallery implementation with carousel & comments
- `src/components/Header.js` - Logo size increase
- `src/components/Footer.js` - Logo size & styling adjustments
- `src/components/AlumniCard.js` - Removed glowing effects
- `src/components/AlumniModal.js` - Minor cleanup
- `src/data/alumni.js` - Complete data refresh with real names
- Multiple page files - Emoji removal

---

## New Features

1. **Interactive Photo Carousel**
   - Auto-indexed navigation
   - Smooth transitions
   - Position counter
   - Visual indicators

2. **Comment System**
   - Anonymous/named comments
   - Real-time updates
   - Clean UI design
   - Persistent storage (per session)

3. **Smart Navigation**
   - Deep linking to specific gallery sections
   - URL parameters for carousel state

4. **Real Data**
   - Actual student roster
   - Authentic company placements
   - Current promotion year (2027)

---

## Bug Fixes

- Fixed navbar logo cutoff on large screens
- Removed unused local image imports
- Fixed CSS gradient conflicts
- Confirmed all 65 student names persist correctly

---

## Timeline

- **Phase 1**: Logo improvements & visibility fixes
- **Phase 2**: Complete photo gallery implementation
- **Phase 3**: Comment system integration
- **Phase 4**: Real data integration & cloudinary migration
- **Phase 5**: Navigation improvements & home page updates

---

## Promotion 2027 - Cotonou, Benin

Alumni Network: 65 professionals across 7 technical domains
Real Locations: Tech hubs worldwide (US, France, Switzerland, Rwanda, etc.)
Community Spirit: Every photo tells a story of growth, collaboration, and excellence

---

Last Updated: March 11, 2026
Version: 2.0.0 - Complete Career & Gallery Platform
