# CLAUDE.md — ULTREC Website Project

> This file is the single source of truth for building the ULTREC corporate website.
> Read this entirely before writing any code.
> All items are ✅ confirmed unless explicitly marked 🟡 (still pending).

---

## 1. Project Overview

**Company:** ULTREC
**Tagline:** "Sistemas de acceso y proyectos en tecnología"
**Industry:** Physical security (turnstiles, access control) + automated retail (vending machines)
**Primary Market:** Industrial complexes, corporate buildings, sanitary facilities — Mexico-wide
**Language:** Spanish only — `<html lang="es">`
**Founded:** Manufacturing since 2014, ULTREC brand consolidated 2017 (10+ years of experience)

**Company description (use verbatim or adapt for copy):**
> ULTREC es una empresa mexicana especializada en la fabricación e integración de sistemas de control de acceso y retail autónomo. Fabricamos torniquetes de cuerpo completo, sistemas de control de acceso con monedero multimoneda y máquinas expendedoras mecánicas. Con más de 10 años de experiencia, nuestras soluciones protegen espacios industriales, corporativos y de alto tráfico en toda la república mexicana.

---

## 2. Brand Identity

### Logos

| File | Location | Usage |
|---|---|---|
| `logo-ultrec.png` | `imgs/logo-ultrec.png` | Dark backgrounds only (black bg baked in) |
| `logo-ultrec-light.png` | `imgs/logo-ultrec-light.png` | Light sections, nav on scroll if needed |

Use `logo-ultrec-light.png` anywhere the background is not deep navy or black (e.g. a light-tinted card or if a future section uses a lighter treatment). Use `logo-ultrec.png` in the hero and any fully dark section.

### Color Palette — extracted from logo

| Role | Name | Hex | Usage |
|---|---|---|---|
| Page background | Deep Navy | `#040D1A` | Base background for all pages |
| Surface | Dark Navy Panel | `#071428` | Cards, panels |
| Surface Alt | Navy Medium | `#0C1E35` | Alternating sections |
| Primary Accent | Electric Cyan | `#00C8F0` | CTA buttons, active states, glows |
| Accent Secondary | Neon Blue-Cyan | `#0A9EC7` | Hover states, gradients |
| Glow / Highlight | White-Cyan | `#A8EFFF` | Decorative rim effects, subtle borders |
| Text Primary | White | `#FFFFFF` | Headings, key labels |
| Text Secondary | Cool Gray | `#9FB3C8` | Body copy, captions |
| Border | Cyan transparent | `rgba(0,200,240,0.25)` | Card borders, dividers |

### CSS Custom Properties — define in `:root`

```css
:root {
  --color-bg:          #040D1A;
  --color-surface:     #071428;
  --color-surface-alt: #0C1E35;
  --color-cyan:        #00C8F0;
  --color-cyan-dark:   #0A9EC7;
  --color-glow:        #A8EFFF;
  --color-text:        #FFFFFF;
  --color-text-muted:  #9FB3C8;
  --color-border:      rgba(0, 200, 240, 0.25);
  --font-display:      'Bebas Neue', sans-serif;
  --font-body:         'Outfit', sans-serif;
}
```

### Typography

- **Display / Headings:** Bebas Neue (Google Fonts) — bold, industrial, mechanical
- **Body:** Outfit (Google Fonts) — clean, modern, readable at small sizes
- Import both via Google Fonts in the base layout `<head>`.

### Design Aesthetic

- Dark industrial-tech. Reference: security control rooms, precision manufacturing, neon instrumentation panels.
- Deep navy / black base with electric cyan accents and subtle glow effects throughout.
- The logo's circular rim-light motif can be echoed in decorative rings, hover borders, and section dividers.
- This is a **fully dark-theme site** — no pure white backgrounds anywhere.
- Product cards: dark surface, cyan `box-shadow` glow on hover (`0 0 20px rgba(0,200,240,0.3)`).
- CTAs: solid cyan (`#00C8F0`) with dark text, or outlined cyan on dark.
- Glow/pulse animations must be wrapped in `@media (prefers-reduced-motion: no-preference)`.

---

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Astro (static site, fast, SEO-friendly) |
| CSS | Tailwind CSS v3 — extend theme with palette from §2 |
| Carousel | Swiper.js |
| WhatsApp Bubble | Vanilla JS + inline SVG |
| Contact Form | `mailto:` link — no backend, no EmailJS |
| Deployment | **GitHub Pages** |
| Package Manager | pnpm |

### GitHub Pages Deployment Notes

- Output directory: `dist/` (Astro default).
- Set `site` and `base` in `astro.config.mjs`:
  ```js
  export default defineConfig({
    site: 'https://<github-username>.github.io',
    base: '/<repo-name>',
  });
  ```
- Deploy via GitHub Actions — use the official `withastro/action` workflow.
- No custom domain (CNAME) yet — use the generic `<username>.github.io/<repo>` URL.
- When a custom domain is acquired, add a `CNAME` file to `public/` and update `site` in the config.
- All internal links must use Astro's `import.meta.env.BASE_URL` prefix so they work under the subpath.

---

## 4. Site Structure & Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Inicio | Hero, value props, product carousel, about blurb, CTA |
| `/dispositivos` | Dispositivos | Full product catalog — turnstiles, access control, vending |
| `/accesorios` | Accesorios | Post-sale services: refacciones, soporte, instalación, garantías |
| `/servicio-cliente` | Servicio al Cliente | Warranty table, service plans, FAQ, financing |
| `/contacto` | Contacto | Contact form (mailto), direct info, map |
| `/privacidad` | Aviso de Privacidad | Standard LFPDPPP-compliant privacy policy |

**Nav labels:** Inicio · Dispositivos · Accesorios · Servicio al Cliente · Contacto

---

## 5. Global Components

### 5.1 Header / Navigation

- Logo left: use `logo-ultrec.png` on the dark sticky nav (always dark background).
- Nav links: Inicio · Dispositivos · Accesorios · Servicio al Cliente · Contacto
- Right side: "Cotizar" CTA button → `/contacto` (anchors to the form).
- Sticky on scroll: `backdrop-filter: blur(12px)` + semi-transparent dark overlay.
- Mobile: hamburger icon → full-screen dark drawer overlay.
- No language toggle.

### 5.2 Sales Email Banner

Render a dismissible thin bar **above** the header.

**Content:**
```
Ventas: jherrera.ultrec@gmail.com  |  Tel. +52 55 1139 2294
```

- `+52 55 1139 2294` is the sales phone (same as WhatsApp).
- The service numbers (+52 55 4968 2196 and +52 55 1191 0216) appear only in the footer and contact page — NOT in this banner.
- Style: `background: var(--color-cyan)`, dark text (`#040D1A`), `font-size: 12px`, centered.
- Dismiss button (×) on the right — store state in `sessionStorage` key `'ultrec-banner-dismissed'`.
- On reload within the same session, banner stays hidden.

### 5.3 Footer

Four-column layout (collapses to 2 on mobile, 1 on smallest):

**Col 1 — Brand**
- Logo `logo-ultrec-light.png` (or `logo-ultrec.png` if footer stays fully dark)
- Short tagline: "Sistemas de acceso y proyectos en tecnología"

**Col 2 — Navegación**
- Repeat all nav links

**Col 3 — Contacto**
- Ventas: jherrera.ultrec@gmail.com
- Servicios: Servicios.ultrec@gmail.com
- Tel. ventas: +52 55 1139 2294
- Tel. servicio: +52 55 4968 2196 / +52 55 1191 0216
- Dirección: Transvaal 531, Col. 1ro de Mayo, Venustiano Carranza, CDMX 15440
- Horario: Lunes a Viernes, 9:00 am – 6:00 pm

**Col 4 — Redes Sociales**
- TikTok: https://tiktok.com/@ultrec_ventas_mexico
- Instagram: https://instagram.com/ventasultrecmexico
- Facebook: https://www.facebook.com/share/1PK5r4RPec/

**Bottom bar:**
- Left: `© 2024 ULTREC. Todos los derechos reservados.`
- Right: Link → `/privacidad` — "Aviso de Privacidad"

### 5.4 Floating WhatsApp Bubble

- Fixed: bottom-right, `z-index: 9999`.
- Link: `https://wa.me/5215511392294?text=Bienvenido%20a%20ULTREC.%20%C2%BFEn%20qu%C3%A9%20podemos%20servirte%3F`
- Pre-filled message: "Bienvenido a ULTREC. ¿En qué podemos servirte?"
- Style: `#25D366` circle, white WhatsApp SVG icon.
- Pulse `box-shadow` animation (only when `prefers-reduced-motion: no-preference`).
- Desktop hover tooltip: "Chatea con nosotros"
- `aria-label="Contactar por WhatsApp"`

---

## 6. Home Page (`/`)

### Hero Section

- **Headline:** "ULTREC" — Bebas Neue, massive, white
- **Subheadline:** "Sistemas de acceso y proyectos en tecnología"
- **Background image:** `imgs/hero-img.png` with dark overlay `rgba(4, 13, 26, 0.70)`.
- **CTA Primary:** "Ver Productos" → `/dispositivos`
- **CTA Secondary:** "Solicitar Cotización" → `/contacto`
- Full-viewport height (`100svh`). Text centered or left-aligned with generous padding.

### Value Propositions Strip

Four pillars (inferred from full client context — client listed products instead of brand pillars, these are the true differentiators):

| Icon | Pillar | Copy |
|---|---|---|
| Shield | Fabricación Propia | Torniquetes y equipos fabricados directamente por ULTREC con control de calidad total. |
| Wrench | Ingeniería a la Medida | Proyectos personalizados según el espacio, tráfico y necesidades de cada cliente. |
| Star | Respaldo Post-Venta | Garantías de 6 a 36 meses y planes de mantenimiento preventivo incluidos. |
| Map Pin | Presencia Nacional | Instalaciones en toda la república mexicana con más de 10 años de experiencia. |

Use Lucide or Heroicons SVG icons. Dark card strip, cyan accent on icon.

### Product Carousel

10 slides, auto-advance 5 s, arrow controls + dot pagination. Swiper.js.

| Slide | Product Name | Image |
|---|---|---|
| 1 | Torniquete Bidireccional en Acero al Carbón — Modelo Premium | `imgs/dispositivo-1.png` |
| 2 | Torniquete Bidireccional en Acero Inoxidable — Modelo Premium | `imgs/dispositivo-2.png` |
| 3 | Torniquete Doble Peine en Acero al Carbón — Modelo Premium | `imgs/dispositivo-3.png` |
| 4 | Torniquete Doble Peine en Acero Inoxidable — Modelo Premium | `imgs/dispositivo-4.png` |
| 5 | Control de Acceso 2 Puertas Doble Multimoneda Reforzado | `imgs/dispositivo-5.png` |
| 6 | Máquina Vending Mecánica de 2 Resortes | `imgs/dispositivo-6.png` |
| 7 | Máquina Vending Mecánica de 3 Resortes | `imgs/placeholder.png` |
| 8 | Máquina Vending Mecánica de 4 Resortes | `imgs/placeholder.png` |
| 9 | Máquina de Papel | `imgs/placeholder.png` |
| 10 | Refacciones | `imgs/placeholder.png` |

Each slide card: product image (top, fixed aspect ratio), product name, one-line description, cyan "Ver más" link to `/dispositivos`.

### About / Company Blurb

- Short paragraph: founding story, 10+ years, nationwide reach.
- **Photo handling:** The section is designed to work both with and without a team/facility photo.
  - If `imgs/about-photo.png` (or `.jpg`) exists in the directory → render it in a side-by-side layout (text left, image right).
  - If the file does NOT exist → render a full-width centered text block with a decorative cyan divider line. No broken image, no empty box.
  - Implement this with a build-time check in Astro: `import.meta.glob` or a simple `try/catch` on the import. The layout must look intentional in both states.

### CTA Band

- Text: "¿Listo para asegurar tu espacio? Solicita una cotización hoy."
- Button: "Cotizar Ahora" → `/contacto`
- Background: dark with subtle cyan radial gradient or diagonal grid texture.

---

## 7. Dispositivos Page (`/dispositivos`)

Introductory heading + short paragraph. Products organized into 3 categories. Each product card: image, name, description, variant badges (if applicable), "Solicitar Info" button → `/contacto?asunto=Cotización`.

### 7.1 Torniquetes de Cuerpo Completo

**1. Torniquete Bidireccional en Acero al Carbón**
- Image: `imgs/dispositivo-1.png`
- Description: Control de acceso de cuerpo completo en acero negro. Bidireccional, apto para entornos industriales de alto tráfico.
- Variants: Básico · Universal · Plus · Premium

**2. Torniquete Bidireccional en Acero Inoxidable**
- Image: `imgs/dispositivo-2.png`
- Description: Control de acceso de cuerpo completo en acero inoxidable. Mayor resistencia a la corrosión, ideal para espacios con humedad o uso intensivo.
- Variants: Básico · Universal · Plus · Premium

**3. Torniquete Doble Peine en Acero al Carbón**
- Image: `imgs/dispositivo-3.png`
- Description: Diseño doble peine en acero negro. Estructura robusta para entornos de alta seguridad.
- Variants: Básico · Universal · Plus · Premium

**4. Torniquete Doble Peine en Acero Inoxidable**
- Image: `imgs/dispositivo-4.png`
- Description: Doble peine en acero inoxidable. Acabado premium, resistente a la corrosión y vandalismo.
- Variants: Básico · Universal · Plus · Premium

### 7.2 Control de Acceso

**5. Control de Acceso 1 Puerta**
- Image: `imgs/dispositivo-5.png`
- Description: Modelo individual con monedero multimoneda. Control de acceso con cobro automático integrado.

**6. Control de Acceso 2 Puertas Doble Multimoneda Reforzado**
- Image: `imgs/dispositivo-6.png`
- Description: Modelo doble con dos monederos multimoneda y estructura reforzada. Ideal para instalaciones de alto tráfico que requieren control simultáneo de dos accesos. Sistema de seguridad reforzado.

### 7.3 Máquinas Expendedoras (Vending)

**7. Máquina Vending Mecánica**
- Image: `imgs/placeholder.png`
- Description: Máquina expendedora mecánica para la venta de toallas sanitarias. Disponible en configuraciones de 2, 3 o 4 resortes (18 espacios cada uno). Fabricada en acero al carbón cal. 18 con pintura electroestática blanca. Monederos mecánicos configurados para $5 o $10 MXN por unidad.
- Variants shown as a selector or badge strip: 2 resortes · 3 resortes · 4 resortes

**8. Máquina de Papel**
- Image: `imgs/placeholder.png`
- Description: Máquina expendedora mecánica para la venta de papel. Diseño robusto para baños de alto tráfico.

### 7.4 Métodos de Identificación Compatibles

Present as a supporting feature grid below the main products — NOT as standalone product cards. Title: "Métodos de Identificación Compatibles con Nuestros Sistemas".

Each item: icon/image + label + one-line description. All use `imgs/placeholder.png` until real images are provided.

| Item | Image | Label |
|---|---|---|
| Lector Biométrico de Huella Digital | `imgs/placeholder.png` | Identificación por huella dactilar |
| Lector de Código de Barras / QR | `imgs/placeholder.png` | Lectura de códigos QR y barras |
| Control Remoto | `imgs/placeholder.png` | Apertura por control remoto |
| Tarjeta de Proximidad (RFID) | `imgs/placeholder.png` | Acceso por tarjeta o llavero RFID |
| Teclado Numérico | `imgs/placeholder.png` | Acceso por PIN |
| Monedero Multimoneda | `imgs/placeholder.png` | Cobro automático por monedas |

---

## 8. Accesorios Page (`/accesorios`)

> Note: The client's "accesorios" offering is effectively a post-sale services catalog. Structure the page as a services grid with clear CTAs. Keep the "Accesorios" name in the nav unless the client requests a change.

### Service Cards

**Refacciones**
- Description: Piezas de repuesto originales para todos los modelos ULTREC. Garantiza la continuidad operativa de tus equipos.
- CTA: "Consultar disponibilidad" → `/contacto?asunto=Cotización`
- No product list — use the CTA-only approach.

**Soporte Técnico**
- Description: Atención telefónica y presencial para diagnóstico, configuración y resolución de fallas.
- Contact: +52 55 4968 2196 / +52 55 1191 0216
- No CTA button needed — display the numbers directly.

**Instalaciones en Sitio**
- Description: Nuestro equipo realiza la instalación profesional en tu instalación. Cotización personalizada según ubicación y complejidad del proyecto.
- CTA: "Solicitar instalación" → `/contacto?asunto=Cotización`

**Garantías Extendidas**
- Description: Amplía la cobertura de tu equipo con nuestros planes de garantía extendida de 2 o 3 años.
- CTA: "Ver planes" → `/servicio-cliente` (anchors to the warranty section)

**Servicio Técnico Multimarca**
- Description: Diagnóstico, reparación y mantenimiento de sistemas de control de acceso de otras marcas. Diagnóstico inicial sin costo.
- CTA: "Solicitar diagnóstico" → `/contacto?asunto=Servicio%20T%C3%A9cnico`
- 🟡 [PENDING: Client did not specify which competing brands they service — leave copy generic for now]

**Logos de Clientes (if applicable)**
- A "Nuestros Clientes" section with a logo grid.
- Each logo: `imgs/placeholder.png` — replace when real client logos are authorized for display.
- If the placeholder grid looks empty/unintentional, gate this section behind a check: only render it if at least one non-placeholder logo file exists.

---

## 9. Servicio al Cliente Page (`/servicio-cliente`)

### Warranty Table

Render as a styled dark table with cyan header row.

| Equipo | Garantía | Condición de operación |
|---|---|---|
| Torniquete en Acero Inoxidable | 12 meses | Máximo 5,000 ciclos/trimestre sin servicio |
| Torniquete en Acero Negro | 6 meses | Máximo 5,000 ciclos/trimestre sin servicio |
| Tarjetas Electrónicas | 6 meses | Protección eléctrica obligatoria |
| Monederos Multimoneda | 6 meses | Protección eléctrica y limpieza trimestral |

### Service Plans

Three-card layout:

| Plan | Cobertura |
|---|---|
| Garantía Estándar | 1 año — incluida con la compra |
| Garantía Extendida Básica | 2 o 3 años — cubre partes y mano de obra |
| Garantía Extendida Plus | 2 o 3 años — incluye mantenimiento preventivo programado |

### Installation & Maintenance

Bullet list or icon grid:
- Servicio de instalación en sitio — por cotización
- Mantenimiento preventivo — según programa de póliza anual
- Mantenimiento programado de 2 a 3 años en garantías extendidas
- Servicio de mantenimiento o cambio de sistema a otras marcas

### Financiamiento / Facilidades de Pago

Display this section prominently — it is a real differentiator.

**Title:** "Facilidades de Pago"

**Content:**
> En ULTREC ofrecemos facilidades de pago para hacerte más accesible nuestros productos. Para torniquetes:
>
> - **Opción A — Anticipo y diferido:** 60% de anticipo y 40% restante en 1 a 2 meses.
> - **Opción B — Participación en ganancias:** Sin anticipo total, ULTREC retiene el 25% de las ganancias generadas por el torniquete hasta completar el valor del equipo en un plazo de 6 a 12 meses.
>
> *Aplica únicamente para torniquetes. Consulta a tu asesor para más detalles.*

Note: Opción B is a revenue-share model — phrase it clearly and professionally. Do not use the word "crédito" since it is not a formal credit product.

### FAQ

Accordion-style (`FaqAccordion.astro`). Questions and answers:

**¿Qué necesito para cotizar?**
Fotos y medidas del área donde desea controlar el acceso. Con esa información preparamos una propuesta a la medida.

**¿Cuánto cuesta un torniquete?**
El precio depende del modelo, materiales y condiciones de instalación. Realizamos un levantamiento físico para preparar una cotización precisa. Contáctenos para más información.

**¿Qué garantía tienen los productos?**
Nuestros productos tienen garantía de 6 a 12 meses según el modelo, con opción a garantías extendidas de 2 y 3 años.

**¿Cuántos años de experiencia tienen?**
Empezamos a fabricar torniquetes en 2014 y ULTREC se consolidó en 2017. Más de 10 años de experiencia nos respaldan.

**¿Dónde puedo ver referencias de sus clientes?**
Contamos con una cartera de clientes en casi toda la república mexicana. Por protección de datos personales, compartimos referencias bajo autorización del cliente. Solicítelas a su asesor.

**¿Dónde están ubicados?**
Operamos desde la Ciudad de México con cobertura nacional. Nuestra dirección fiscal está en CDMX.

**¿Ofrecen facilidades de pago?**
Sí. Para torniquetes ofrecemos un esquema de 60% de anticipo y 40% a 1–2 meses, o bien un plan de participación en ganancias del 25% durante 6 a 12 meses hasta completar el valor del equipo. Consulta a tu asesor para conocer la opción que mejor se adapte a tu proyecto.

---

## 10. Contacto Page (`/contacto`)

### Contact Form

**Method:** `mailto:` — use an HTML form with `action="mailto:jser.herrera@gmail.com"` and `method="POST" enctype="text/plain"`, OR a styled `<a href="mailto:...">` that pre-fills subject. Keep it simple: no JS form library, no third-party service.

**Recommended approach:** Build a visually styled form that on submit opens the user's mail client with fields pre-populated via a `mailto:` href constructed in JS from the form values. This gives a polished UX without any backend dependency.

**Fields:**
- Nombre completo (required)
- Empresa (required)
- Correo electrónico (required)
- Teléfono (optional)
- Asunto — `<select>` dropdown:
  - Cotización
  - Servicio Técnico
  - Galería
  - Catálogo
  - Contacto General
  - Proyectos Personalizados
  - Videos
  - Cotizador
- Mensaje (required)
- Submit: "Enviar Mensaje" → opens `mailto:jser.herrera@gmail.com` with subject and body pre-filled

### Direct Contact Info Panel

Display alongside or below the form:

| Label | Value |
|---|---|
| Correo ventas | jherrera.ultrec@gmail.com |
| Correo servicios | Servicios.ultrec@gmail.com |
| Tel. ventas / WhatsApp | +52 55 1139 2294 |
| Tel. servicio | +52 55 4968 2196 / +52 55 1191 0216 |
| Dirección | Transvaal 531, Col. 1ro de Mayo, Venustiano Carranza, CDMX 15440 |
| Horario | Lunes a Viernes, 9:00 am – 6:00 pm |

### Map Embed

Paste this iframe directly into the Contacto page. Strip the outer `<div>` wrapper if needed for layout control; keep the `<iframe>` src intact:

```html
<iframe
  width="100%"
  height="450"
  frameborder="0"
  scrolling="no"
  marginheight="0"
  marginwidth="0"
  src="https://maps.google.com/maps?width=100%25&height=600&hl=es&q=transvaal+531,+Col.+1ro+de+Mayo,+Venustiano+Carranza,+CDMX+15440+(Ultrec)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
  title="Ubicación ULTREC"
  aria-label="Mapa de ubicación de ULTREC"
  style="border-radius: 8px; border: 1px solid var(--color-border);">
</iframe>
```

---

## 11. Aviso de Privacidad Page (`/privacidad`)

Generate a standard LFPDPPP-compliant privacy notice in Spanish. Include the following sections:

1. **Identidad y domicilio del responsable** — ULTREC, Transvaal 531, Col. 1ro de Mayo, Venustiano Carranza, CDMX 15440
2. **Datos personales que se recaban** — nombre, empresa, correo electrónico, teléfono, mensaje de contacto
3. **Finalidades del tratamiento** — atención de solicitudes de cotización, soporte técnico, comunicación comercial
4. **Transferencia de datos** — no se transfieren datos a terceros sin consentimiento, salvo obligación legal
5. **Derechos ARCO** — cómo ejercer derechos de Acceso, Rectificación, Cancelación y Oposición (contacto: jherrera.ultrec@gmail.com)
6. **Cookies** — el sitio puede utilizar cookies técnicas de sesión; no se usan cookies de rastreo de terceros
7. **Cambios al aviso** — ULTREC se reserva el derecho de modificar este aviso; la versión vigente estará disponible en este URL
8. **Fecha de última actualización** — [use the current build date]

Keep legal language accurate but readable. Style the page with the same dark theme — use `--color-surface` background, prose width `max-width: 720px`, centered.

---

## 12. Image Assets — Complete Map

All images are sourced from the `imgs/` directory in the project root.

| File | Used in | Notes |
|---|---|---|
| `imgs/logo-ultrec.png` | Header (hero/dark bg), Hero section | Black background baked in |
| `imgs/logo-ultrec-light.png` | Footer, any light surface | Light variant |
| `imgs/hero-img.png` | Home — Hero background | Apply dark overlay rgba(4,13,26,0.70) |
| `imgs/dispositivo-1.png` | Carousel slide 1, Dispositivos card 1 | Torniquete Bidireccional Acero al Carbón |
| `imgs/dispositivo-2.png` | Carousel slide 2, Dispositivos card 2 | Torniquete Bidireccional Acero Inoxidable |
| `imgs/dispositivo-3.png` | Carousel slide 3, Dispositivos card 3 | Torniquete Doble Peine Acero al Carbón |
| `imgs/dispositivo-4.png` | Carousel slide 4, Dispositivos card 4 | Torniquete Doble Peine Acero Inoxidable |
| `imgs/dispositivo-5.png` | Carousel slide 5, Dispositivos card 5 | Control de Acceso 1 Puerta |
| `imgs/dispositivo-6.png` | Carousel slide 6, Dispositivos card 6 | Control de Acceso 2 Puertas Reforzado |
| `imgs/placeholder.png` | Carousel slides 7–10, Identification modules, Vending variants, Client logos | Generic placeholder — cyan-border dark card if missing |
| `imgs/about-photo.png` *(optional)* | Home — About section | If absent, render text-only layout — see §6 |

**Missing image rule:** If a referenced image file does not exist at build time, render a dark div with a `1px solid var(--color-border)` border, the product name as text, and an HTML comment `<!-- IMAGE MISSING: filename.png -->`. Never use external placeholder services.

---

## 13. SEO & Meta

| Field | Value |
|---|---|
| Title pattern | `{Página} \| ULTREC — Sistemas de Acceso y Proyectos en Tecnología` |
| Home meta description | "ULTREC fabrica torniquetes de cuerpo completo, sistemas de control de acceso y máquinas vending para espacios industriales y corporativos en México. Más de 10 años de experiencia." |
| Language | `<html lang="es">` |
| Favicon | Generate from `imgs/logo-ultrec.png` — export as `favicon.ico` and `favicon.svg` in `public/` |
| OG image | 🟡 Create a 1200×630 branded card (logo + tagline on dark bg) — save as `public/og-image.png` |
| Robots | Allow all — no `noindex` on any page |
| Sitemap | Use `@astrojs/sitemap` integration |

All `<img>` elements: descriptive `alt` text in Spanish. Semantic HTML5 throughout.

---

## 14. Site Config File

Create `src/config/site.ts` as the single source of truth. Never hardcode contact info or URLs in components.

```typescript
export const SITE = {
  name: 'ULTREC',
  tagline: 'Sistemas de acceso y proyectos en tecnología',
  description: 'ULTREC fabrica torniquetes de cuerpo completo, sistemas de control de acceso y máquinas vending para espacios industriales y corporativos en México.',
  url: 'https://<github-username>.github.io/<repo-name>', // update when domain acquired

  contact: {
    emailSales:   'jherrera.ultrec@gmail.com',
    emailService: 'Servicios.ultrec@gmail.com',
    phoneSales:   '+52 55 1139 2294',
    phoneService1: '+52 55 4968 2196',
    phoneService2: '+52 55 1191 0216',
    whatsapp:     '5215511392294',
    whatsappMessage: 'Bienvenido a ULTREC. ¿En qué podemos servirte?',
    address:      'Transvaal 531, Col. 1ro de Mayo, Venustiano Carranza, CDMX 15440',
    hours:        'Lunes a Viernes, 9:00 am – 6:00 pm',
  },

  social: {
    tiktok:    'https://tiktok.com/@ultrec_ventas_mexico',
    instagram: 'https://instagram.com/ventasultrecmexico',
    facebook:  'https://www.facebook.com/share/1PK5r4RPec/',
  },
};
```

---

## 15. Code Conventions

- All brand colors via CSS custom properties from §2 — no hardcoded hex values in components.
- All contact info and URLs from `src/config/site.ts` — no hardcoding in templates.
- All external links: `target="_blank" rel="noopener noreferrer"`.
- Component naming: `ProductCard.astro`, `ProductCarousel.astro`, `WhatsAppBubble.astro`, `SalesBanner.astro`, `NavBar.astro`, `Footer.astro`, `FaqAccordion.astro`, `WarrantyTable.astro`, `MapEmbed.astro`.
- Mobile-first. Breakpoints: 375px · 768px · 1024px · 1440px.
- Accessibility: WCAG AA contrast on all text, keyboard navigation, `aria-label` on all icon-only interactive elements.
- All animations behind `@media (prefers-reduced-motion: no-preference)`.
- GitHub Pages subpath: use `import.meta.env.BASE_URL` for all asset and internal link references.
- No inline styles except computed/dynamic values.

---

## 16. Remaining Open Items

Only two items still need client input before the site is 100% complete:

| ID | Item | Impact |
|---|---|---|
| 🟡 1 | Which competing brands does ULTREC service (multimarca)? | Accesorios page copy — currently generic |
| 🟡 2 | OG image (1200×630px) for social sharing | SEO/social previews — can be auto-generated at build time as fallback |

Everything else is fully defined and ready to implement.
