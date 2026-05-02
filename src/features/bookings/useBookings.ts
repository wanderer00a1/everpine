import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isPending, data, error } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page }),
  });

  const bookings = data?.data;
  const count = data?.count;

  return { isPending, bookings, error, count };
}
