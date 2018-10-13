import { isInDistance, distanceToLatLength, toLatLon } from "../../../../util/distance";
import { binarySearchWithRangeDouble } from "../../../../util/binary";

// Structure
// {
//   indexes: [
//     index: int,
//     ...
//   ],
//   collection: {
//     index: [
//       point: Point,
//       ...
//     ]
//   }
// }

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
    indexKey,
    collectionKey,
    pointLatKey,
    pointLonKey
  }
) => {
  const inRangeIndexes = binarySearchWithRangeDouble(
    distanceToLatLength(distance), 
    searchPoint[pointLatKey],
    collection[indexKey]
  );
  
  const searchPointLatLon = toLatLon(searchPoint[pointLatKey], searchPoint[pointLonKey]);
  let inRangePoints = [];
  // Collect points with in inRangeindexes
  for (let i of inRangeIndexes) {
    // Points in an index
    for(let point of collection[collectionKey][i]) {
      // If point in distance
      const pointLatLon = toLatLon(point[pointLatKey], point[pointLonKey]);
      if (isInDistance(searchPointLatLon, pointLatLon, distance)) {
        inRangePoints.push(point);
      }
    }
  }

  return inRangePoints;
}
