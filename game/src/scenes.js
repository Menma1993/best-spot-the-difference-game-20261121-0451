// Scene registry: the six original scenes of Spot the Shift.
// Each entry names its draw function and its 8 differences (name + hit spot).
(function () {
  'use strict';

  window.SCENES = [
    { id: 'reef', name: 'Coral Reef Dive', draw: window.DrawReef, diffs: window.REEF_DIFFS },
    { id: 'campfire', name: 'Forest Campfire', draw: window.DrawCampfire, diffs: window.CAMPFIRE_DIFFS },
    { id: 'kitchen', name: "Grandma's Kitchen", draw: window.DrawKitchen, diffs: window.KITCHEN_DIFFS },
    { id: 'workshop', name: 'Toy Workshop', draw: window.DrawWorkshop, diffs: window.WORKSHOP_DIFFS },
    { id: 'oasis', name: 'Desert Oasis Caravan', draw: window.DrawOasis, diffs: window.OASIS_DIFFS },
    { id: 'lodge', name: 'Winter Ski Lodge', draw: window.DrawLodge, diffs: window.LODGE_DIFFS },
  ];

  window.TOTAL_DIFFS = window.SCENES.reduce(function (n, s) {
    return n + s.diffs.length;
  }, 0);
})();
