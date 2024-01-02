import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const splits = input
  .trim()
  .split("\n")
  .filter((e) => e);

enum MAP_TYPE {
  SEED_TO_SOIL = "seed-to-soil",
  SOIL_TO_FERTILIZER = "soil-to-fertilizer",
  FERTILIZER_TO_WATER = "fertilizer-to-water",
  WATER_TO_LIGHT = "water-to-light",
  LIGHT_TO_TEMPERATURE = "light-to-temperature",
  TEMPERATURE_TO_HUMIDITY = "temperature-to-humidity",
  HUMIDITY_TO_LOCATION = "humidity-to-location",
}

const seeds = splits
  .shift()
  ?.split(": ")[1]
  ?.split(" ")
  .map((e) => parseInt(e));

let mode: MAP_TYPE | undefined = undefined;

const maps: Record<MAP_TYPE, any[]> = {
  "seed-to-soil": [],
  "soil-to-fertilizer": [],
  "fertilizer-to-water": [],
  "water-to-light": [],
  "light-to-temperature": [],
  "temperature-to-humidity": [],
  "humidity-to-location": [],
};

for (const line of splits) {
  const split = line.split(" ");
  if (line.includes("map:")) {
    switch (split[0]) {
      case MAP_TYPE.SEED_TO_SOIL:
        mode = MAP_TYPE.SEED_TO_SOIL;
        break;
      case MAP_TYPE.SOIL_TO_FERTILIZER:
        mode = MAP_TYPE.SOIL_TO_FERTILIZER;
        break;
      case MAP_TYPE.FERTILIZER_TO_WATER:
        mode = MAP_TYPE.FERTILIZER_TO_WATER;
        break;
      case MAP_TYPE.WATER_TO_LIGHT:
        mode = MAP_TYPE.WATER_TO_LIGHT;
        break;
      case MAP_TYPE.LIGHT_TO_TEMPERATURE:
        mode = MAP_TYPE.LIGHT_TO_TEMPERATURE;
        break;
      case MAP_TYPE.TEMPERATURE_TO_HUMIDITY:
        mode = MAP_TYPE.TEMPERATURE_TO_HUMIDITY;
        break;
      case MAP_TYPE.HUMIDITY_TO_LOCATION:
        mode = MAP_TYPE.HUMIDITY_TO_LOCATION;
        break;
    }
  } else {
    if (!mode) continue;

    const dest = parseInt(split[0]!);
    const rangeStart = parseInt(split[1]!);
    const range = parseInt(split[2]!);

    maps[mode].push({
      dest,
      rangeStart,
      range,
    });
  }
}

const getNextValue = (mode: MAP_TYPE, input: number) => {
  const range = maps[mode].find(
    (value) =>
      input >= value.rangeStart && input < value.rangeStart + value.range
  );
  return range ? range.dest + (input - range.rangeStart) : input;
};

let result = Infinity;

if (!seeds) {
  process.exit(1);
}

for (let i = 0; i < seeds.length; i += 2) {
  const seedStart = seeds[i]!;
  const seedRange = seeds[i + 1] ?? 1;
  for (let seed = seedStart; seed < seedStart + seedRange; seed += 1) {
    let position = seed;
    for (const currentMode of Object.values(MAP_TYPE)) {
      position = getNextValue(currentMode, position);
    }

    if (position < result) {
      result = position;
    }
  }
}

console.log(result);
