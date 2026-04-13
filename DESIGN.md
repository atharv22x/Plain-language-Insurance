# Design System Specification: The Lucid Layer

## 1. Overview & Creative North Star
**Creative North Star: The Transparent Advocate**
This design system rejects the dense, opaque jargon of traditional insurance in favor of extreme clarity and approachability. It is inspired by the "Editorial Minimalism" of Notion and the "Technical Elegance" of Stripe.

To move beyond "standard SaaS" layouts, we utilize **The Transparent Advocate** philosophy:
*   **Intentional Asymmetry:** Avoid rigid, perfectly centered grids. Use off-balance white space and staggered card layouts to guide the eye through the "story" of a policy.
*   **Breathing Room:** White space is not "empty"—it is a premium tool. Use generous padding to signal that the user has time to understand their coverage.
*   **Layered Clarity:** We break the "template" look by overlapping glassmorphic containers, suggesting that insurance isn't a flat document, but a living, protective layer over the user's life.

---

## 2. Colors
Our palette moves beyond simple indicators. It uses Material-style tonal ranges to create a sense of depth and reassurance.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the definition a premium interface requires.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Background (`#faf8ff`):** The canvas.
*   **Surface Container Lowest (`#ffffff`):** Reserved for the most important interactive cards.
*   **Surface Container High (`#e2e7ff`):** Used for secondary sidebars or utility zones.
*   **The Glass Rule:** For floating navigation or modal overlays, use `surface` at 70% opacity with a `24px` backdrop-blur. This "frosted" effect allows the vibrant insurance status colors to bleed through softly, maintaining context.

### Status Tones (The "Plain Language" Indicators)
*   **Covered (Primary):** `primary` (#006e2f) for text; `primary_container` (#22c55e) for high-signal backgrounds.
*   **Conditional (Secondary):** `secondary` (#735c00) for caution; `secondary_container` (#fed01b) for highlight.
*   **Not Covered (Tertiary):** `tertiary` (#b91a24) for alerts; `tertiary_container` (#ff8a83) for soft error states.

---

## 3. Typography
We use a dual-font system to balance "Humanist Warmth" with "Technical Precision."

*   **Display & Headlines (Manrope):** A modern geometric sans-serif with a friendly, wide stance.
    *   *Role:* Authoritative yet approachable. Use `display-lg` (3.5rem) for hero headers to create an editorial feel.
*   **Body & Titles (Inter):** A high-legibility typeface for complex insurance data.
    *   *Role:* Neutrality and clarity. Use `body-md` (0.875rem) for the majority of policy text to ensure readability at scale.

**Hierarchy Note:** Use extreme contrast in weight. Pair a `headline-lg` in SemiBold with a `body-md` in Regular. This "High-End Editorial" contrast eliminates the need for bold colors or heavy lines to organize information.

---

## 4. Elevation & Depth
In this system, depth is "baked in" rather than "added on."

*   **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a natural "lift" that feels integrated into the architecture.
*   **Ambient Shadows:** For interactive elements like "Claim Buttons" or "Policy Cards," use an extra-diffused shadow:
    *   `box-shadow: 0 12px 40px rgba(19, 27, 46, 0.06);`
    *   *Note:* The shadow color must be a tinted version of `on-surface` (#131b2e) at very low opacity (6%) to mimic natural light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#bccbb9) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Cards (The "Policy Block")
Cards are the primary vehicle for information. 
*   **Radius:** Use `xl` (3rem) for main dashboard cards and `DEFAULT` (1rem) for nested items.
*   **Styling:** No borders. Use `surface-container-lowest` on top of a `surface` background with a subtle ambient shadow.

### Buttons (The "Action Trigger")
*   **Primary:** `primary` background with `on-primary` (White) text. Use `full` (9999px) radius for a friendly, modern feel.
*   **Signature Gradient:** Apply a subtle linear gradient from `primary` to `primary_container` (150deg) to give the button a 3D "gemstone" quality.

### Status Chips
*   **Logic:** For a "Covered" status, use a `primary_container` background with `on_primary_container` text. 
*   **Styling:** `sm` (0.5rem) radius. Avoid pill shapes for chips to differentiate them from buttons.

### Input Fields
*   **Style:** Minimalist. No bottom line or full box. Use a `surface-container-low` background with a `md` (1.5rem) radius. 
*   **Focus State:** Instead of a thick border, use a 2px `outline` (#6d7b6c) with a subtle `primary` glow.

### Lists & Tables
*   **Constraint:** Forbid the use of divider lines. 
*   **Alternative:** Use `1.5rem` of vertical whitespace or alternating `surface-container-low` and `surface` background rows.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts (e.g., a 2/3 width card next to a 1/3 width descriptive text).
*   **Do** use backdrop blurs on any element that floats (modals, navbars, dropdowns).
*   **Do** use the `primary_fixed` and `secondary_fixed` tones for background washes to separate large sections of a page.

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#131b2e) to maintain a premium, deep-blue-ink feel.
*   **Don't** use 1px solid dividers. If you feel you need one, increase the whitespace instead.
*   **Don't** use sharp corners. The minimum radius is `sm` (0.5rem). High-end fintech should feel soft and safe, not sharp and aggressive.