interface Coordinate {
  lat: number;
  lng: number;
}
type DistanceUnit = 'meters' | 'kilometers';

// Reference: https://stackoverflow.com/a/51720402/16616027
const haversineDistance = (coord1: Coordinate, coord2: Coordinate) => {
  const squared = (x: number) => x * x;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth’s mean radius in km

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);

  const dLatSin = squared(Math.sin(dLat / 2));
  const dLonSin = squared(Math.sin(dLon / 2));

  const a =
    dLatSin +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * dLonSin;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};

const getDistance = (
  coord1: Partial<Coordinate>,
  coord2: Partial<Coordinate>,
  distanceUnit: DistanceUnit = 'meters'
) => {
  if (!coord1.lat && !coord1.lng && !coord2.lat && !coord2.lng) {
    return null;
  }
  return distanceUnit === 'meters'
    ? Math.round(
        haversineDistance(
          { lat: 0, lng: 0, ...coord1 },
          { lat: 0, lng: 0, ...coord2 }
        ) * 1000
      )
    : Math.round(
        haversineDistance(
          { lat: 0, lng: 0, ...coord1 },
          { lat: 0, lng: 0, ...coord2 }
        )
      );
};
export default getDistance;
