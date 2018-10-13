import { toLatLon, haversine } from "../../../../util/distance";

// Structure
// [
//   point: Point
// ]

// Point
// {
//   lat,
//   lon,
// }

export default (
  searchPoint,
  distance,
  collection,
  {
    pointLatKey,
    pointLonKey
  }
) => {
  const searchPointLatLon = toLatLon(searchPoint[pointLatKey], searchPoint[pointLonKey]);
  const inRangePoints = [];
  for(let point of collection) {
    const pointLatLon = toLatLon(point[pointLatKey], point[pointLonKey]);
    const diff = haversine(searchPointLatLon, pointLatLon);
    if (distance >= diff) {
      inRangePoints.push(point);
    }
  }
  return inRangePoints;
}
