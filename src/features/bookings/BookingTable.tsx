import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isPending } = useBookings();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!bookings!.length) return <Empty resource="bookings" />;

  const filterValue: string = searchParams.get("status") || "all";
  let filterBookings;

  //for filter component
  if (filterValue === "all") filterBookings = bookings;
  if (filterValue === "checked-out")
    filterBookings = bookings!.filter(
      (booking) => booking.status === "checked-out",
    );
  if (filterValue === "checked-in")
    filterBookings = bookings!.filter(
      (booking) => booking.status === "checked-in",
    );
  if (filterValue === "unconfirmed")
    filterBookings = bookings!.filter(
      (booking) => booking.status === "unconfirmed",
    );

  //for sortBy feature
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");

  switch (field) {
    case "startDate":
      filterBookings?.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
      break;
    case "totalPrice":
      filterBookings?.sort((a, b) => a.totalPrice - b.totalPrice);
      break;
    default:
      break;
  }
  filterBookings =
    direction === "asc" ? filterBookings : filterBookings?.reverse();
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filterBookings as any}
          render={(booking: any) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={45}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
