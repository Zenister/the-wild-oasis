import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the users's email address"
      );
    },
    onError: (error) =>
      toast.error(error.message) || "An error ocurred during registration",
  });

  return { signup, isSigningUp };
}
