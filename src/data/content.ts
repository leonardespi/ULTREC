import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CarouselSlide {
  name: string;
  image: string;
  description: string;
}

export interface Product {
  name: string;
  image: string;
  description: string;
  variants?: string[];
}

export interface Category {
  id: string;
  title: string;
  products: Product[];
}

export interface IdentificationItem {
  label: string;
  description: string;
}

export interface SiteContent {
  hero: { image: string };
  carousel: CarouselSlide[];
  dispositivos: {
    categories: Category[];
    identification: IdentificationItem[];
  };
}

// ── Load & parse ─────────────────────────────────────────────────────────────

const raw = readFileSync(resolve('src/data/content.yml'), 'utf-8');
const data = yaml.load(raw) as SiteContent;

// ── Image resolver ────────────────────────────────────────────────────────────
// Returns a URL-ready path for use in templates.
// Falls back to placeholder.png if the file is absent from Imgs/.

const PLACEHOLDER = 'placeholder.png';

export function resolveImg(filename: string): string {
  const target = existsSync(resolve('Imgs', filename)) ? filename : PLACEHOLDER;
  return target;
}

// ── Exports ──────────────────────────────────────────────────────────────────

export const heroImage = resolveImg(data.hero.image);

export const carouselSlides: CarouselSlide[] = data.carousel.map(slide => ({
  ...slide,
  image: resolveImg(slide.image),
}));

export const dispositivosCategories: Category[] = data.dispositivos.categories.map(cat => ({
  ...cat,
  products: cat.products.map(p => ({
    ...p,
    image: resolveImg(p.image),
  })),
}));

export const identificationItems: IdentificationItem[] = data.dispositivos.identification;
