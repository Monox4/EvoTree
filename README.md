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
npm run preview  
```

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