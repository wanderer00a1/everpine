import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isPending, data, error } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page }),
  });

  const bookings = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count! / PAGE_SIZE);

  //Pre-fetching for next page
  if (page < pageCount) {
    //case if user is not on last page
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1],
      queryFn: () => getBookings({ page: page + 1 }),
    });
  }

  //Pre-fetching for previous page if user reloads
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page - 1],
      queryFn: () => getBookings({ page: page - 1 }),
    });
  }

  return { isPending, bookings, error, count };
}
