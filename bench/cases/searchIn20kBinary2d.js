import searchDistanceWithRangeBinary2d from '../../src/search/distance/range/binary2d';
import customers20kIn500kmLatLonIndexed from '../../data-source/lat-lon-indexed/customers20kIn500kmLatLonIndexed';
import { getUnitLatDistance } from '../../src/util/distance';

const binarySearch2d = (collection, distance) => {
  const searchPoint =  {
    latitude: 53.339428,
    longitude: -6.257664
  }
  return searchDistanceWithRangeBinary2d(
    searchPoint,
    distance,
    collection,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes', 
      collectionKey: 'customers',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
};

const distance100 = getUnitLatDistance(); // ~11km
export const searchWith100kRangeIn20kBinary2d = () => binarySearch2d(customers20kIn500kmLatLonIndexed, distance100);

const distance10 = getUnitLatDistance() / 10; // ~11km
export const searchWith10kRangeIn20kBinary2d = () => binarySearch2d(customers20kIn500kmLatLonIndexed, distance10);
