// https://www.movable-type.co.uk/scripts/latlong.html
export const haversine = (latlngA, latlngB) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371e3; // metres

  const dLat = toRad(latlngB[1] - latlngA[1]);
  const dLatSin = Math.sin(dLat / 2);
  const dLon = toRad(latlngB[0] - latlngA[0]);
  const dLonSin = Math.sin(dLon / 2);

  const a = (dLatSin * dLatSin) +
            (Math.cos(toRad(latlngA[1])) * Math.cos(toRad(latlngB[1])) * dLonSin * dLonSin);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;

  return distance;
}

export const getUnitLatDistance = () => {
  return haversine(
    [0,1],
    [1,1]
  )
}

export const getUnitLonDistance = () => {
  return haversine(
    [1,0],
    [1,1]
  )
}

export const distanceToLatLength = distance => 
  distance / Number(
    getUnitLatDistance()
  ).toFixed(10);

export const distanceToLengthLon = distance => 
  distance / Number(
    getUnitLatDistance()
  ).toFixed(10);

export const isInRange = (pointA, pointB, range) => 
  Number(
    Math.abs(pointA - pointB)
  ).toFixed(10) <= range;

export const isInDistance = (latLonA, latLonB, range ) => 
  range >= haversine(latLonA, latLonB);

export const toLatLon = (lat, lon) => [+lat, +lon];
