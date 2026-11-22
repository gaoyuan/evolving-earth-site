# Original transparent illustrations

`manifest.json` maps all 24 reviewed catalog cards to self-contained, transparent
512 x 512 SVG illustrations. These are **schematic educational illustrations,
not photographs or precise scientific reconstructions**. Colour, pose, scale
and fine anatomy are interpretive; an image does not establish a fossil locality,
biological distribution, or age.

Eighteen images are original orthographic projections of the project's frozen
GLB meshes, with direction-specific framing, face visibility and flat shading.
The GLBs are read and hash-checked, never regenerated or modified. Their source
SHA-256 is embedded in the SVG provenance. Six additional drawings are original
vector art: `graptolite` (colonial stipes and repeated thecae), `brachiopod`
(bilaterally symmetric ribbed shell), `archaeopteris` (woody trunk and fern-like
foliage), `coelophysis` (slender biped, small head and long tail),
`archaeopteryx` (feathered wings and long feathered bony tail), and `triceratops`
(neck frill, three horns and quadrupedal body).

Attribution: `Evolving Earth original schematic illustration`.
`project-original` records project authorship; it is **not a CC0, public-domain
or other open-licence grant**. Scientific references are copied by ID from the
existing catalog card; reference media are not copied or embedded.

From the project root on Windows:

```powershell
.venv\Scripts\python.exe tools\build_illustrations.py
.venv\Scripts\python.exe -m unittest tests.test_illustrations -v
```

The generator and structural tests require only the Python standard library.
The generator reads `content\catalog.json` and `web\public\models\manifest.json`.
`--catalog`, `--models` and `--output` support isolated reproduction. Missing
subject drawings, invalid references, modified frozen models, or unknown output
collisions fail explicitly, before writing the new set. SVG filenames contain
the first twelve SHA-256 hex digits. No generation timestamp is used.

Old files are removed only when explicitly owned by the previous illustration
manifest, still hash-matching, and no longer referenced by the new manifest.
Unknown files are preserved; hand-edited owned files are never silently replaced.

Release validation can reuse:

```python
from tools.build_illustrations import inspect_svg

report = inspect_svg(payload)
assert report["speciesId"] == manifest_entry["speciesId"]
```

The constrained SVG profile allows paths and circles only, with titles,
descriptions, provenance and simple groups. It rejects scripts, event handlers,
foreign objects, styles, external resources, images, transforms, DTDs/entities,
unsupported elements/attributes, non-finite/out-of-bounds control points, invalid
paints and geometry without adequate transparent margins.

Use the manifest's site-relative URLs under the deployment base path. The
manifest is a producer handoff for release-time content merging, not an
additional frontend fetch requirement. Provide the catalog name as alternative
text and keep the schematic notice visible in explanatory content.

Stromatolites represent microbial-built structures, not an individual animal or
species. Cloudina's soft anatomy and affinity are not reconstructed. Cycads are
not palms. Deinotherium and Prodeinotherium share a generalized deinothere
silhouette and are not diagnostic skeletal reconstructions; only the reviewed
Prodeinotherium card covers 20 Ma. Human-activity artwork is not invented without
a reviewed catalog entry and sources. Map placement remains the responsibility
of independently validated occurrence records, not these illustrations.
