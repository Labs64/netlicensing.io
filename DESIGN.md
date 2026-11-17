---
name: NetLicensing.io
description: Warm ember-and-umber marketing site for a Licensing-as-a-Service platform; light-weight Roboto, flat Bootstrap 3 grid, restrained Material-era cards.
colors:
  # Official brand palette (normative)
  brand-ember: "#E14817"
  brand-light-orange: "#F08B53"
  brand-umber: "#7B2A10"
  brand-sienna: "#AB6543"
  brand-amber: "#F2951C"
  brand-grey: "#87888A"
  brand-black: "#000000"
  brand-grey-515: "#515151"
  brand-grey-5f: "#5F5F5F"
  brand-grey-66: "#666666"
  brand-grey-97: "#979797"
  brand-grey-9a: "#9A9A9A"
  # Site tints and surfaces not on the brand sheet (see Colors)
  apricot: "#F9E1C4"
  peach: "#FDDCB5"
  cream-wash: "#FFF8EF"
  page-paper: "#F9F9F9"
  white: "#FFFFFF"
  hairline: "#EEEEEE"
  rule: "#E7E7E7"
  banner-yellow: "#FEFBA9"
typography:
  display:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 300
    lineHeight: "42px"
  headline:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 300
    lineHeight: "36px"
  title:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: "24px"
  body:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 300
    lineHeight: "22px"
  label:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "14px"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "10px"
  pill: "12px"
spacing:
  xs: "5px"
  sm: "15px"
  md: "20px"
  lg: "50px"
components:
  button-dark:
    backgroundColor: "transparent"
    textColor: "{colors.brand-umber}"
    rounded: "{rounded.xs}"
    padding: "0.5em 2em"
  button-dark-hover:
    backgroundColor: "{colors.brand-umber}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "transparent"
    textColor: "{colors.apricot}"
    padding: "0.5em 2em"
  button-light-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-umber}"
  button-orange:
    backgroundColor: "transparent"
    textColor: "{colors.brand-ember}"
    padding: "0.5em 2em"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.xs}"
    padding: "1.6rem"
  picker-card:
    backgroundColor: "{colors.cream-wash}"
    rounded: "{rounded.lg}"
    padding: "22px 20px 20px"
  pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-umber}"
    rounded: "{rounded.md}"
    height: "32px"
  badge:
    backgroundColor: "{colors.brand-ember}"
    textColor: "{colors.white}"
    rounded: "{rounded.xs}"
    padding: "3px 6px"
  footer:
    backgroundColor: "{colors.brand-ember}"
    textColor: "{colors.apricot}"
---

# Design System: NetLicensing.io

## Overview

**Creative North Star: "The Warm Ledger"**

A licensing product that has to feel trustworthy rather than clinical. The site reads like a well-kept ledger on warm paper: brown headings and links on near-white, the brand's hot orange-red reserved for hover and the footer, apricot as the soft background tint. Type is Roboto at light weight, so pages feel airy and technical without shouting.

Structure is plain Bootstrap 3: centered headings, grid rows, flat sections. Depth is minimal and Material-era (2px cards, hairline borders). Newer pieces (pricing plan picker, dropdown nav) soften corners to 8-10px but stay on the same palette. Personality comes from colour and copy, not ornament.

**Key Characteristics:**
- Brand ember (`#E14817`) is the primary; a deep brown carries headings and links at rest (brand Umber `#7B2A10`).
- Light weight (300) type, 15px body, centered h2 section titles.
- Flat by default; borders and tints do the layering.
- Dotted underline on inline links is the signature micro-detail.
- Data-driven sections (cards, tiles, tables) built from YAML, so components must tolerate varying content length.

## Colors

The brand sheet defines one hot orange-red, a warm family around it (light orange, amber, umber, sienna), and a neutral grey ramp. The site applies it on near-white paper: umber for headings and links, ember for hover and emphasis, #515151 body text and #9A9A9A meta text, with apricot and cream tints that the brand sheet does not list.

### Brand palette (normative)
- **Ember** (#E14817): the brand primary. Hover, badges, footer field, emphasis.
- **Light Orange** (#F08B53): soft accent and gradient partner for ember.
- **Amber** (#F2951C): highlight and warm accent; the pricing "best fit" ring.
- **Umber** (#7B2A10): deepest brand brown; heading, link and dark-button colour on light backgrounds.
- **Sienna** (#AB6543): mid brown for secondary accents, rules and illustration.
- **Brand Grey** (#87888A): secondary UI and icon grey.

### Brand neutrals (B&W)
- **Black** (#000000), **#515151**, **#5F5F5F**, **#666666**: text, from strongest to softest. Body text should come from this set.
- **#979797**, **#9A9A9A**: meta text, disabled states, tooltips.

### Site-only colours (not on the brand sheet)
- **Apricot** (#F9E1C4), **Peach** (#FDDCB5), **Cream Wash** (#FFF8EF), **Page Paper** (#F9F9F9), **Hairline** (#EEE), **Rule** (#E7E7E7), **Banner Yellow** (#FEFBA9): tints and surfaces. Tints of brand colours are acceptable; they are not separate brand colours.

### Named Rules
**The Brand Sheet Rule.** New work draws colour only from the brand palette and tints of it. Site-only colours are legacy; do not extend their use.
**The Reaction Rule.** Umber at rest, ember on hover/active. Do not swap them.
**The Footer Fire Rule.** Large ember fields appear only in the footer and tiny badges; sections stay on white or paper.

## Typography

**Display / Body Font:** Roboto (Helvetica, Arial, sans-serif fallback), weight 300 throughout.

**Character:** One family, one light weight; hierarchy comes from size and colour, with bold reserved for pills and prices.

### Hierarchy
- **Display** (300, 36px, 42px): h1 in hero banners, white on the stage image; umber on blog posts.
- **Headline** (300, 24px, 36px): h2 section titles, centered, #515151.
- **Title** (300, 18px, 24px): h3 card and column titles, umber.
- **Body** (300, 15px, 22px): paragraphs and spans, #515151.
- **Label** (400, 10-12px, uppercase for badges): watermarks, tags, footer legal.

### Named Rules
**The Light Weight Rule.** Headings stay 300. Do not introduce bold headings; use size and colour.
**The Span Trap Rule.** `span` is globally 15px/#515151; components that nest spans (pills, pickers) must reset to `inherit`.

## Layout

Bootstrap 3 12-column grid inside centered containers; blog sections cap at 1220px, footer at 1600px. Vertical rhythm uses 15/20/50px steps (inline, block, section). Hero banners are full-bleed images with white h1. Content is mostly centered; data sections (features, models, case studies, pricing) are grids of cards or columns. Responsive breakpoints follow Bootstrap (768 / 992 / 1200); the pricing table collapses to right-aligned rows under 768px, and the nav needs tighter padding between 768-991px to stay on one row.

## Elevation & Depth

Mostly flat. Depth is tonal (white cards on paper) plus two Material shadows for cards, and one soft drop for floating menus. Interaction is shown by opacity (0.8 on image hover, 0.5 on non-matching pricing plans) rather than lift.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)`): material cards.
- **Menu float** (`box-shadow: 0 6px 20px rgba(0,0,0,.1)`): dropdown nav.
- **Plan match** (`box-shadow: 0 0 0 3px #F2951C, 0 6px 18px rgba(0,0,0,.18)`): the recommended pricing column.

### Named Rules
**The Flat-Until-Chosen Rule.** Shadows mark floating or selected things only, never decoration.

## Shapes

Small, honest corners: 2px on legacy cards, buttons and badges; 4px on dropdown items and containers; 8-10px on the newer pricing picker, pills and soft cards; 12px for the "Best fit" tag and 50% for round avatars and icon circles. Borders are 1px hairline, with 2px for outline buttons. Inline links carry a 1px dotted underline that disappears on hover.

## Components

### Buttons
- **Shape:** near-square (2px) outline buttons, padding `0.5em 2em`, 1.5rem text.
- **Dark (`NL_dark_btn`):** umber outline and text; fills umber with white text on hover.
- **Light (`NL_light_btn`):** apricot outline on dark/hero backgrounds; fills white with umber text on hover.
- **Orange (`NL_orange_btn`):** ember outline for secondary emphasis.
- Buttons are outlined, not solid, by default.

### Cards / Containers
- **Material card:** white, 2px radius, 1.6rem padding, two-layer shadow, image on top at 100% width.
- **Related-post tile:** `#FAFAFA` body, umber h4 turning ember on hover, ember uppercase watermark badge.
- **Picker card:** cream-wash tint, 10px radius, hairline apricot border.

### Navigation
White navbar at 0.95 opacity. Dropdown menu: white, 3px umber top border, 540px min width, two-column grid of items; item hover is cream-wash (`#FFF8EF`) with 4px radius.

### Pricing table
Columns of alternating 2%/5% black row tints, centered cells, Y renders a check and N an empty square. Recommended plan gets the amber ring and an ember "Best fit" pill.

### Footer
Full ember field, apricot text and social icons, 12px legal line.

## Do's and Don'ts

### Do:
- **Do** pick colours from the brand palette (ember, light orange, amber, umber, sienna, brand greys); keep brown for headings/links at rest and ember for hover and emphasis.
- **Do** keep Roboto at weight 300 and rely on size and colour for hierarchy.
- **Do** build new sections from existing parts: Bootstrap grid, material card, outline buttons, data from `_data/*.yml`.
- **Do** reset nested `span` colour and size to `inherit` inside custom components.
- **Do** use apricot/cream tints for soft emphasis blocks.

### Don't:
- **Don't** introduce colours outside the brand palette (or tints of it), solid heavy buttons, or new fonts.
- **Don't** use bold headings or large ember fields outside the footer and badges.
- **Don't** add decorative shadows or gradients; shadows signal floating or selected states.
- **Don't** build new layouts in brand colours when an existing section pattern fits.
- **Don't** hard-code new hex values in `netlicensing.css`; add them to `_scss/_variables.scss` first.
