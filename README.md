# Tree of Life — React prototype

An interactive, expandable phylogenetic tree starting from *Tiktaalik roseae*.
Left-click a node to branch/collapse it. Right-click opens the species'
Wikipedia page. Hovering fetches a live summary + image from the Wikipedia
REST API.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

The build output lands in `dist/` — deploy that folder to Vercel, Netlify,
or any static host.

## Project structure

```
src/
  data/treeData.js       — the phylogeny itself (species-level nodes)
  utils/layout.js         — pure tree-layout math (positions, wobble)
  hooks/usePanDrag.js      — click-and-drag panning
  hooks/useWikiSummary.js  — Wikipedia REST API fetch + cache
  components/
    TreeNode.jsx           — a single node card
    Branches.jsx            — the SVG connector curves
    Tooltip.jsx              — hover card (image + summary)
  App.jsx                  — ties it all together
  styles.css                — beige/brown phylogenetic-tree theme
```

## Notes for next steps

- `treeData.js` is currently hand-typed. For real scale, swap this for a
  fetch from the Open Tree of Life API or a Wikidata SPARQL query, or move
  it into a small database/CMS so it's editable without redeploying.
- The Wikipedia fetch is client-side and uncached across sessions — for
  production traffic you'd want a small server-side cache/proxy so you're
  not hammering Wikipedia's API on every visitor's every hover.
- Layout is currently recomputed fully on every expand/collapse. Fine at
  this scale; if the tree grows into the hundreds/thousands of nodes,
  consider `d3-hierarchy` for layout and virtualizing off-screen nodes.
