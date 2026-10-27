# Pet Care — design plan

**Concept: Placa.** Friendly and playful, built around a pet's ID tag. Every
price is engraved on a bone-shaped metal tag that hangs from its ring and
jingles when you point at the card or add the item; a line-art dog and cat
peek over the hero's edge; categories are round photos in rings of their own
colour; adding to the order sends a short trail of paw prints to the cart.

Serves: pet shops, groomers, vets and pet hotels — food and accessories next
to baths, check-ups and day care sold as services.

## Palette

| Token | Hex | Role |
|---|---|---|
| teal | `#0E5A5C` | the store's accent (org primary): buttons, active nav, footer |
| apricot | `#F4A04B` | hero, cart count, CTA button on teal |
| tag silver | `#C9CED3` | the ID tags (with a light metal sheen) |
| kibble | `#8A5A3B` | category labels, the paw trail |
| rust | `#9C4A12` | offers |
| mist | `#F2F4F5` | page |
| ink | `#1F2A2B` | text |

Contrast (computed): ink on mist 13.4:1 · soft ink `#53605F` on mist 5.9:1 ·
white on teal 8.0:1 · ink on apricot 7.0:1 (hero text is ink, never teal:
teal on apricot is 3.8:1) · kibble on mist 5.3:1 · rust on white 6.2:1 ·
engraved `#36403F` on the tag silver ≈ 6.7:1.

## Type

**Baloo 2** (500–800) for display and the engraved prices — round and warm —
and **Nunito Sans** for text. No all-caps eyebrows, no monospace.

## Layout

```
HOME
┌ apricot ────────────────────────────────┬───────────────────────────┐
│ (white pill) Para perros y gatos         │   ╭ blob photo ╮          │
│ Todo para tu mascota, en un solo lugar   │   │  (white    │          │
│ [Ver productos y cuidados] [Agendar]     │   ╰  border)   ╯          │
│              🐶 🐱  peeking over the edge                            │
└─────────────────────────────────────────┴───────────────────────────┘
 Para cada mascota: round category photos in rings of their colour
 Lo nuevo: soft white cards, 2 across on phones, 4 on wide screens;
           each with a bone tag ⟨₡24 500⟩ hanging at the top right
 benefits cards · story · teal CTA with an apricot button
CATALOG: title + count │ search + Filtros (sheet on phones) │ chips with the
category's photo │ groups headed by a round photo │ the same cards
PRODUCT: photo in a white border with a large bone tag │ name, price, text,
fact grid (category, type, duration, availability), add (the tag jingles)
```

## Signature

`BoneTag` (SVG bone with a ring and metal sheen, engraved price) swings on
its ring (`.tag-swing`, CSS) on hover/focus and again on add; `Header` shows a
three-step paw trail beside the cart on every add. Both are CSS only and stop
under reduced motion. `PeekingPets` is static line art. No WebGL.

## Changed from the generic default

- No pastel-gradient pet shop: a solid apricot hero, teal actions, silver tags.
- Prices are tags, not a line under every card.
- Categories are round photos in their own colours, from the POS data.
