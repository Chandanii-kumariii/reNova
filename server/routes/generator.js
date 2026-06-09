import express from "express";
import jwt from "jsonwebtoken";
import { dbAll, dbRun } from "../db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "sr_void_super_secret_cipher_phrase_key";

// Local database fallback with step-by-step guides
const LUXURY_REUSE_DATABASE = {
  "wine bottles": [
    {
      item: "Wine Bottles",
      product: "Solar Luminary Chandelier",
      category: "Luxury Lighting",
      difficulty: "Intermediate",
      match: "98%",
      description: "A weightless suspended chandelier utilizing emerald glass bottles, brass frames, and solar filament LEDs.",
      materials: ["Green Bottles", "Brass Rings", "Solar Filament", "Tension Wires"],
      steps: [
        "Collect 6 empty emerald green glass bottles and wash off all labels.",
        "Construct a circular brass framework ring to space out the bottles.",
        "Mount solar LED light caps inside each bottle opening.",
        "Suspend the framework with tension wire hanging mounts.",
        "Position in a sunny location to charge and test illumination."
      ],
      accentColor: "cyan",
      floatSpeed: 6
    },
    {
      item: "Wine Bottles",
      product: "Terrazzo Glass Vessel",
      category: "Tableware",
      difficulty: "Advanced",
      match: "94%",
      description: "Upscale serving bowl created from crushed olive glass bonded with bio-epoxy and diamond polished to a satin finish.",
      materials: ["Crushed Glass", "Bio-Epoxy Resin", "Silicone Mold", "Polishing Compound"],
      steps: [
        "Safely crush green and brown glass bottles into medium terrazzo chips.",
        "Prepare a silicone bowl vessel mold and mix bio-epoxy resin.",
        "Stir the glass chips into the liquid resin until evenly dispersed.",
        "Pour mixture into the silicone mold and let cure for 24 hours.",
        "De-mold and polish using progressively fine diamond grit pads to a satin finish."
      ],
      accentColor: "green",
      floatSpeed: 5
    },
    {
      item: "Wine Bottles",
      product: "Acoustic Wall Panels",
      category: "Architectural Decor",
      difficulty: "Beginner",
      match: "91%",
      description: "Sleek wall dividers that block sound waves, using melted glass rings arranged in an overlapping art deco style.",
      materials: ["Bottles", "Tile Cutter", "Kiln", "Wall Mount Brackets"],
      steps: [
        "Cut glass bottles into slices using a wet glass tile cutter.",
        "Arrange the sliced glass rings in an overlapping, honeycomb geometry.",
        "Heat the rings in a kiln to fuse their edges together.",
        "Build a minimalist wooden wall frame chassis.",
        "Mount the fused glass grids onto the wooden frame using suspension tabs."
      ],
      accentColor: "cyan",
      floatSpeed: 7
    }
  ],
  "old skateboard": [
    {
      item: "Old Skateboard",
      product: "Stave & Maple Lounge Chair",
      category: "Luxury Furniture",
      difficulty: "Advanced",
      match: "97%",
      description: "A cantilevered chair using stained canadian maple deck veneers layered with black powder-coated steel tubes.",
      materials: ["Decks", "Steel Tubing", "Hex Bolts", "Polyurethane Coating"],
      steps: [
        "Acquire 4 worn maple skateboard decks and strip off any remaining griptape.",
        "Construct a structural chassis out of black powder-coated steel tubes.",
        "Cut and contour the maple decks to form matching seat and backrest staves.",
        "Drill mounting points and bolt the wood staves onto the steel tubing.",
        "Apply two coats of heavy-duty clear polyurethane protective wood finish."
      ],
      accentColor: "green",
      floatSpeed: 5.5
    },
    {
      item: "Old Skateboard",
      product: "Geometric Accent Mirror",
      category: "Home Accent",
      difficulty: "Intermediate",
      match: "93%",
      description: "A premium circular mirror surrounded by a tessellated framework of colored skateboard wood strips.",
      materials: ["Decks", "Circular Mirror", "Wood Glue", "Sanding Blocks"],
      steps: [
        "Shave worn skateboard decks into thin, colorful maple veneer strips.",
        "Arrange and glue wood strips together in a dynamic chevron tessellation.",
        "Use a band saw to cut the glued panel into a circular mirror ring frame.",
        "Glue a premium circular mirror sheet onto the back support of the frame.",
        "Sand edges flat and seal with clear linseed oil or wood finish."
      ],
      accentColor: "cyan",
      floatSpeed: 6.5
    },
    {
      item: "Old Skateboard",
      product: "Acoustic Sound Dock",
      category: "Premium Audio",
      difficulty: "Intermediate",
      match: "89%",
      description: "A passive amplifier dock for mobile devices, crafted by layering decks to create a high-density sound funnel.",
      materials: ["Decks", "Router", "Danish Oil", "Felt Feet"],
      steps: [
        "Layer and glue 3 solid blocks of skateboard deck maple wood together.",
        "Use a wood router to carve out a tapered acoustic amplification slot.",
        "Drill a phone slot to route the sound funnel output.",
        "Shape the exterior surface using a sander and round over all sharp corners.",
        "Polish the maple surface with Swedish danish wood oil for protection."
      ],
      accentColor: "cyan",
      floatSpeed: 4.8
    }
  ],
  "copper pipes": [
    {
      item: "Copper Pipes",
      product: "Linear Induction Light",
      category: "Luxury Lighting",
      difficulty: "Intermediate",
      match: "99%",
      description: "A minimalist ceiling-hung tube light using polished copper piping with embedded cold-cathode LED bars.",
      materials: ["Copper Pipes", "LED Bars", "Tension Cables", "Polishing Cream"],
      steps: [
        "Cut a 4-foot section of 1-inch industrial copper pipe.",
        "Polish the outer pipe surface with copper polish to a mirror-like shine.",
        "Embed a high-output cold-cathode LED bar inside the copper tube channel.",
        "Route micro-wiring out through the suspension tension wire cables.",
        "Hang from ceiling mounts and connect to low voltage drivers."
      ],
      accentColor: "cyan",
      floatSpeed: 5.8
    },
    {
      item: "Copper Pipes",
      product: "Modular Valet Rack",
      category: "Wardrobe Accessory",
      difficulty: "Beginner",
      match: "95%",
      description: "A structural valet stand featuring interlocking hand-burnished copper pipes and premium top-grain leather straps.",
      materials: ["Copper Pipes", "Leather Straps", "Pipe Connectors", "Solder"],
      steps: [
        "Cut copper pipes into support segments and joint couplings.",
        "Polish all pipe pieces and apply a clear protective anti-oxidant lacquer.",
        "Assemble the pipe frame using copper elbows, T-connectors, and solder joints.",
        "Stitch two premium top-grain leather straps onto the horizontal racks.",
        "Set base securely on felt pads to protect floor surfaces."
      ],
      accentColor: "green",
      floatSpeed: 6.2
    },
    {
      item: "Copper Pipes",
      product: "Minimalist Espalier Trellis",
      category: "Interior Gardening",
      difficulty: "Beginner",
      match: "92%",
      description: "A geometric wall trellis that holds climbing plants, creating a weightless green wall in modern penthouses.",
      materials: ["Copper Pipes", "Wall Anchors", "Brass Clips", "Plant Pots"],
      steps: [
        "Solder thin copper pipes into a geometric diamond trellis grid framework.",
        "Drill and fix wall anchor brackets onto the target penthouse brick wall.",
        "Clip the copper pipe trellis framework into the wall mounts.",
        "Hang upcycled potted plants using copper wire hooks on the trellis bars.",
        "Train ivy or climbing vines to follow the copper pipe network."
      ],
      accentColor: "cyan",
      floatSpeed: 5
    }
  ],
  "plastic cups": [
    {
      item: "Plastic Cups",
      product: "Tessellated Polymer Screen",
      category: "Architectural Decor",
      difficulty: "Intermediate",
      match: "96%",
      description: "A premium translucent partition wall created from heat-welded PET cup rims arranged in a stunning hexagonal structure.",
      materials: ["Plastic Cups", "Aluminum Frame", "Tension Bars", "Hot Air Gun"],
      steps: [
        "Acquire 50 clean, transparent PET plastic drinking cups.",
        "Carefully cut off the bottom bases of all cups, keeping the structural rims.",
        "Arrange the rims in a tessellated hexagonal honeycomb pattern grid.",
        "Use a hot air gun on low setting to carefully fuse the rim contact points.",
        "Mount the polymer grid inside a lightweight aluminum standing divider frame."
      ],
      accentColor: "cyan",
      floatSpeed: 6
    },
    {
      item: "Plastic Cups",
      product: "Molded Terrazzo Organizer",
      category: "Home Accent",
      difficulty: "Beginner",
      match: "93%",
      description: "Sleek, modular desktop organizer made by shredding polypropylene cups, melting them with colored pigments, and pressing them into geometric molds.",
      materials: ["Shredded Polymer", "Pigment Pastes", "Heat Press", "Silicone Mold"],
      steps: [
        "Shred polypropylene plastic cups into fine multicolored flakes.",
        "Mix the shredded flakes with dark colored organic pigments in a metal bowl.",
        "Heat the plastic flake mix inside a custom heat press mold at 200 degrees C.",
        "Press the molten polymer into a modular geometric desk organizer mold.",
        "Let cool completely before demolding and hand-polishing any rough edges."
      ],
      accentColor: "green",
      floatSpeed: 5.2
    },
    {
      item: "Plastic Cups",
      product: "Aura Filament Pedestal Lamp",
      category: "Luxury Lighting",
      difficulty: "Advanced",
      match: "91%",
      description: "A warm-glowing modern pedestal lamp featuring a diffuser constructed from layered, crystal-clear upcycled polymer rings.",
      materials: ["PET Cups", "Acrylic Rod", "Warm LED Strip", "Solid Brass Base"],
      steps: [
        "Shred PET cups and extrude into high-clarity polymer filaments.",
        "Create layered rings by heating and winding the filament around an acrylic cylinder.",
        "Assemble a solid brass circular base containing a warm LED spotlight.",
        "Slide the texturized polymer ring tube over the vertical LED column.",
        "Lock the brass top cap in place and switch on to test light diffusion."
      ],
      accentColor: "cyan",
      floatSpeed: 6.5
    }
  ]
};

const getFallbackIdeas = (item) => {
  const formatted = item.trim().charAt(0).toUpperCase() + item.trim().slice(1);
  return [
    {
      item: formatted,
      product: `Ethereal ${formatted} Canopy`,
      category: "Space Design",
      difficulty: "Advanced",
      match: "95%",
      description: `A floor-to-ceiling geometric installation crafted from high-precision cut ${item} fragments bound in an ultra-thin carbon fiber chassis.`,
      materials: [formatted, "Carbon Fiber Frame", "Epoxy Sealant", "Suspension Pins"],
      steps: [
        `Acquire and clean ${formatted} feedstock fragments.`,
        `Construct an ultra-thin carbon fiber framing layout.`,
        `Bind the feedstock fragments within the chassis using epoxy sealant.`,
        `Drill suspension points and secure with mounting pins.`
      ],
      accentColor: "cyan",
      floatSpeed: 6
    },
    {
      item: formatted,
      product: `Aura ${formatted} Sconce`,
      category: "Luxury Lighting",
      difficulty: "Intermediate",
      match: "91%",
      description: `A floating, warm-glow wall sconce lighting installation utilizing structurally reinforced ${item} elements and a frosted brass collar.`,
      materials: [formatted, "Frosted Collar", "LED Strips", "Micro-Wired Suspension"],
      steps: [
        `Select structurally sound ${formatted} parts and reinforce where necessary.`,
        `Assemble the frosted brass collar support ring.`,
        `Lay warm LED strips inside the structure.`,
        `Mount to the wall and wire power line connection.`
      ],
      accentColor: "green",
      floatSpeed: 5.2
    },
    {
      item: formatted,
      product: `Neo-${formatted} Table`,
      category: "Luxury Furniture",
      difficulty: "Advanced",
      match: "88%",
      description: `A sleek, floating wall console table incorporating compressed, stabilized ${item} with raw brushed titanium supports.`,
      materials: [formatted, "Brushed Titanium", "Industrial Stabilizer", "Wall Anchors"],
      steps: [
        `Compress and stabilize the ${formatted} using industrial stabilizer binders.`,
        `Form structural table slabs from the stabilized material.`,
        `Secure the slabs to raw brushed titanium brackets.`,
        `Mount to the wall studs using high-tensile wall anchors.`
      ],
      accentColor: "cyan",
      floatSpeed: 6.8
    }
  ];
};

// POST /api/generator/elevate
router.post("/elevate", async (req, res) => {
  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query feedstock is a required field." });
  }

  const normalized = query.toLowerCase().trim();

  // 1. Try real Gemini API if key is present
  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `You are a creative ecological upcycling AI. 
The user has a waste feedstock item named: "${query}".
Generate exactly 3 creative, ultra-luxury upcycling design concepts.
You MUST output ONLY a valid JSON array of objects. Do not include markdown blocks like \`\`\`json or regular text outside the array.
Each object must have the following keys:
- "item": String, the feedstock item.
- "product": String, premium name of the design product.
- "category": String, the upcycling category (e.g. "Luxury Lighting", "Luxury Furniture", "Tableware").
- "difficulty": String, one of: "Beginner", "Intermediate", "Advanced".
- "match": String, percentage like "95%".
- "description": String, sleek one-sentence concept description.
- "materials": Array of 3-4 strings, required tools/materials.
- "steps": Array of 4-5 strings, step-by-step upcycling instruction guide.
- "accentColor": String, either "cyan" or "green".
- "floatSpeed": Number, a random floating-point value between 4.5 and 7.5.

Example output format:
[
  {
    "item": "Tires",
    "product": "Vulcan Lounge Chair",
    "category": "Luxury Furniture",
    "difficulty": "Advanced",
    "match": "94%",
    "description": "A cantilevered lounge chair utilizing vulcanized tire rubber tread woven with titanium frames.",
    "materials": ["Used Tires", "Titanium Framing", "Screws", "Leather Polish"],
    "steps": [
      "Acquire 2 worn car tires and thoroughly wash off road grit.",
      "Use heavy cutters to carve seat slats from the rubber treads.",
      "Construct a cantilevered frame from lightweight titanium piping.",
      "Bolt and weave the rubber tread slats onto the titanium frame.",
      "Buff the rubber with premium leather polish to restore a deep matte finish."
    ],
    "accentColor": "green",
    "floatSpeed": 5.2
  }
]`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text.trim());
          if (Array.isArray(parsed) && parsed.length > 0) {
            return res.status(200).json(parsed);
          }
        }
      }
    } catch (apiError) {
      console.warn("Gemini API call failed, falling back to local registry data:", apiError);
    }
  }

  // 2. Local fallback database lookup
  let results = LUXURY_REUSE_DATABASE[normalized];
  if (!results) {
    const foundKey = Object.keys(LUXURY_REUSE_DATABASE).find(
      (k) => normalized.includes(k) || k.includes(normalized)
    );
    results = foundKey ? LUXURY_REUSE_DATABASE[foundKey] : getFallbackIdeas(query);
  }

  res.status(200).json(results);
});

// GET /api/generator/saved - Retrieve saved ideas for the logged-in user
router.get("/saved", authMiddleware, async (req, res) => {
  try {
    const rows = await dbAll(
      "SELECT * FROM saved_ideas WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );

    // Parse materials and steps JSON strings back into arrays
    const parsedRows = rows.map((row) => ({
      ...row,
      materials: JSON.parse(row.materials),
      steps: JSON.parse(row.steps || "[]")
    }));

    res.status(200).json(parsedRows);
  } catch (error) {
    console.error("Fetch saved ideas error:", error);
    res.status(500).json({ error: "Failed to load saved blueprint vault." });
  }
});

// POST /api/generator/save - Save an idea to user's vault
router.post("/save", authMiddleware, async (req, res) => {
  const { item, product, category, difficulty, match, description, materials, steps, accentColor } = req.body;

  if (!item || !product || !category) {
    return res.status(400).json({ error: "Incomplete concept data to save." });
  }

  try {
    const materialsStr = JSON.stringify(materials || []);
    const stepsStr = JSON.stringify(steps || []);
    const result = await dbRun(
      `INSERT INTO saved_ideas (user_id, item, product, category, difficulty, match, description, materials, steps, accent_color)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        item,
        product,
        category,
        difficulty || "Intermediate",
        match || "90%",
        description || "",
        materialsStr,
        stepsStr,
        accentColor || "cyan"
      ]
    );

    res.status(201).json({
      message: "Blueprint saved to vault successfully.",
      id: result.id
    });
  } catch (error) {
    console.error("Save idea error:", error);
    res.status(500).json({ error: "Failed to persist blueprint in user vault." });
  }
});

// DELETE /api/generator/save/:id - Remove an idea from vault
router.delete("/save/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbRun(
      "DELETE FROM saved_ideas WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Blueprint not found in your vault." });
    }

    res.status(200).json({ message: "Blueprint deleted from vault successfully." });
  } catch (error) {
    console.error("Delete idea error:", error);
    res.status(500).json({ error: "Failed to delete blueprint from vault." });
  }
});

export default router;
