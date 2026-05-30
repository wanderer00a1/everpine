import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AuthI, login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: AuthI) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData({ queryKey: ["user"] }, user.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });
  return { login, isPending };
}

export default useLogin;
