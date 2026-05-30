/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, numCabins }: any) {
  const numBookings = bookings.length;

  const sales = bookings.reduce(
    (acc: any, cur: { totalPrice: any }) => acc + cur.totalPrice,
    0,
  );

  const checkins = confirmedStays.length;

  const occupancy = confirmedStays.reduce(
    (acc: any, cur: { numNights: any }) => acc + cur.numNights,
    0,
  );
  const totalOccupancy = numDays * numCabins;
  const occupancyRate = occupancy / totalOccupancy;
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancyRate * 100)}
      />
    </>
  );
}

export default Stats;
