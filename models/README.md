# Original schematic 3D models

These are original Evolving Earth procedural meshes, not downloaded models,
source photographs, or third-party scans. They are **educational low-poly
schematics, not anatomically exact scientific reconstructions**. Shapes,
proportions, colours and surface patterns are interpretive. The models are not
to a common biological scale.

## Attribution and rights

Use the attribution recorded in `manifest.json`:
`Evolving Earth original schematic geometry`.

`license: "project-original"` identifies original project geometry; it is **not**
a CC0, Creative Commons, public-domain, or other open-licence grant. No additional
redistribution licence is asserted here. Scientific references are the existing
`sourceIds` on the corresponding card in `content\catalog.json`. Those references
inform the educational subject; their text, images and models are not reused in
these assets, and the institutions have not endorsed these models.

## Reproduce and inspect

From the project root on Windows:

```powershell
.venv\Scripts\python.exe tools\build_models.py
.venv\Scripts\python.exe -m unittest tests.test_models -v
```

Only Python's standard library is required for generation and geometry tests.
The generator reads actual card IDs and source IDs from the catalog. Unknown
species or missing sources fail before files are written. It never changes the
catalog. `--catalog` and `--output` allow isolated reproducibility checks.

`manifest.json` has no build timestamp. GLB filenames include the first twelve
hex digits of their full SHA-256. Unchanged generation preserves identical bytes.
Previous assets are removed only if the previous manifest explicitly owned
them, their bytes still match its hash, and the new manifest no longer uses
them. Unknown files are retained; collisions or modified owned files fail rather
than being silently overwritten.

Publishing can reuse the same production validator:

```python
from pathlib import Path
from tools.build_models import inspect_glb

measured = inspect_glb(Path(asset_path).read_bytes())
assert measured["triangles"] == manifest_entry["triangles"]
assert measured["speciesId"] == manifest_entry["speciesId"]
```

`inspect_glb` raises `ValueError` for invalid model data and returns measured
`speciesId`, `triangles`, `bytes`, `vertices`, `primitives`, and `bounds`. Its
restricted project profile checks binary headers/chunks, embedded-buffer and
accessor ranges, index types/ranges, finite positions and unit lighting normals,
actual bounds, face area/winding, closed boundaries, positive volume,
normalization, materials, and budgets. It does not merely trust manifest counts.

## Runtime contract

All assets are standard glTF 2.0 binary GLBs with opaque rough PBR materials,
finite normals, real thickness, and no external files, textures, animation,
skeletons, Draco, or other extension/decoder requirements. They are Y-up, grounded
at minimum Y = 0, centred in X/Z, and normalized to maximum dimension = 1.
The animal anterior direction is generally +X before Cesium's native glTF-axis
conversion. The native loader must retain its normal glTF-axis handling.

Each model has 350-1500 triangles and is at most 150 KiB. Components may intersect
as in conventional low-poly modelling; these are render assets, not
manufacturing-ready solids. Fine morphology and colours are not diagnostic
taxonomic evidence.

The producer manifest is an asset handoff, not a second application content
endpoint. Release code should validate it and merge approved records into the
public content model list. URLs are site-relative (`models/<id>.<hash>.glb`), not
domain-root-relative, so deployments under a path prefix can resolve them.

## Morphology and limits

| Card ID | Distinctive solid geometry | Important limitation |
|---|---|---|
| `trilobite` | Cephalic shield, raised axial lobe, paired broad pleural lobes, serial thoracic segments, pygidium and genal spines | Generic trilobite, not a named species or a complete ventral appendage reconstruction |
| `anomalocaris` | Bilateral swimming flaps, stalked eyes, curved spiny frontal appendages and tail fan | Mouth and appendage articulation simplified |
| `archaeocyatha` | Open double-walled reef cups, inner radial elements and pore-like surface marks | Marks suggest pores; they are not a microtomographic reconstruction of connected wall canals |
| `cooksonia` | Naked dichotomously branching axes and terminal sporangia | Species-level branching and sporangium anatomy simplified |
| `dunkleosteus` | Deep fish body, head armour plates, cutting jaw plates, paired fins and vertical tail | Cutting plates are not rows of shark teeth; body proportions remain schematic |
| `tiktaalik` | Flattened broad head, dorsal eyes, supported pectoral fins and fin rays | Fins are not human hands or four walking feet |
| `lepidodendron` | Thick scar-patterned trunk, spreading roots, forked branches and narrow leaf crowns | Crown/branch number and leaf scars exaggerated for visibility; not flowering |
| `meganeura` | Segmented narrow abdomen, compound eyes, six legs, four solid wings and main veins | Wing venation and wing thickness exaggerated |
| `lystrosaurus` | Stout quadrupedal body, beak and paired descending tusks | Generalized dicynodont posture and proportions |
| `diplodocus` | Four weight-bearing limbs, long neck, tiny head and extended whip tail | Neutral illustrative pose, not a biomechanical posture claim |
| `stegosaurus` | Low head, four legs, alternating dorsal plates and four tail spikes | Plate count/shape simplified; display colour speculative |
| `tyrannosaurus` | Large skull/jaw, short two-fingered forelimbs, powerful paired hindlimbs, three-toed feet and counterbalancing tail | Skull fenestrae, muscle/skin detail and feathers not reconstructed |
| `ammonoid` | Expanding coiled shell, contrasting growth bands, mantle/head and fanning solid arms | Generic ammonoid; soft anatomy and shell section interpretive, no internal septa reconstruction |
| `deinotherium` | Four heavy limbs, trunk, ears and downward/backward-curving lower tusks | Catalog range is 16-1.2 Ma: **do not use at 20 Ma** |
| `stromatolite` | Multiple domed mounds with visibly alternating undulating accumulation layers | A microbial-built sedimentary structure, not one organism, animal, or individual species |
| `cloudina` | A cluster of open, thick-walled tubes with overlapping flared collars | Tube nesting exaggerated for readability; biological affinity and soft anatomy not asserted |
| `cycad` | Short thick scale-covered stem, arched rachises, paired narrow leaflets and central schematic cone | A generic cycad habit, not a modern palm or a reconstruction of a specific fossil species |
| `prodeinotherium` | Compact deinothere silhouette, trunk and downward-curving lower incisors | Shares family-level schematic anatomy with Deinotherium; not a diagnostic skeletal model |

Model availability never establishes fossil locality, geographic distribution,
or temporal presence. Use a card's current catalog age range for every time
slice. In particular, do not move `deinotherium` into 20 Ma; use
`prodeinotherium` only if its independently reviewed catalog range contains that
slice. A model without a valid georeferenced occurrence belongs in an explicitly
non-geographic exhibit, not at an invented map coordinate.
