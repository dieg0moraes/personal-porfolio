# Rename "Thoughts" to "./notes"

## Problem

The "Thoughts" button in the Hero appears alongside GitHub and LinkedIn, making the section look like another social network. Visitors don't understand what it is.

## Decision

Rename the section to `./notes` — a Unix path syntax that fits the terminal aesthetic of the site and immediately signals "something personal that lives on my machine", not a social platform.

## Changes

| Location | Before | After |
|---|---|---|
| Hero button | `Thoughts →` | `./notes →` |
| URL | `/thoughts` | `/notes` |
| Terminal command | `$ cat thoughts.log` | `$ cat notes.log` |
| Page H1 | `Thoughts` | `./notes` |
| Card numbering | `thought.001` | `note.001` |
| Metadata title | `Thoughts \| Diego Moraes` | `Notes \| Diego Moraes` |
| Card links | `/thoughts/[slug]` | `/notes/[slug]` |

## Files Affected

- `src/components/Hero.tsx` — button label and href
- `src/app/thoughts/page.tsx` → rename to `src/app/notes/page.tsx`
- `src/app/thoughts/[slug]/page.tsx` → rename to `src/app/notes/[slug]/page.tsx`
- `src/components/ThoughtCard.tsx` — numbering prefix and link path
