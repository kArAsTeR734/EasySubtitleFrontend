import { useMutation } from "@tanstack/react-query";
import {AuthorizationService} from "../../api/AuthorizationService.ts";

export const useLogin = () => {
  return useMutation({
    mutationFn: AuthorizationService.login,
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}

