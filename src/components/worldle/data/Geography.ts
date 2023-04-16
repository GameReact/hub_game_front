const MAX_DISTANCE_ON_EARTH = 20_000_000;

export type Direction =
    | "S"
    | "W"
    | "NNE"
    | "NE"
    | "ENE"
    | "E"
    | "ESE"
    | "SE"
    | "SSE"
    | "SSW"
    | "SW"
    | "WSW"
    | "WNW"
    | "NW"
    | "NNW"
    | "N";

export function computeProximityPercent(distance: number): number {
    return Math.round(Math.max(MAX_DISTANCE_ON_EARTH - distance, 0) / MAX_DISTANCE_ON_EARTH * 100);
}

export function formatDistance(distanceInMeters: number) {
    return `${Math.round(distanceInMeters / 1000)}km`;
}