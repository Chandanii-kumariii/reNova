export interface ProjectIdea {
  id: string;
  title: string;
  material: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cost: string;
  time: string;
  materialsNeeded: string[];
  toolsNeeded: string[];
  steps: string[];
  ecoImpact: string;
  category: 'Plastic' | 'Glass' | 'Paper/Cardboard' | 'Fabric' | 'Metal' | 'Organic' | 'Other';
  description: string;
}

export interface CommunityPost {
  id: string;
  username: string;
  userAvatar: string;
  userTitle: string;
  title: string;
  description: string;
  material: string;
  beforeLabel: string;
  afterLabel: string;
  beforeColor: string; // Tailored gradient/color for visual representation
  afterColor: string;
  beforeIcon: string;
  afterIcon: string;
  beforeImage?: string;
  afterImage?: string;
  likes: number;
  comments: { id: string; username: string; text: string; time: string }[];
  date: string;
}

export const MOCK_PROJECTS: ProjectIdea[] = [
  {
    id: 'p1',
    title: 'Self-Watering Herb Planter',
    material: 'Plastic Bottle',
    difficulty: 'Easy',
    cost: '$0 - $2',
    time: '15 mins',
    materialsNeeded: ['1x 2-Liter Plastic Bottle', 'Soil', 'Herb seeds or seedling', '8-inch cotton string/wick', 'Water'],
    toolsNeeded: ['Scissors or Utility Knife', 'Nail or drill (for making a hole)'],
    steps: [
      'Cut the plastic bottle in half horizontally, approximately 5 inches from the bottom.',
      'Remove the cap. Use a nail or drill to poke a small hole (about 1/4 inch) in the center of the cap.',
      'Thread the cotton string through the hole in the cap, leaving about 4 inches on each side. Tie a knot on the inside of the cap to keep it from slipping through completely.',
      'Screw the cap back onto the top half of the bottle.',
      'Invert the top half of the bottle (cap pointing down) and place it inside the bottom half. The cotton string should hang down into the bottom section.',
      'Fill the top section with soil, ensuring the cotton wick is buried in the center of the soil.',
      'Plant your herb seedling or seeds in the soil.',
      'Pour water into the bottom half of the bottle. The water should submerge the lower end of the string, which will draw moisture upward into the soil as needed.'
    ],
    ecoImpact: 'Prevents a plastic bottle from entering landfills, reducing microplastic pollution, and promotes home gardening.',
    category: 'Plastic',
    description: 'A clever and simple way to recycle plastic beverage bottles into self-hydrating planters for your kitchen window sill.'
  },
  {
    id: 'p2',
    title: 'Minimalist Bird Feeder',
    material: 'Plastic Bottle',
    difficulty: 'Easy',
    cost: '$1 - $3',
    time: '20 mins',
    materialsNeeded: ['1x Plastic Bottle (1L or 2L)', '2x Wooden spoons or thick twigs', 'Strong twine or wire', 'Birdseed mix'],
    toolsNeeded: ['Utility knife', 'Marker'],
    steps: [
      'Wash and dry the plastic bottle thoroughly, removing any exterior labels.',
      'Using a marker, draw two opposing circles about 3 inches from the bottom of the bottle, large enough for the handle of your wooden spoon to slide through.',
      'Draw another pair of opposing circles about 2 inches higher up, rotated 90 degrees from the first pair.',
      'Carefully cut out the circles using a utility knife.',
      'Insert the wooden spoons through the holes. The spoon bowl should catch the birdseed as it falls, serving as both a perch and a feeding tray for birds.',
      'Cut a small crescent-shaped feeding hole 1-2 inches above each spoon bowl, allowing the birdseed to slowly spill onto the spoon.',
      'Tie a strong piece of twine or wire around the neck of the bottle for hanging.',
      'Fill the bottle with birdseed using a funnel, screw the cap back on, and hang it on a sturdy tree branch.'
    ],
    ecoImpact: 'Repurposes single-use plastic while supporting local bird populations and biodiversity in your neighborhood.',
    category: 'Plastic',
    description: 'Invite local wildlife into your garden with this simple, functional bird feeder made from a plastic soda bottle.'
  },
  {
    id: 'p3',
    title: 'Cozy Desk Organizer',
    material: 'Cardboard Box',
    difficulty: 'Easy',
    cost: '$0 - $1',
    time: '30 mins',
    materialsNeeded: ['1x Shoebox or small shipping box', 'Several toilet paper rolls or cardboard dividers', 'Wrapping paper, old fabric, or paint', 'Glue or double-sided tape'],
    toolsNeeded: ['Scissors', 'Ruler', 'Pencil'],
    steps: [
      'Trim the top flaps off your cardboard box if it has any, leaving a clean, open rectangular tray.',
      'Decorate the exterior of the box and the cardboard rolls using wrapping paper, colorful magazine pages, acrylic paint, or scraps of fabric.',
      'Measure the height of the box. Cut the toilet paper rolls so that they are slightly shorter than the depth of the box.',
      'Arrange the decorated cardboard rolls vertically inside the box. They will act as compartments for pens, pencils, and markers.',
      'For wider items like sticky notes or calculators, leave a portion of the box free of rolls or create custom dividers by cutting strips of leftover cardboard.',
      'Glue the bottoms of the rolls to the base of the box to keep them securely in place.'
    ],
    ecoImpact: 'Extends the life cycle of shipping boxes and paper tubes, reducing municipal solid waste and saving money on office supplies.',
    category: 'Paper/Cardboard',
    description: 'Transform cluttered shipping boxes into an elegant, custom desk organizer for pens, scissors, and stationary.'
  },
  {
    id: 'p4',
    title: 'Macramé Plant Hanger',
    material: 'Old T-Shirt',
    difficulty: 'Medium',
    cost: '$0',
    time: '25 mins',
    materialsNeeded: ['1x Old cotton T-shirt', '1x Metal key ring or wooden ring (optional)', 'Small potted plant'],
    toolsNeeded: ['Fabric scissors', 'Ruler'],
    steps: [
      'Lay the T-shirt flat. Cut off the bottom hem, then cut the shirt horizontally into 8 strips, each about 1.5 to 2 inches wide.',
      'Pull each fabric strip firmly from both ends. The fabric will stretch and curl in on itself, forming soft, durable yarn-like cords.',
      'Gather all 8 cords together. Tie them in a tight knot at one end, leaving about 3-4 inches of fringe below the knot. This will support the bottom of your pot.',
      'Divide the 8 cords into 4 pairs of 2.',
      'Working about 2 inches up from the main knot, tie a simple knot in each of the 4 pairs.',
      'Now, take one cord from a pair and knot it to the adjacent cord of the neighboring pair, about 1.5 inches higher. Repeat for all cords to create a diamond mesh pattern.',
      'Repeat this alternating knotting process one more time, about 1.5 inches higher.',
      'Place your potted plant inside the mesh to test the fit. Gather all 8 cords at the top and tie them in a final, secure knot around a metal ring or simply loop them to hang.'
    ],
    ecoImpact: 'Diverts textile waste from landfills, bypassing the highly polluting chemical processes involved in recycling fabrics.',
    category: 'Fabric',
    description: 'Give a worn-out cotton t-shirt a second life as a beautiful, bohemian macramé hanger for your house plants.'
  },
  {
    id: 'p5',
    title: 'Chic Candle Holders',
    material: 'Glass Jar',
    difficulty: 'Easy',
    cost: '$1 - $5',
    time: '20 mins',
    materialsNeeded: ['2-3 Empty glass jars (mason, jam, or sauce jars)', 'Epsom salt or coarse glitter', 'Mod Podge or white school glue', 'Tea light candles (wax or LED)', 'Twine or ribbon'],
    toolsNeeded: ['Paintbrush', 'Small bowl'],
    steps: [
      'Soak the glass jars in hot soapy water to easily peel off the labels and adhesive residue. Dry thoroughly.',
      'Tie a decorative piece of twine or ribbon around the mouth of the jar, ending in a neat bow.',
      'Using a paintbrush, apply a thin, even layer of glue to the exterior of the jar, leaving the top rim and the bottom clean.',
      'Pour Epsom salt or glitter into a bowl. Roll the glued jar in the salt/glitter until it is fully and evenly coated.',
      'Allow the glue to dry completely (about 2-3 hours). The Epsom salt will create a beautiful, frosty, snow-like texture that diffuses light.',
      'Place a tea light candle inside the jar. The candlelight will glow softly through the frosted texture.'
    ],
    ecoImpact: 'Reduces glass waste. While glass is highly recyclable, reusing it directly uses zero energy compared to melting glass in recycling facilities.',
    category: 'Glass',
    description: 'Transform mundane sauce and jam jars into shimmering, frosted lanterns that bring warmth to any room.'
  },
  {
    id: 'p6',
    title: 'Upcycled Tire Planter',
    material: 'Tire',
    difficulty: 'Hard',
    cost: '$5 - $10',
    time: '1 hour',
    materialsNeeded: ['1x Old car tire', 'Outdoor spray paint (primer + bright color)', 'Heavy-duty garbage bag or landscape fabric', 'Potting soil', 'Flowering plants'],
    toolsNeeded: ['Scrub brush & soap', 'Drill with 1/2 inch bit', 'Heavy-duty scissors or utility knife'],
    steps: [
      'Thoroughly scrub the tire inside and out with soap and water to remove road grime and oil. Let it dry completely.',
      'Place the tire on a tarp in a well-ventilated area. Apply 1-2 coats of high-quality outdoor primer, followed by 2 coats of vibrant outdoor spray paint (e.g., lime green, sky blue, or bright yellow).',
      'If placing the planter directly on soil, you can leave the bottom open. If placing on a patio, drill 5-6 drainage holes through the bottom sidewall of the tire.',
      'Line the interior of the tire with durable landscape fabric or a heavy-duty garbage bag punctured with drainage holes. This keeps the soil inside while allowing excess water to escape.',
      'Fill the tire planter with nutrient-rich potting soil.',
      'Plant colorful, trailing flowers (like petunias or lobelia) or hardy succulents, and water them thoroughly.'
    ],
    ecoImpact: 'Tires are notoriously difficult to recycle and often accumulate in landfills or collect water, breeding mosquitoes. Upcycling them solves both issues.',
    category: 'Other',
    description: 'Turn an old, worn-out rubber tire into a durable, weather-resistant garden planter painted in eye-catching colors.'
  },
  {
    id: 'p7',
    title: 'Organic Fertilizer / Compost Tea',
    material: 'Coffee Grounds',
    difficulty: 'Easy',
    cost: '$0',
    time: '5 mins (plus 24h steep)',
    materialsNeeded: ['2 cups Used coffee grounds', '5 gallons Water', 'Large bucket or watering can'],
    toolsNeeded: ['Stirring stick', 'Fine mesh strainer or old cloth'],
    steps: [
      'Save your daily used coffee grounds. Spread them on a baking sheet to dry if you aren\'t using them immediately, to prevent mold.',
      'Add 2 cups of used coffee grounds to a large bucket containing 5 gallons of clean water.',
      'Stir the mixture thoroughly, ensuring all grounds are submerged and mixed.',
      'Let the mixture steep in a cool, shady spot for 24 to 48 hours. The water will turn a deep amber color as nutrients dissolve.',
      'Strain the mixture through a fine mesh strainer or clean cloth to remove the solid grounds (which can then be thrown directly into your garden beds or compost pile).',
      'Use the nutrient-rich liquid to water your acid-loving plants, such as tomatoes, roses, blueberries, hydrangeas, and ferns.'
    ],
    ecoImpact: 'Diverts organic waste from landfills where it would otherwise decompose anaerobically and produce harmful methane gas.',
    category: 'Organic',
    description: 'Transform your morning coffee waste into a mild, nitrogen-rich liquid fertilizer that makes your garden thrive.'
  },
  {
    id: 'p8',
    title: 'Desk Organizer or Pencil Holder',
    material: 'Tin Can',
    difficulty: 'Easy',
    cost: '$0 - $2',
    time: '15 mins',
    materialsNeeded: ['1x Empty clean soup/vegetable can', 'Acrylic paint, decorative paper, or burlap string', 'Hot glue or school glue', 'Felt padding (optional)'],
    toolsNeeded: ['Can opener (smooth edge type)', 'Paintbrush', 'Scissors'],
    steps: [
      'Ensure the tin can is completely empty and clean. Use a smooth-edge can opener to avoid sharp metal rims.',
      'If using twine or burlap string, apply a dab of glue at the bottom of the can and wrap the string tightly around the cylinder, adding glue periodically, until the metal is fully covered.',
      'If using paint, apply a coat of metal primer first, then paint with your desired colors. Let dry.',
      'Add decorative elements like stenciled patterns, buttons, or lace ribbons to customize the look.',
      'Optional: Cut a circle of felt and glue it to the inside bottom of the can to muffle the sound of pens dropping in.'
    ],
    ecoImpact: 'Saves metal cans from energy-intensive recycling plants by immediately upcycling them for practical everyday storage.',
    category: 'Metal',
    description: 'Repurpose steel and tin food cans into rustic, charming pencil holders, makeup brush containers, or cutlery organizers.'
  },
  {
    id: 'p9',
    title: 'Natural Eco-Cleaner',
    material: 'Orange Peels',
    difficulty: 'Easy',
    cost: '$1 - $3',
    time: '10 mins (plus 2 weeks steep)',
    materialsNeeded: ['Citrus peels (oranges, lemons, or grapefruits)', 'White vinegar', 'Glass jar', 'Water', 'Spray bottle'],
    toolsNeeded: ['Strainer'],
    steps: [
      'Collect citrus peels from your kitchen. Cut them into medium pieces so they fit easily into your glass jar.',
      'Pack the glass jar tightly with the peels until it is about 3/4 full.',
      'Pour white vinegar over the peels, ensuring they are completely submerged to prevent mold growth.',
      'Seal the jar tightly and store it in a dark, cool cupboard for 2 weeks. The vinegar will extract the limonene and natural oils from the peels, turning golden-orange.',
      'After 2 weeks, strain the liquid into a bowl, discarding the compostable peels.',
      'Dilute the citrus vinegar with equal parts water (1:1 ratio) and pour it into a spray bottle.',
      'Use this all-natural, grease-cutting cleaner on countertops, windows, tiles, and stainless steel.'
    ],
    ecoImpact: 'Creates a biodegradable, non-toxic household cleaner, replacing chemical detergents packaged in single-use plastic bottles.',
    category: 'Organic',
    description: 'Convert citrus kitchen scraps into a powerful, fresh-scented, all-natural household cleaning spray.'
  }
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'c1',
    username: 'EcoCraftySarah',
    userAvatar: '🎨',
    userTitle: 'Master Upcycler',
    title: 'Cozy Ottoman from an Old Car Tire!',
    description: 'I couldn\'t bear to see this tire end up in a landfill, so I cleaned it up, wrapped it in thick sisal rope using a hot glue gun, added some wooden legs, and made a padded lid! It took a weekend but it is now the favorite seat in our living room. Super sturdy!',
    material: 'Tire',
    beforeLabel: 'Bald Car Tire',
    afterLabel: 'Rustic Rope Ottoman',
    beforeColor: 'from-gray-700 to-slate-900',
    afterColor: 'from-amber-100 to-amber-300',
    beforeIcon: 'Disc',
    afterIcon: 'Armchair',
    beforeImage: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    likes: 148,
    comments: [
      { id: 'cc1', username: 'GreenThumbDan', text: 'This is absolutely stunning! How many feet of rope did you need?', time: '2 hours ago' },
      { id: 'cc2', username: 'EcoCraftySarah', text: 'Thanks Dan! I used about 150 feet of 3/8 inch sisal rope. Highly recommend using hot glue!', time: '1 hour ago' },
      { id: 'cc3', username: 'MinimalistJane', text: 'Wow, looks like a high-end designer piece!', time: '45 mins ago' }
    ],
    date: '2026-06-24'
  },
  {
    id: 'c2',
    username: 'RecycleDave',
    userAvatar: '🌱',
    userTitle: 'Green Pioneer',
    title: 'Wine Bottle Garden Border',
    description: 'Collected empty green glass wine bottles from friends and family over two months. I dug a shallow trench along my flower bed, placed the bottles upside down side-by-side, and packed the soil back in. It creates a beautiful, glowing border that catches the sunlight!',
    material: 'Glass Jar',
    beforeLabel: 'Cluttered Glass Bottles',
    afterLabel: 'Glowing Emerald Border',
    beforeColor: 'from-emerald-900/50 to-teal-900/50',
    afterColor: 'from-green-400 to-emerald-600',
    beforeIcon: 'GlassWater',
    afterIcon: 'Flower2',
    beforeImage: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    likes: 92,
    comments: [
      { id: 'cc4', username: 'SustainableAlice', text: 'What a brilliant way to define garden paths. Does it hold up against lawnmowers?', time: '1 day ago' },
      { id: 'cc5', username: 'RecycleDave', text: 'Yes, just make sure they are buried at least halfway in. They are very sturdy!', time: '20 hours ago' }
    ],
    date: '2026-06-23'
  },
  {
    id: 'c3',
    username: 'ZeroWasteKid',
    userAvatar: '🦊',
    userTitle: 'Creative Tinkerer',
    title: 'Cardboard Box Cat Castle',
    description: 'Had a bunch of delivery boxes lying around. Instead of recycling them immediately, I stacked them, cut out arched doorways and windows, added battlements, and glued them together. My cat, Whiskers, has not left his new fortress since!',
    material: 'Cardboard Box',
    beforeLabel: 'Plain Cardboard Boxes',
    afterLabel: 'Multi-Level Cat Fortress',
    beforeColor: 'from-amber-700/40 to-yellow-800/40',
    afterColor: 'from-amber-600 to-amber-800',
    beforeIcon: 'Box',
    afterIcon: 'Cat',
    beforeImage: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    likes: 205,
    comments: [
      { id: 'cc6', username: 'CatLover99', text: 'Whiskers looks like royalty in there! Definitely making this tonight.', time: '3 days ago' },
      { id: 'cc7', username: 'TreeHuggerTom', text: 'Perfect cardboard reuse. When it gets worn out, it can still go right into the recycle bin!', time: '2 days ago' }
    ],
    date: '2026-06-22'
  }
];

export const ECO_FACTS = [
  'Recycling one glass bottle saves enough energy to power a 100-watt light bulb for four hours.',
  'An average plastic water bottle takes up to 450 years to decompose in a landfill.',
  'Upcycling clothes prevents textile waste, which accounts for over 92 million tons of waste globally each year.',
  'Cardboard can be recycled 5 to 7 times before the fibers become too short to make paper.',
  'Aluminum cans can be recycled and back on supermarket shelves in as little as 60 days.',
  'One ton of recycled paper saves 17 mature trees, 7,000 gallons of water, and 3 cubic yards of landfill space.'
];
