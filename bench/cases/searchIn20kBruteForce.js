import searchDistanceWithRangeBruteForce from '../../src/search/distance/range/brute-force';
import customers20kIn500kmLatLonIndexed from '../../data-source/raw/customers20kIn500km';
import { getUnitLatDistance } from '../../src/util/distance';

const bruteForceSearch = (collection, distance) => {
  const searchPoint =  {
    latitude: 53.339428,
    longitude: -6.257664
  }
  return searchDistanceWithRangeBruteForce(
    searchPoint,
    distance,
    collection,
    {
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
};
const distance100 = getUnitLatDistance();
export const searchWith100kRangeIn20kBruteForce = () => bruteForceSearch(customers20kIn500kmLatLonIndexed, distance100)

const distance10 = getUnitLatDistance() / 10;
export const searchWith10kRangeIn20kBruteForce = () => bruteForceSearch(customers20kIn500kmLatLonIndexed, distance10)
