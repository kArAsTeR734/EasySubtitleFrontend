import {useMutation} from "@tanstack/react-query";
import {AuthorizationService} from "../../api/AuthorizationService.ts";

export const useRegistration = () => {
  return useMutation({
    mutationFn:AuthorizationService.register
  })
}