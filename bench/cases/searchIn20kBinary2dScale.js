import searchDistanceWithRangeBinary2dScale from '../../src/search/distance/range/binary2dScale';
import customers20kIn500kmLatLonIndexed from '../../data-source/lat-lon-indexed-scale-10/customers20kIn500kmLatLonIndexed';
import { getUnitLatDistance } from '../../src/util/distance';

const binarySearch2dScale = (collection, distance) => {
  const searchPoint =  {
    latitude: 53.339428,
    longitude: -6.257664
  }
  return searchDistanceWithRangeBinary2dScale(
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
const distance100 = getUnitLatDistance();
export const searchWith100kRangeIn20kBinary2dScale = () => binarySearch2dScale(customers20kIn500kmLatLonIndexed, distance100)

const distance10 = getUnitLatDistance() / 10;
export const searchWith10kRangeIn20kBinary2dScale = () => binarySearch2dScale(customers20kIn500kmLatLonIndexed, distance10)
