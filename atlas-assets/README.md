# Original record-bound atlas assets

These are original educational schematics, **not photographs, scans, exact
scientific reconstructions, measured site plans, or eyewitness images**. No
museum cast, modern cave-art replica, source photograph or third-party model is
copied. Reference IDs support the subject concept, not a licence to scan a
museum object or reproduce source media.

The independent `manifest.json` binds fifteen GLBs and fifteen transparent SVGs
to **recordId**, not catalog species: eleven frozen first-batch pairs and four
reviewed deep-time collection records from canonical `content\atlas.json`.
Kalodirr is deliberately
excluded: the main release can bind the existing Prodeinotherium asset without
claiming a diagnostic reconstruction of the particular African fossil.

| Record | Representative geometry | Interpretation boundary |
|---|---|---|
| `laetoli-footprints` | Paired foot-shaped relief depressions, heels and five toe marks | Not a cast, measured trackway, known sex/family group or exact maker species |
| `dmanisi-stratum-a-tools` | Faceted knapped core and separate tapered flakes | No maker species or attribution to the younger B fossil layer |
| `dmanisi-stratum-b-hominins` | Thick cranial-vault shell and separate jaw/tooth fragments | No living face, race, precise preserved anatomy or species diagnosis |
| `jebel-irhoud-associated-remains` | Generic cranial/jaw fragments with associated stone motif | Not the exact fossil/assemblage inventory or a facial reconstruction |
| `chauvet-human-activity` | Original animal-line motif on thick rock panel, charcoal/pigment tools | Not traced cave art or a replica; depicted fauna do not establish fossil occurrences |
| `chauvet-cave-bear-remains` | Generalized robust bear body | Illustrates the taxon associated with bone evidence, not a live encounter or contemporaneous human-bear scene |
| `gobekli-tepe-monumental-buildings` | T-pillars and stone enclosure concept | Not a surveyed arrangement, named building or asserted religious function |
| `pompeii-79-ce` | Generic Roman columns/arch, volcano and eruption plume | Not a measured skyline, precise eruption sequence/date within 79 CE, or eyewitness depiction |
| `yellowstone-wolf-restoration` | Wolf and generic open transport-frame motif | Conservation intervention concept, not a particular animal, historical crate or release point |
| `skane-oak-observation` | Oak habit with enlarged lobed leaf and acorn details | Mixed-scale taxon illustration, not the observed tree or its January leaf/fruit state |
| `yellowstone-wolf-monitoring-asof-2025` | Wolf, illustrative monitoring collar and field notebook | Not a known collared individual, equipment specification, current count or real-time distribution |
| `cloudina-shaanxi-510810` | Original nested hard-tube group | Not the exact Shaanxi fossil, colony arrangement or soft anatomy; broad collection envelope is not a precise 540 Ma individual |
| `lystrosaurus-india-891104` | Reused original generalized Lystrosaurus body | Does not diagnose original L. orientalis or accepted L. murrayi; not an individual dated exactly to 251 Ma or the extinction instant |
| `pseudoctenis-greenland-243903` | Original detached pinnate fossil-leaf schematic | Leaf genus only, not a modern cycad, whole plant, invented trunk, exact venation or species-level identification of P. spectabilis |
| `diplodocus-sheep-creek-150350` | Reused original generalized Diplodocus body | Not a measured Sheep Creek skeleton or diagnostic D. carnegii reconstruction; not an individual dated exactly to 150 Ma |

Attribution: `Evolving Earth original atlas schematic assets`.
`project-original` is an authorship marker, **not a CC0/public-domain/open-licence
grant**. First-batch sources come from immutable
`content\timeline-expansion-research.json`; the four additions read their
`sourceIds` from canonical `content\atlas.json`, respectively `pbdb-cloudina`,
`pbdb-lystrosaurus`, `pbdb-cycadales` and `pbdb-diplodocus`. PBDB's data licence
does not license source-paper images; no paper illustrations are copied.

## Reproduce

From the project root on Windows:

```powershell
.venv\Scripts\python.exe tools\build_atlas_assets.py --atlas content\atlas.json
.venv\Scripts\python.exe -m unittest tests.test_atlas_assets -v
```

Only Python's standard library is needed. The script reuses the frozen mesh
primitives and binary packing helper, but assigns a new record-only schema
before emitting files. It does not modify the old model/illustration generators,
assets or manifests, the catalog, public data, application code or dist.
`--research` and `--output` allow isolated reproduction. Omitting `--atlas`
reconstructs just the eleven original pairs into a new directory. Running that
legacy command in an already expanded directory preserves all four added pairs
and their manifest entries; it never prunes them as obsolete. Repeating either
entry point is byte-stable, and canonical record order does not change outputs.
The immutable research record set is checked against the legacy builders, not
the enlarged builder set. No source archive or research input needs rewriting.

The three reused meshes preserve the original frozen geometry and materials
but receive new record-only identity, exact record sources and depiction
limitations. The Pseudoctenis leaf has real thickness and a schematic rachis,
but no trunk, roots, fruit, whole-plant habit or diagnostic species features.
The four collection envelopes remain canonical content facts (635-538.8,
251.902-248.6, 201.4-174.7 and 154.8-143.1 Ma); they are not replaced with the
old species cards' life ranges, and do not imply continuous presence.

Each GLB is self-contained glTF 2.0, Y-up, grounded at minimum Y = 0, centred in
X/Z and unit-normalized to maximum dimension = 1. Components can intersect in
the normal low-poly render-asset style; these are not manufacturing solids.
Opaque rough PBR materials and finite normals support native lighting. No
textures, external buffers, extensions/Draco, skeletons or animations are needed.
Each GLB is at most 150 KiB and 1500 triangles. The animal anterior is generally
+X before the native glTF axis conversion.

SVGs are 512 x 512 orthographic projections of their same-record GLBs with
transparent margins. The GLB SHA-256 is embedded in each SVG's provenance. They
contain only triangle paths, simple grouping, accessible title/description and
record metadata: no scripts, events, external resources, images, styles,
foreignObject, DTDs/entities or processing instructions.

Release validation uses the same production functions as generation/tests:

```python
from tools.build_atlas_assets import inspect_atlas_glb, inspect_atlas_svg

model = inspect_atlas_glb(glb_bytes)
illustration = inspect_atlas_svg(svg_bytes)
assert model["recordId"] == illustration["recordId"] == record_id
```

Both reject malformed inputs with `ValueError` and return `recordId`,
`sourceIds`, `bytes` and measured bounds. The GLB result includes measured
`triangles`; the SVG result includes `dimensions`, `shapes` and `modelSha256`.
The GLB inspector checks actual accessor/index data, finite unit normals,
nondegenerate faces, consistent closed-edge directions, positive volume and
grounded unit normalization. Nested resource fields and SVG document structure
are restricted to the generated, dependency-free profiles.
Validate the returned identity/sources/hash/count against the release record
and manifest; never treat an asset as evidence for dates or coordinates.

Manifest filenames use SHA-256 prefixes and no build timestamp. Unchanged
generation preserves identical bytes. Old files are removed only if the
previous manifest explicitly owned them, their bytes still match its hash, and
the new manifest no longer refers to them. Unknown files are retained; unknown
collisions or hand-edited owned files fail rather than being overwritten.
Concurrent file/manifest changes detected before publication also fail; symlink
outputs and forged/traversing ownership URLs are rejected.
Unselected retained pairs are re-inspected and checked for their identity,
source/count metadata and same-record SVG-to-GLB derivation before publication.

URLs are site-relative `atlas-assets/<recordId>.<sha12>.svg` or `.glb`.
The manifest is a producer handoff, not another application fetch requirement.
Location, dating, as-of timestamps, archaeological-layer distinctions and
regional-vs-occurrence uncertainty remain properties of independently reviewed
atlas records, not geometry. No inferred persons, diagnoses, prehistoric
encounters, exact site details, January phenology or live wolf distributions
are introduced by these illustrations.
