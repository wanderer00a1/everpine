import { useCabins } from "./useCabins";

import CabinRow from "./CabinRow";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins?.length) return <Empty resource="cabins" />;

  //filter
  const filterValue: string = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins!.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins!.filter((cabin) => cabin.discount > 0);

  //Sort
  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortBy.split("-");

  switch (field) {
    case "name":
      filteredCabins?.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "regularPrice":
      filteredCabins?.sort((a, b) => a.regularPrice - b.regularPrice);
      break;
    case "maxCapacity":
      filteredCabins?.sort((a, b) => a.maxCapacity - b.maxCapacity);
      break;
    default:
      break;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  direction === "asc" ? filteredCabins : filteredCabins?.reverse();

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
