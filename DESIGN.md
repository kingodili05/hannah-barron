# Hannah Barron Outdoors — Design System

## Aesthetic lane
Modern athletic / technical hunting brand. **Sitka / First Lite** register, not Filson-heritage and not generic SaaS-creator.

## Color strategy — Committed
Dark olive surface carries ~60%. Bone carries product/form sections. Rust accent ≤15%, almost exclusively on action.

### Tokens (OKLCH, tinted neutrals)
```
--ink-950: #14180f   /* near-black, olive tint — primary dark surface */
--ink-900: #1c2116
--ink-800: #262d1f
--ink-700: #353d2c
--ink-600: #4a533d

--moss-700: #3d4a2e
--moss-600: #556b3c   /* secondary action, lines */
--moss-500: #6e8a4d
--moss-400: #92a96f
--moss-300: #b8c995

--bone-50:  #f4efe4   /* paper, primary light surface */
--bone-100: #ebe4d3
--bone-200: #d8cdb4
--bone-300: #b8aa85   /* secondary text on bone */
--bone-400: #8a7c5a   /* muted text on bone */

--rust-700: #8a3413
--rust-600: #b3441a   /* primary accent */
--rust-500: #d05522
--rust-400: #e2754a

--blaze: #ff6a1a     /* reserved — used once, never twice */
```

No `#000`. No `#fff`. Every neutral tints toward the olive hue.

## Typography
Two families, both off the brand reflex-reject list.

- **Display:** **Antonio** — condensed industrial geometric. Carries headlines, eyebrow labels, stat numbers. Weights 600/700.
- **Body:** **Hanken Grotesk** — neutral humanist sans. Weights 400/500/600.

```
--font-display: 'Antonio', 'Oswald', system-ui, sans-serif;
--font-body:    'Hanken Grotesk', system-ui, sans-serif;
```

### Scale
Fluid `clamp()`. Step ratio ≥1.3.
- `--fs-display`: `clamp(3.5rem, 9vw, 9rem)` — hero
- `--fs-h1`: `clamp(2.5rem, 6vw, 5rem)` — page hero
- `--fs-h2`: `clamp(1.75rem, 3.5vw, 3rem)` — section
- `--fs-h3`: `clamp(1.25rem, 2vw, 1.5rem)`
- `--fs-body`: `1rem`
- `--fs-small`: `0.875rem`
- `--fs-eyebrow`: `0.72rem` (tracked +0.25em)

Body line length cap: 68ch. Light text on dark gets `line-height: 1.7`; dark on bone gets `1.6`.

## Layout
- Max content width: **1440px**. Generous edge padding: `clamp(24px, 5vw, 80px)`.
- 12-col conceptual grid. Section spacing: `clamp(96px, 12vw, 160px)`.
- Asymmetric heroes: text 60% / image 40% with image bleeding out of column. Never centered-stack except the success page.
- Cards used sparingly. The store products are cards (right affordance). Activity blocks on index are full-bleed image tiles, not boxed cards.

## Elevation & borders
- Single hairline: `1px solid rgba(244, 239, 228, 0.08)` on dark; `1px solid rgba(0, 0, 0, 0.06)` on bone.
- No side-stripe borders. No drop shadows on text. Photo shadows soft and low: `0 24px 60px -20px rgba(20, 24, 15, 0.6)`.

## Iconography
- **No emoji in production UI.** Inline SVG monoline icons (1.5px stroke), 20–24px default.
- Logo: wordmark "HANNAH BARRON" in Antonio 700 + "/ OUTDOORS" smaller lockup. Optional `HB` monogram for square spaces.
- Section icons: silhouettes (catfish, deer, hook, arrow) as inline SVG, not emoji.

## Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for ease-out-quart. No bounce, no elastic.
- Page-in stagger: 80ms between siblings. Single staggered reveal per fold.
- Hover: only transform/opacity/color. No layout animations.
- Reduced motion respected.

## Imagery
- Hero uses hannah.jpg full-bleed with bone-tint duotone overlay. Photo dominates; type sits on top.
- Activity tiles: hannah2/3/4.jpg cropped square, treated with a 10% olive overlay for unity.
- Product cards: photo when available (data.js already provides `image` paths). When missing, a neutral ink-800 panel with the wordmark — never an emoji.

## Components
- **Buttons:** rust solid primary, bone-outlined secondary, ghost tertiary. Square corners (radius 2px). Padding `14px 28px`. Letter-spacing on uppercase labels.
- **Forms:** inputs on bone-100 background, ink-900 text, hairline border, rust-600 focus ring (2px offset).
- **Nav:** dark, condensed wordmark left, tab links right, persistent rust CTA. Sticky with subtle background-alpha shift on scroll.
- **Footer:** ink-950 surface, bone-300 type, single hairline divider, 4-col on desktop.

## Bans (project-specific, on top of impeccable global bans)
- No emoji as logo or section icon.
- No `border-left: 3px solid var(--accent)` accent stripes (kill the about-page `.bio-fact` pattern).
- No gradient text. No `background-clip: text`.
- No glassmorphism (current `backdrop-filter: blur(10px)` on hero stats — remove).
- No rounded "pill" radii > 8px on functional UI. Pills reserved for tag labels.
- No emoji-on-gradient activity card placeholders. Replace with photo crops.

## File contract
All page-local `<style>` blocks should reference shared tokens from `style.css`. Page CSS contains only layout for that page; no duplicated tokens.
