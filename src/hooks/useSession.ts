import { getSessionAction } from "@/actions/getSessionAction";
import { useQuery } from "@tanstack/react-query";

const useSession = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["session"],
    queryFn: async () => await getSessionAction(),
  });

  return { data, isLoading };
};

export default useSession;
