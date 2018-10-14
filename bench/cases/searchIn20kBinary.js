import searchDistanceWithRangeBinary from '../../src/search/distance/range/binary';
import customers20kIn500kmLatIndexed from '../../data-source/lat-indexed/customers20kIn500kmLatIndexed';
import { getUnitLatDistance } from '../../src/util/distance';

const binarySearch = (collection, distance) => {
  const searchPoint =  {
    latitude: 53.339428,
    longitude: -6.257664
  }
  return searchDistanceWithRangeBinary(
    searchPoint,
    distance,
    collection,
    {
      indexKey: 'indexes',
      collectionKey: 'customers',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
};

const distance100 = getUnitLatDistance(); // ~11km
export const searchWith100kRangeIn20kBinary = () => binarySearch(customers20kIn500kmLatIndexed, distance100);

const distance10 = getUnitLatDistance() / 10; // ~11km
export const searchWith10kRangeIn20kBinary = () => binarySearch(customers20kIn500kmLatIndexed, distance10);
