import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    // onSuccess we can actually get the data that was received from the function as input. Example apiAunt.js returned data
    onSuccess: (user) => {
      //   console.log(data);
      queryClient.setQueryData(["user"], user.user);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isPending };
}
