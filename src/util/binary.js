import { isInRange } from "./distance";
import { absFloor } from "./math";

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

export const binarySearchWithRangeDouble = (range, point, array) => {
  let currentBound = absFloor(point);
  const halfOfRange = range / 2;
  const leftBound =  point - halfOfRange
  const leftBoundFloor = absFloor(leftBound);
  const isInSameIndex = isInRange(
    leftBoundFloor,
    currentBound,
    0
  );

  if (!isInSameIndex) {
    currentBound = leftBoundFloor
  }

  const closestLeftFloor = binarySearch(
    array,
    currentBound
  );

  const rightBound = absFloor(point + halfOfRange);
  let inRanges = [];
  for(let i = closestLeftFloor; array[i] <= rightBound; i++) {
    inRanges.push(array[i]);
  }
  return inRanges;
}
