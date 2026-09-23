type RgbColour = {
  red: number;
  green: number;
  blue: number;
};

const LIGHT_TEXT = "#ffffff";
const DARK_TEXT = "#0f172a";

function resolveCssColour(colour: string): string {
  const cssVariable = colour.match(/^var\((--[^,)]+)/)?.[1];

  if (!cssVariable) {
    return colour;
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();
}

function hexToRgb(hex: string): RgbColour | null {
  const normalisedHex = hex.replace("#", "");

  const expandedHex =
    normalisedHex.length === 3
      ? normalisedHex
          .split("")
          .map((character) => character.repeat(2))
          .join("")
      : normalisedHex;

  if (!/^[0-9a-f]{6}$/i.test(expandedHex)) {
    return null;
  }

  return {
    red: Number.parseInt(expandedHex.slice(0, 2), 16),
    green: Number.parseInt(expandedHex.slice(2, 4), 16),
    blue: Number.parseInt(expandedHex.slice(4, 6), 16),
  };
}

function rgbStringToRgb(colour: string): RgbColour | null {
  const match = colour.match(
    /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i,
  );

  if (!match) {
    return null;
  }

  return {
    red: Number(match[1]),
    green: Number(match[2]),
    blue: Number(match[3]),
  };
}

function parseColour(colour: string): RgbColour | null {
  const resolvedColour = resolveCssColour(colour);

  if (resolvedColour.startsWith("#")) {
    return hexToRgb(resolvedColour);
  }

  if (resolvedColour.startsWith("rgb")) {
    return rgbStringToRgb(resolvedColour);
  }

  return null;
}

function getRelativeLuminance({ red, green, blue }: RgbColour): number {
  const convertChannel = (channel: number) => {
    const value = channel / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * convertChannel(red) +
    0.7152 * convertChannel(green) +
    0.0722 * convertChannel(blue)
  );
}

function getContrastRatio(
  firstColour: RgbColour,
  secondColour: RgbColour,
): number {
  const firstLuminance = getRelativeLuminance(firstColour);
  const secondLuminance = getRelativeLuminance(secondColour);

  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastingTextColour(backgroundColour: string): string {
  const background = parseColour(backgroundColour);
  const lightText = parseColour(LIGHT_TEXT);
  const darkText = parseColour(DARK_TEXT);

  if (!background || !lightText || !darkText) {
    return DARK_TEXT;
  }

  const lightContrast = getContrastRatio(background, lightText);
  const darkContrast = getContrastRatio(background, darkText);

  return lightContrast > darkContrast ? LIGHT_TEXT : DARK_TEXT;
}
