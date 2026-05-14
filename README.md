# Pokémon Dashboard 🚀

A complete, production-grade Pokémon Home Page application built with modern scalable frontend architecture and enterprise-level coding standards.

## 🛠 Tech Stack
- **React 19**
- **TypeScript**
- **Vite**
- **Redux Toolkit & React Redux**
- **Vitest & Testing Library** (Unit Testing)
- **Tailwind CSS 3**
- **React Router DOM**
- **Lucide React** (Icons)
- **clsx** (Classname utilities)

## ✨ Features
- **Sidebar Navigation:** Dynamic type fetching with glassmorphism effects and themed scrollbars.
- **Mobile Responsive Drawer:** A sliding navigation menu for a seamless mobile experience.
- **Advanced Pagination:**
  - Robust calculation logic synchronized with API `next`/`previous` metadata.
  - Zero-jerk loading strategy using state preservation and smooth overlays.
  - Tabular numeric styling for stable, jump-free layout.
- **Performance Optimized:**
  - **Memoization:** High-performance rendering using `React.memo` for grid items.
  - **Debounced Search:** Efficient local filtering to prevent UI lag.
  - **Abort Strategy:** Comprehensive `AbortController` integration in Redux thunks.
- **Polished UI/UX:**
  - Levitation animations and high-depth shadows for Pokémon cards.
  - Custom themed "Poké-Red" scrollbars and interactive states.
  - Immediate loading feedback with both skeletons and overlays.
- **Unit Testing:** Comprehensive test suite for core logic and utilities.

## 🚀 Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment:**
   Ensure the `.env` file is present in the root directory:
   ```env
   VITE_API_BASE_URL=https://pokeapi.co/api/v2
   ```
3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
4. **Run Unit Tests:**
   ```bash
   npm run test
   ```
5. **Build for Production:**
   ```bash
   npm run build
   ```

## 🧪 Testing Strategy
The project uses **Vitest** and **React Testing Library** for high-confidence development. 
- **Unit Tests:** Located in `src/**/__tests__/*.test.ts`.
- **Environment:** Configured with `jsdom` for browser-like testing.
- **Setup:** Includes custom Jest-DOM matchers via `src/setupTests.ts`.

## 📂 Folder Structure & Architecture
The project strictly adheres to a feature-based folder structure:

- `src/api/` - Generic API definitions and endpoints (fetch wrappers with `AbortSignal`).
- `src/app/` - Centralized Redux store and custom hooks.
- `src/components/` - Atomic UI components (`common`, `pokemon`, `sidebar`, `layouts`).
- `src/features/` - Core state management (slices, thunks, selectors) grouped by domain.
- `src/hooks/` - Custom utility hooks (`useDebounce`, `useAppDispatch`).
- `src/utils/` - Shared formatters, constants, and theme helpers.

## 🧠 Architecture Decisions

### Robust Pagination & Offset Management
We've implemented a direct-injection parameter strategy for Redux thunks. By passing `page` and `type` directly from the component's render cycle, we eliminate race conditions where the API might otherwise read stale state from the store.

### Layout Stability (CLS Optimization)
To prevent "jerking" during data transitions, we utilize a combination of `min-height` constraints on content containers and state-preservation techniques. We do not clear the list during subsequent page loads, instead using a dimmed overlay to maintain visual continuity.

### Performance & Memoization
To handle potentially large lists of Pokémon, we use `React.memo` on atomic components and `useCallback` for all stable function references, ensuring minimal re-renders during search and navigation.



