import { haversine } from "../util/distance";

export default ({
  searchPoint,
  distance,
  customers
}) => {
  const searchPointLatLon = [searchPoint.latitude, searchPoint.longitude];
  const inRangeCustomers = [];
  for(let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    const customerLatLon = [+customer.latitude, +customer.longitude];
    const diff = haversine(searchPointLatLon, customerLatLon);
    if (distance >= diff) {
      inRangeCustomers.push(customers[i]);
    }
  }
  return inRangeCustomers;
}
