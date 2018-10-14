import { isInDistance, distanceToLatLength, toLatLon } from "../../../../util/distance";
import { binarySearchWithRangeDouble } from "../../../../util/binary";

// Structure
// {
//   latIndexes: [
//     index: int,
//     ...
//   ],
//   lonIndexes: [
//     index: int,
//     ...
//   ],
//   collection: {
//     latIndexes: {
//       lonIndexes: [
//         point: Point
//       ]
//       ...
//     }
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
    indexLatKey,
    indexLonKey,
    collectionKey,
    pointLatKey,
    pointLonKey
  }
) => {
  const inRangeLatIndexes = binarySearchWithRangeDouble(
    distanceToLatLength(distance), 
    searchPoint[pointLatKey],
    collection[indexLatKey]
  );
  const inRangeLonIndexes = binarySearchWithRangeDouble(
    distanceToLatLength(distance), 
    searchPoint[pointLonKey],
    collection[indexLonKey]
  );
  // console.log(inRangeLatIndexes)
  // console.log(inRangeLonIndexes)

  const searchPointLatLon = toLatLon(searchPoint[pointLatKey], searchPoint[pointLonKey]);
  let inRangePoints = [];
  // Collect points with in inRangeindexes
  for (let lat of inRangeLatIndexes) {
    for(let lon of inRangeLonIndexes) {
      if (collection[collectionKey] && collection[collectionKey].hasOwnProperty(lat)) {
        
        if (collection[collectionKey][lat].hasOwnProperty(lon)) {
          // Points in an index
          for(let point of collection[collectionKey][lat][lon]) {
            // If point in distance
            const pointLatLon = toLatLon(point[pointLatKey], point[pointLonKey]);
            if (isInDistance(searchPointLatLon, pointLatLon, distance)) {
              inRangePoints.push(point);
            }
          }
        }
      }
    }
  }

  return inRangePoints;
}
