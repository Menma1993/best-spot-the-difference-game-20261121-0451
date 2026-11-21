export const PANEL_W = 560;
export const PANEL_H = 420;

export const SCENES = [
  {
    id: 'reef',
    name: 'Coral Reef Dive',
    par: 150,
    diffs: [
      { id: 'blue-fish', name: 'Blue fish', x: 120, y: 90, r: 24, type: 'recoloured' },
      { id: 'sea-turtle', name: 'Sea turtle', x: 400, y: 70, r: 28, type: 'moved', mx: 458, my: 62 },
      { id: 'red-coral', name: 'Red coral', x: 60, y: 230, r: 26, type: 'resized' },
      { id: 'giant-clam', name: 'Giant clam', x: 250, y: 190, r: 22, type: 'removed' },
      { id: 'diver-mask', name: 'Diver mask', x: 480, y: 220, r: 21, type: 'added' },
      { id: 'starfish', name: 'Starfish', x: 150, y: 350, r: 25, type: 'rotated' },
      { id: 'air-bubbles', name: 'Air bubbles', x: 330, y: 330, r: 20, type: 'resized' },
      { id: 'treasure-chest', name: 'Treasure chest', x: 470, y: 370, r: 27, type: 'removed' },
    ],
  },
  {
    id: 'camp',
    name: 'Forest Campfire',
    par: 150,
    diffs: [
      { id: 'tent', name: 'Tent', x: 110, y: 120, r: 29, type: 'recoloured' },
      { id: 'campfire', name: 'Campfire', x: 270, y: 300, r: 30, type: 'resized' },
      { id: 'owl', name: 'Horned owl', x: 460, y: 90, r: 23, type: 'flipped' },
      { id: 'pine-tree', name: 'Pine tree', x: 520, y: 250, r: 28, type: 'removed' },
      { id: 'marshmallow-stick', name: 'Marshmallow stick', x: 150, y: 260, r: 21, type: 'moved', mx: 214, my: 216 },
      { id: 'lantern', name: 'Lantern', x: 390, y: 200, r: 22, type: 'added' },
      { id: 'backpack', name: 'Backpack', x: 60, y: 370, r: 24, type: 'resized' },
      { id: 'moon', name: 'Moon', x: 300, y: 50, r: 26, type: 'pattern' },
    ],
  },
  {
    id: 'kitchen',
    name: "Grandma's Kitchen",
    par: 150,
    diffs: [
      { id: 'hanging-pots', name: 'Hanging pots', x: 80, y: 80, r: 27, type: 'removed' },
      { id: 'rolling-pin', name: 'Rolling pin', x: 250, y: 60, r: 22, type: 'moved', mx: 314, my: 104 },
      { id: 'cat', name: 'Tabby cat', x: 480, y: 130, r: 29, type: 'recoloured' },
      { id: 'teapot', name: 'Teapot', x: 140, y: 210, r: 24, type: 'flipped' },
      { id: 'cake-stand', name: 'Cake stand', x: 330, y: 220, r: 26, type: 'pattern' },
      { id: 'apron', name: 'Apron', x: 500, y: 290, r: 23, type: 'added' },
      { id: 'stool', name: 'Stool', x: 90, y: 360, r: 28, type: 'resized' },
      { id: 'cookie-jar', name: 'Cookie jar', x: 280, y: 370, r: 21, type: 'removed' },
    ],
  },
  {
    id: 'workshop',
    name: 'Toy Workshop',
    par: 165,
    diffs: [
      { id: 'rocking-horse', name: 'Rocking horse', x: 100, y: 90, r: 30, type: 'resized' },
      { id: 'paint-tins', name: 'Paint tins', x: 300, y: 70, r: 21, type: 'pattern' },
      { id: 'teddy-bear', name: 'Teddy bear', x: 500, y: 110, r: 27, type: 'moved', mx: 436, my: 154 },
      { id: 'dollhouse', name: 'Dollhouse', x: 90, y: 250, r: 29, type: 'removed' },
      { id: 'robot', name: 'Wind-up robot', x: 280, y: 220, r: 25, type: 'flipped' },
      { id: 'kite', name: 'Kite', x: 500, y: 250, r: 24, type: 'added' },
      { id: 'toy-train', name: 'Toy train', x: 140, y: 360, r: 28, type: 'resized' },
      { id: 'spinning-top', name: 'Spinning top', x: 350, y: 350, r: 20, type: 'flipped' },
    ],
  },
  {
    id: 'oasis',
    name: 'Desert Oasis Caravan',
    par: 165,
    diffs: [
      { id: 'palm-tree', name: 'Palm tree', x: 90, y: 100, r: 30, type: 'recoloured' },
      { id: 'camel', name: 'Camel', x: 300, y: 110, r: 29, type: 'moved', mx: 364, my: 66 },
      { id: 'sun', name: 'Sun', x: 490, y: 70, r: 26, type: 'resized' },
      { id: 'tent', name: 'Striped tent', x: 80, y: 260, r: 28, type: 'flipped' },
      { id: 'water-jug', name: 'Water jug', x: 240, y: 250, r: 21, type: 'removed' },
      { id: 'wagon', name: 'Caravan wagon', x: 470, y: 220, r: 27, type: 'added' },
      { id: 'woven-rug', name: 'Woven rug', x: 150, y: 370, r: 23, type: 'pattern' },
      { id: 'falcon', name: 'Falcon', x: 380, y: 350, r: 22, type: 'moved', mx: 316, my: 394 },
    ],
  },
  {
    id: 'lodge',
    name: 'Winter Ski Lodge',
    par: 180,
    diffs: [
      { id: 'fireplace', name: 'Fireplace', x: 100, y: 110, r: 30, type: 'recoloured' },
      { id: 'moose-head', name: 'Moose head', x: 310, y: 80, r: 27, type: 'removed' },
      { id: 'skis', name: 'Skis', x: 525, y: 300, r: 25, type: 'flipped' },
      { id: 'armchair', name: 'Armchair', x: 90, y: 336, r: 29, type: 'resized' },
      { id: 'clock', name: 'Wall clock', x: 280, y: 220, r: 23, type: 'moved', mx: 344, my: 176 },
      { id: 'snowboard', name: 'Snowboard', x: 490, y: 300, r: 26, type: 'added' },
      { id: 'log-pile', name: 'Log pile', x: 150, y: 370, r: 28, type: 'resized' },
      { id: 'frosty-window', name: 'Frosty window', x: 390, y: 350, r: 24, type: 'pattern' },
    ],
  },
];

export function sceneById(id) { return SCENES.find(function (s) { return s.id === id; }); }
