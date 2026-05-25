import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: activities = [], isPending } = useQuery({
    queryFn: getStaysTodayActivity,

    queryKey: ["today-activity"],
  });

  return { activities, isPending };
}

export default useTodayActivity;
