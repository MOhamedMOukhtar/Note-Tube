module.exports = {
  safelist: [
    { pattern: /bg-\[#([0-9a-f]{6})\]/ }, // Allow any hex color
    { pattern: /hover:bg-\[#([0-9a-f]{6})\]/ }, // Allow hover variants
  ],
};
