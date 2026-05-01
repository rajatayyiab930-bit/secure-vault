# Design Brief: Secure Vault

**Purpose**: Premium cloud storage platform for secure, long-term file management (photos, videos, documents). Users expect trust, professionalism, and confident usability.

**Tone**: Refined minimalism. Professional, trustworthy, zero playfulness. Every pixel earns its place.

**Differentiation**: Gallery-grid file viewer with elegant thumbnail previews + selection states. Floating upload button with subtle pulse animation. Real-time storage gauge on dashboard. Intentional depth through layered card surfaces, not glow effects.

## Palette

| Token | OKLCH | Purpose |
|---|---|---|
| Primary | `0.45 0.15 260` / dark: `0.55 0.16 260` | Navy blue for headers, primary actions, trust |
| Accent | `0.65 0.18 250` / dark: `0.72 0.19 250` | Electric blue for highlights, upload button, active states |
| Background | `0.98 0 0` / dark: `0.125 0 0` | Neutral white (light) / deep charcoal (dark) |
| Card | `1.0 0 0` / dark: `0.16 0 0` | Elevated surfaces for content, galleries, dialogs |
| Foreground | `0.12 0 0` / dark: `0.96 0 0` | Maximum contrast text on light/dark |
| Border | `0.88 0 0` / dark: `0.26 0 0` | Subtle dividers, input edges |
| Destructive | `0.55 0.22 25` / dark: `0.65 0.19 22` | Red for delete/destructive actions |

## Typography

| Role | Font | Scale | Weight |
|---|---|---|---|
| Display | General Sans | 32px–48px | 600–700 |
| Body | General Sans | 14px–16px | 400–500 |
| Mono | JetBrains Mono | 12px–14px | 400 |

## Structural Zones

| Zone | Treatment | Purpose |
|---|---|---|
| Header | Primary background, white text, subtle border-b accent | Navigation, branding, status info (storage gauge) |
| Content Grid | Card surfaces on muted background, `rounded-lg` (12px) | Gallery thumbnails, file lists, dashboard metrics |
| Bottom Nav | Semi-transparent dark card, accent indicator on active tab | Mobile-first navigation, always accessible |
| Floating Elements | Accent background, `accent-pulse` animation | Upload button, action prompts |

## Spacing & Rhythm

- Gap 2 (8px): inputs, badges, tight groups
- Gap 3 (12px): card padding, component spacing
- Gap 4 (16px): section padding, medium grouping
- Gap 6 (24px): full-width section margins, breathing room

## Component Patterns

- **Cards**: `bg-card rounded-lg shadow-card border border-border/40`
- **Buttons**: Primary (navy bg, white text), Secondary (subtle bg), Accent (electric blue)
- **Inputs**: `bg-input border border-border rounded-sm`, focus ring uses accent color
- **Gallery Items**: `gallery-item` class — rounded-lg, border, hover state raises shadow and brightens border
- **Badges**: `rounded-full px-2 py-1` for file types, status

## Motion Choreography

- **Entrance**: `animate-scale-in` (300ms) for modals, dialogs, overlays
- **List Items**: `animate-slide-up` (staggered 50ms) for gallery grids
- **Interactive**: `transition-smooth` (300ms) for hover/focus state changes
- **Accent Pulse**: Upload button pulses continuously at 3s interval using custom `keyframes`

## Constraints

- Dark mode primary — light mode optional / future
- No gradients on text; gradients only on interactive elements if needed
- Shadows convey depth only; no color glow effects
- Max 3 animation types active simultaneously to avoid visual clutter
- Border radius: 0 (inputs), 8px (small elements), 12px (cards), 16px (large modals), full (badges)

## Signature Detail

**Floating Upload Button**: Center-aligned, electric blue, `accent-pulse` animation. Tap/click opens file picker. Provides instant affordance that files can be added anytime, anywhere in the app. Complements bottom nav without competing for space.

## Files

- `src/frontend/src/index.css` — OKLCH tokens, font-face declarations, utility classes (shadows, animations, gallery-item)
- `src/frontend/tailwind.config.js` — Custom keyframes (fade-in, scale-in, slide-up, accent-pulse) and shadow variants
- `src/frontend/public/assets/fonts/` — GeneralSans.woff2, JetBrainsMono.woff2
