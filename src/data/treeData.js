// ---------------------------------------------------------------
// DATA — hybrid sourcing:
//   • Fossil/transitional "trunk" nodes (Tiktaalik, Ichthyostega,
//     Eryops, Hylonomus, Dimetrodon, Morganucodon, Tyrannosaurus)
//     are hand-curated from Wikipedia, since these precisely-dated
//     transitional taxa aren't placed in Open Tree of Life's
//     synthesis tree (OToL flags Tiktaalik itself as suppressed
//     from synthesis — no confident phylogenetic placement yet).
//   • Living-species branches (marked `clade: true` at their
//     internal branch points) use REAL topology pulled from the
//     Open Tree of Life API (tree_of_life/induced_subtree) for the
//     11 living species in this tree, so those branchings reflect
//     actual published phylogenetic literature rather than guesses.
//   • Nodes labelled "Unknown ancestor" are real divergence points
//     OToL's synthesis didn't assign a single formal clade name to.
// This remains a curated illustrative tree, not an exhaustive
// cladogram — see README for how to extend it further.
// ---------------------------------------------------------------
export const tree = {
  id: 'tiktaalik',
  common: 'Tiktaalik',
  sci: 'Tiktaalik roseae',
  era: '~375–383 mya · Late Devonian',
  desc: "A lobe-finned 'fishapod' with a mobile neck, robust ribcage, and fin bones homologous to a shoulder, elbow and wrist — found on Ellesmere Island, Nunavut in 2004. One of the closest known relatives of the fish-to-tetrapod transition.",
  extinct: true,
  wiki: 'Tiktaalik',
  children: [
    {
      id: 'ichthyostega',
      common: 'Ichthyostega',
      sci: 'Ichthyostega stensioei',
      era: '~365 mya · Late Devonian',
      desc: 'One of the earliest known limbed vertebrates with digits, described from East Greenland. Still largely aquatic, with a fish-like tail alongside sturdy limbs.',
      extinct: true,
      wiki: 'Ichthyostega',
      children: [
        {
          id: 'eryops',
          common: 'Eryops',
          sci: 'Eryops megacephalus',
          era: '~295 mya · Early Permian',
          desc: 'A large, heavily built early amphibian relative from North America, representative of the temnospondyl lineage leading toward modern amphibians.',
          extinct: true,
          wiki: 'Eryops',
          children: [
            {
              id: 'clade_anura',
              common: 'Anura',
              sci: 'Anura',
              era: 'clade · frogs & toads',
              desc: 'The frog and toad order — over 7,000 living species, unified by a tailless adult body plan and powerful hind legs.',
              extinct: false,
              clade: true,
              wiki: 'Frog',
              children: [
                { id: 'bullfrog', common: 'American bullfrog', sci: 'Lithobates catesbeianus', era: 'present', desc: 'A large, widespread frog native to eastern North America, now introduced globally.', extinct: false, wiki: 'American_bullfrog', children: [] },
                { id: 'common_toad', common: 'Common toad', sci: 'Bufo bufo', era: 'present', desc: 'A widespread European toad known for long-distance seasonal migrations back to its natal breeding pond.', extinct: false, wiki: 'Common_toad', children: [] },
                { id: 'tree_frog', common: 'European tree frog', sci: 'Hyla arborea', era: 'present · declining', desc: 'A small, bright green climbing frog found across much of Europe, named for its arboreal habits.', extinct: false, wiki: 'European_tree_frog', children: [] },
              ],
            },
            {
              id: 'clade_caudata',
              common: 'Caudata',
              sci: 'Caudata',
              era: 'clade · salamanders',
              desc: 'The salamander order — tailed amphibians, many capable of regenerating entire limbs.',
              extinct: false,
              clade: true,
              wiki: 'Salamander',
              children: [
                { id: 'axolotl', common: 'Axolotl', sci: 'Ambystoma mexicanum', era: 'present · endangered', desc: "A neotenic salamander from Mexico City's lake system, famed for retaining larval features and regenerating limbs as an adult.", extinct: false, wiki: 'Axolotl', children: [] },
                { id: 'fire_salamander', common: 'Fire salamander', sci: 'Salamandra salamandra', era: 'present', desc: 'A striking black-and-yellow salamander native to Europe, historically the source of many salamander-and-fire myths.', extinct: false, wiki: 'Fire_salamander', children: [] },
                { id: 'olm', common: 'Olm', sci: 'Proteus anguinus', era: 'present · vulnerable', desc: 'A blind, cave-dwelling salamander from the Balkans that can survive without food for over a decade — the only European cave vertebrate of its kind.', extinct: false, wiki: 'Olm', children: [] },
              ],
            },
            {
              id: 'clade_gymnophiona',
              common: 'Gymnophiona',
              sci: 'Gymnophiona',
              era: 'clade · caecilians',
              desc: 'Limbless, burrowing (or aquatic) amphibians often mistaken for worms or snakes.',
              extinct: false,
              clade: true,
              wiki: 'Caecilian',
              children: [
                { id: 'caecilian_sp', common: 'Rio Cauca caecilian', sci: 'Typhlonectes natans', era: 'present', desc: 'An aquatic, limbless caecilian from South America, often kept in the aquarium trade.', extinct: false, wiki: 'Typhlonectes_natans', children: [] },
                { id: 'mexican_caecilian', common: 'Mexican burrowing caecilian', sci: 'Dermophis mexicanus', era: 'present', desc: 'A terrestrial, burrowing caecilian from Central America, one of the better-studied species in its order.', extinct: false, wiki: 'Dermophis_mexicanus', children: [] },
              ],
            },
          ],
        },
        {
          id: 'hylonomus',
          common: 'Hylonomus',
          sci: 'Hylonomus lyelli',
          era: '~318 mya · Carboniferous',
          desc: 'The earliest known amniote, a small lizard-like reptile from Nova Scotia. Marks the point reproduction broke free of standing water via the amniotic egg.',
          extinct: true,
          wiki: 'Hylonomus',
          children: [
            {
              id: 'clade_sauropsida',
              common: 'Sauropsida',
              sci: 'Sauropsida',
              era: 'clade · Open Tree of Life',
              desc: 'The reptile-and-bird branch of amniotes — turtles, lizards/snakes, crocodilians, and (via dinosaurs) birds. Topology below sourced from Open Tree of Life.',
              extinct: false,
              clade: true,
              wiki: 'Sauropsida',
              children: [
                {
                  id: 'clade_archelosauria',
                  common: 'Archelosauria',
                  sci: 'Archelosauria',
                  era: 'clade · named 2015 (Crawford et al.)',
                  desc: 'The clade uniting turtles with archosaurs (crocodilians + birds), to the exclusion of lizards and snakes. Long contested: molecular data supported this grouping for years while most morphology-based studies placed turtles elsewhere; a 2022 study finally found morphological support too.',
                  extinct: false,
                  clade: true,
                  wiki: 'Archelosauria',
                  children: [
                    {
                      id: 'clade_archosauria',
                      common: 'Archosauria',
                      sci: 'Archosauria',
                      era: 'clade · crown group',
                      desc: 'The most recent common ancestor of living birds and crocodilians, and all its descendants. Splits into Pseudosuchia (crocodilians and relatives) and Avemetatarsalia (birds and their extinct dinosaur/pterosaur relatives).',
                      extinct: false,
                      clade: true,
                      wiki: 'Archosaur',
                      children: [
                        {
                          id: 'trex',
                          common: 'Tyrannosaurus',
                          sci: 'Tyrannosaurus rex',
                          era: '~68–66 mya · Late Cretaceous',
                          desc: 'One of the largest land predators known, from western North America, among the last non-avian dinosaurs before the end-Cretaceous extinction. Open Tree of Life does not include non-avian dinosaurs in its synthesis, so this fossil link is hand-added from the palaeontological literature to connect crown birds to their dinosaurian ancestry.',
                          extinct: true,
                          wiki: 'Tyrannosaurus',
                          children: [
                            { id: 'gallus', common: 'Red junglefowl', sci: 'Gallus gallus', era: 'present', desc: 'A forest bird of South and Southeast Asia and the wild ancestor of the domestic chicken — a living descendant of the theropod dinosaur lineage.', extinct: false, wiki: 'Red_junglefowl', children: [] },
                          ],
                        },
                        { id: 'crocodylus', common: 'Nile crocodile', sci: 'Crocodylus niloticus', era: 'present', desc: 'A large African crocodilian, among the closest living relatives of birds through a shared archosaur ancestry.', extinct: false, wiki: 'Nile_crocodile', children: [] },
                      ],
                    },
                    { id: 'chelonia', common: 'Green sea turtle', sci: 'Chelonia mydas', era: 'present · endangered', desc: 'A large sea turtle found in tropical and subtropical oceans worldwide, named for the greenish colour of its fat.', extinct: false, wiki: 'Green_sea_turtle', children: [] },
                  ],
                },
                { id: 'varanus', common: 'Komodo dragon', sci: 'Varanus komodoensis', era: 'present · vulnerable', desc: 'The largest living lizard, found only on a few Indonesian islands, capable of taking down prey much larger than itself.', extinct: false, wiki: 'Komodo_dragon', children: [] },
              ],
            },
            {
              id: 'dimetrodon',
              common: 'Dimetrodon',
              sci: 'Dimetrodon grandis',
              era: '~295–272 mya · Early Permian',
              desc: 'A sail-backed synapsid, not a dinosaur, from the Permian of North America — closer to the mammal lineage than to any reptile.',
              extinct: true,
              wiki: 'Dimetrodon',
              children: [
                {
                  id: 'morganucodon',
                  common: 'Morganucodon',
                  sci: 'Morganucodon watsoni',
                  era: '~205 mya · Late Triassic',
                  desc: 'A shrew-sized, early mammal-relative from Wales, among the earliest animals with a mammal-like jaw joint and hearing bones.',
                  extinct: true,
                  wiki: 'Morganucodon',
                  children: [
                    {
                      id: 'clade_theria',
                      common: 'Theria',
                      sci: 'Theria',
                      era: 'clade · Open Tree of Life',
                      desc: 'The mammal subclass containing all living marsupials and placentals — branch topology sourced from the Open Tree of Life synthesis rather than hand-estimated.',
                      extinct: false,
                      clade: true,
                      wiki: 'Theria_(mammal_subclass)',
                      children: [
                        {
                          id: 'clade_boreoeutheria',
                          common: 'Boreoeutheria',
                          sci: 'Boreoeutheria',
                          era: 'clade · Open Tree of Life',
                          desc: 'A major placental mammal clade containing primates, carnivorans, cetaceans and their relatives.',
                          extinct: false,
                          clade: true,
                          wiki: 'Boreoeutheria',
                          children: [
                            {
                              id: 'clade_primates',
                              common: 'Primates',
                              sci: 'Primates',
                              era: '~63–74 mya divergence',
                              desc: 'The order Primates splits at its root into two suborders: Strepsirrhini (lemurs, lorises, galagos) and Haplorrhini (tarsiers, monkeys, apes, and humans) — the two branches shown here.',
                              extinct: false,
                              clade: true,
                              wiki: 'Primate',
                              children: [
                                {
                                  id: 'clade_catarrhini',
                                  common: 'Catarrhini',
                                  sci: 'Catarrhini',
                                  era: 'clade · Old World monkeys & apes',
                                  desc: 'The primate infraorder uniting Old World monkeys with apes (including humans), to the exclusion of New World monkeys.',
                                  extinct: false,
                                  clade: true,
                                  wiki: 'Catarrhini',
                                  children: [
                                    {
                                      id: 'clade_hominini',
                                      common: 'Hominini',
                                      sci: 'Hominini',
                                      era: '~6–7 mya divergence',
                                      desc: 'The tribe uniting Homo and Pan (humans and chimpanzees/bonobos), diverging from a shared hominoid ancestor roughly 6–7 million years ago.',
                                      extinct: false,
                                      clade: true,
                                      wiki: 'Hominini',
                                      children: [
                                        {
                                          id: 'clade_homo',
                                          common: 'Homo',
                                          sci: 'Homo',
                                          era: '~300,000–600,000 years divergence',
                                          desc: 'The human genus. Homo sapiens and Homo neanderthalensis shared a common ancestor and are known to have interbred before Neanderthals went extinct roughly 40,000 years ago.',
                                          extinct: false,
                                          clade: true,
                                          wiki: 'Homo_(genus)',
                                          children: [
                                            { id: 'humans', common: 'Human', sci: 'Homo sapiens', era: '~300,000 years ago', desc: 'The only surviving species of genus Homo, first known from fossils in Jebel Irhoud, Morocco.', extinct: false, wiki: 'Homo_sapiens', children: [] },
                                            { id: 'neanderthal', common: 'Neanderthal', sci: 'Homo neanderthalensis', era: '~430,000–40,000 years ago', desc: 'An extinct human species that lived across Europe and parts of Asia, closely related enough to Homo sapiens that the two interbred before Neanderthals disappeared.', extinct: true, wiki: 'Neanderthal', children: [] },
                                          ],
                                        },
                                        {
                                          id: 'clade_pan',
                                          common: 'Pan',
                                          sci: 'Pan',
                                          era: '~1–2 mya divergence',
                                          desc: 'The genus containing chimpanzees and bonobos, humans’ closest living relatives.',
                                          extinct: false,
                                          clade: true,
                                          wiki: 'Pan_(genus)',
                                          children: [
                                            { id: 'chimp', common: 'Chimpanzee', sci: 'Pan troglodytes', era: 'present · endangered', desc: "Found across equatorial Africa, humans' closest living relative, sharing a common ancestor roughly 6–7 million years ago.", extinct: false, wiki: 'Chimpanzee', children: [] },
                                            { id: 'bonobo', common: 'Bonobo', sci: 'Pan paniscus', era: 'present · endangered', desc: 'Found only south of the Congo River, bonobos are as closely related to humans as chimpanzees but have a markedly more matriarchal, less aggressive social structure.', extinct: false, wiki: 'Bonobo', children: [] },
                                          ],
                                        },
                                      ],
                                    },
                                    { id: 'macaque', common: 'Rhesus macaque', sci: 'Macaca mulatta', era: 'present', desc: 'One of the best-studied primates in biomedical research, native to South, Central and Southeast Asia, representing the Old World monkeys.', extinct: false, wiki: 'Rhesus_macaque', children: [] },
                                  ],
                                },
                                { id: 'lemur', common: 'Ring-tailed lemur', sci: 'Lemur catta', era: 'present · endangered', desc: 'A primate endemic to Madagascar, representative of the earliest-branching living primate lineages.', extinct: false, wiki: 'Ring-tailed_lemur', children: [] },
                              ],
                            },
                            {
                              id: 'clade_common_ancestor_laurasiatheria',
                              common: 'Unknown ancestor',
                              sci: '(contested placement)',
                              era: 'clade · Late Cretaceous, ~80–100 mya',
                              desc: 'Shared ancestor of the whale/even-toed-ungulate lineage (Cetartiodactyla) and the carnivoran lineage. Unlike the other named nodes in this tree, this one is genuinely unresolved in the literature — candidate names like Ferungulata, Zooamata and Fereuungulata each have some molecular support, but studies actively disagree on which grouping is correct, so no name is used here rather than overstating certainty.',
                              extinct: false,
                              clade: true,
                              wiki: null,
                              children: [
                                {
                                  id: 'clade_cetacea',
                                  common: 'Cetacea',
                                  sci: 'Cetacea',
                                  era: 'clade · whales, dolphins & porpoises',
                                  desc: 'Fully aquatic marine mammals descended from small hoofed, deer-like ancestors. Splits into baleen whales (Mysticeti) and toothed whales (Odontoceti).',
                                  extinct: false,
                                  clade: true,
                                  wiki: 'Cetacea',
                                  children: [
                                    {
                                      id: 'clade_mysticeti',
                                      common: 'Mysticeti',
                                      sci: 'Mysticeti',
                                      era: 'clade · baleen whales',
                                      desc: 'Filter-feeding whales that use baleen plates instead of teeth, including the largest animals ever known to have existed.',
                                      extinct: false,
                                      clade: true,
                                      wiki: 'Baleen_whale',
                                      children: [
                                        { id: 'bluewhale', common: 'Blue whale', sci: 'Balaenoptera musculus', era: 'present · endangered', desc: 'The largest animal known to have ever existed.', extinct: false, wiki: 'Blue_whale', children: [] },
                                        { id: 'humpback', common: 'Humpback whale', sci: 'Megaptera novaeangliae', era: 'present', desc: 'Known for complex, evolving songs and dramatic breaching, found in every ocean on long annual migrations.', extinct: false, wiki: 'Humpback_whale', children: [] },
                                      ],
                                    },
                                    {
                                      id: 'clade_odontoceti',
                                      common: 'Odontoceti',
                                      sci: 'Odontoceti',
                                      era: 'clade · toothed whales',
                                      desc: 'Echolocating whales with teeth rather than baleen, including dolphins, orcas, and sperm whales.',
                                      extinct: false,
                                      clade: true,
                                      wiki: 'Toothed_whale',
                                      children: [
                                        { id: 'orca', common: 'Orca', sci: 'Orcinus orca', era: 'present', desc: 'The largest dolphin species and an apex predator found in every ocean, living in complex, matriarchal family pods.', extinct: false, wiki: 'Killer_whale', children: [] },
                                        { id: 'sperm_whale', common: 'Sperm whale', sci: 'Physeter macrocephalus', era: 'present · vulnerable', desc: 'The largest toothed predator on Earth, capable of diving over 2,000 metres to hunt giant squid.', extinct: false, wiki: 'Sperm_whale', children: [] },
                                        { id: 'bottlenose', common: 'Common bottlenose dolphin', sci: 'Tursiops truncatus', era: 'present', desc: 'One of the most widely studied cetaceans, found in temperate and tropical waters worldwide.', extinct: false, wiki: 'Common_bottlenose_dolphin', children: [] },
                                      ],
                                    },
                                  ],
                                },
                                { id: 'lion', common: 'Lion', sci: 'Panthera leo', era: 'present · vulnerable', desc: 'A large carnivoran found mainly in sub-Saharan Africa, unified with other carnivorans by specialised shearing teeth.', extinct: false, wiki: 'Lion', children: [] },
                              ],
                            },
                          ],
                        },
                        { id: 'kangaroo', common: 'Eastern grey kangaroo', sci: 'Macropus giganteus', era: 'present', desc: 'A large pouched marsupial from eastern Australia.', extinct: false, wiki: 'Eastern_grey_kangaroo', children: [] },
                      ],
                    },
                    { id: 'platypus', common: 'Platypus', sci: 'Ornithorhynchus anatinus', era: 'present', desc: 'An egg-laying, venomous, duck-billed mammal from eastern Australia — the most basal living mammal lineage.', extinct: false, wiki: 'Platypus', children: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};