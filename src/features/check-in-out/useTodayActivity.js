import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isPending } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activty"],
  });

  return { activities, isPending };
}
