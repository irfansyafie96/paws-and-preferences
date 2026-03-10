# Paws & Preferences 🐱

**Find Your Favourite Kitty**

A Tinder-style cat discovery app where you swipe through cute cat photos to find the ones you love.

---

## Why I Built This

This project was built as a technical assessment, but I wanted to make something I would actually be proud to show.

### The Challenge

The original requirements were simple:

- Single-page app with cat images
- Swipe right to like, left to dislike
- Show summary of liked cats
- Source images from Cataas API
- Work smoothly on mobile devices

### My Approach

Rather than just meeting the requirements, I focused on:

1. **Quality over quantity** - Instead of adding many features, I made the core experience polished and delightful

2. **Mobile-first thinking** - The app is designed for touch gestures first, with button alternatives for accessibility

3. **Smooth animations** - I used Framer Motion for fluid, natural-feeling interactions that make swiping feel satisfying

4. **Minimalist design** - Clean, flat design with soft colors creates a pleasant experience without visual clutter

---

## Design Decisions

### Typography: Fredoka

I chose **Fredoka** from Google Fonts because:

- It's cute and playful, matching the fun cat theme
- Rounded letters feel friendly and approachable
- Still highly readable despite being a display font

### Color Scheme

- **Soft pink (#F9A8D4)** for likes - warm, positive feeling
- **Muted red (#FCA5A5)** for dislikes - gentle, not harsh
- **Dark gray (#374151)** for text - readable without being stark black

### Paw Print Background

Added a subtle paw print pattern to:

- Reinforce the cat theme without being overwhelming
- Keep it playful but minimal (6% opacity)

---

## Technical Implementation

### Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety throughout
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling with CSS variables
- **Framer Motion** - Smooth animations and gestures

### Key Technical Choices

**Cataas API + Image Preloading**

The Cataas API provides cute cat images, but they can be slow to load. I implemented image preloading during the loading screen so swiping feels instant.

**Custom Swipe Hook**

Extracted swipe logic into `useSwipeCard` hook following SOLID principles - single responsibility and DRY code.

**Race Condition Prevention**

Added `isSwiping` ref to prevent duplicate state updates when users swipe rapidly.

---

## Features

- ✅ Swipe right to like, left to dislike
- ✅ Touch gestures optimized for mobile
- ✅ Alternative buttons for accessibility
- ✅ Image preloading for instant swipes
- ✅ Animated summary screen with floating cats
- ✅ Responsive design for all screen sizes
- ✅ No scrollbars for cleaner mobile experience

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Live Demo

🔗 [https://irfansyafie96.github.io/paws-and-preferences/](https://irfansyafie96.github.io/paws-and-preferences/)

---

## What I Learned

This project taught me:

- Building smooth gesture-based interactions
- Working with external APIs (Cataas)
- Mobile-first CSS and touch optimization
- Animation timing and easing choices
- State management for real-time interactions

---

## Future Improvements

Areas I'd love to improve:

- Keyboard navigation and ARIA labels for better accessibility
- Error handling for API failures
- Offline support with service workers

---

## License

MIT
