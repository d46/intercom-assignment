import { getIsInRange, getIsInDistance, getDistanceInFlyLat } from "../util/distance";

export const binarySearch = (
  array,
  search
) => {
  let start = 0;
  let stop = array.length - 1;
  let middle =  Math.floor((start + stop) / 2);
  while (start < stop && array[middle] !== search) {
    if (search < array[middle]) {
      stop = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + stop) / 2);
  }
  return middle;
}

export const binarySearchWithRange = (distance, point, indexes) => {
  const range = getDistanceInFlyLat(distance);
  const halfOfRange = range / 2;

  let currentLatIndex = Math.floor(point);
  const leftBound =  point - halfOfRange
  const leftBoundLatIndex = Math.floor(leftBound);
  const isInSameIndex = getIsInRange(
    leftBoundLatIndex,
    currentLatIndex,
    0
  );
  if (!isInSameIndex) {
    currentLatIndex = leftBoundLatIndex
  }

  const closestLeftBoundIndex = binarySearch(
    indexes,
    currentLatIndex
  );

  const topBound = Math.floor(point + halfOfRange);
  let inRangeIndexes = [];
  for(let i = closestLeftBoundIndex; indexes[i] <= topBound; i++) {
    inRangeIndexes.push(indexes[i]);
  }
  return inRangeIndexes;
}

export default (
  searchPoint,
  distance,
  customers
) => {
  const inRangeIndexes = binarySearchWithRange(
    distance, 
    +searchPoint.latitude,
    customers.indexes
  );

  // Collect customers
  const searchPointLatLon = [+searchPoint.latitude, +searchPoint.longitude];
  const customersIndexesInRange = inRangeIndexes.reduce(
    (acc, index) => {
      if(customers.customers[index].length > 0) {
        acc = acc.concat(customers.customers[index])
      }
      return acc;
    },
    []
  );
  const customersInRange = customersIndexesInRange.filter(customer => {
    const customerLatLon = [+customer.latitude, +customer.longitude];
    return getIsInDistance(searchPointLatLon, customerLatLon, distance); 
  }) 
  return customersInRange;
}
