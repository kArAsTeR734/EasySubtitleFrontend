import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../api/UserService";
import { useEffect } from "react";
import {useAppDispatch} from "../../shared/hooks/redux.ts";
import {userSlice} from "../../app/store/reducers/UserSlice.ts";

export const useInitializeUser = () => {
  const dispatch = useAppDispatch();
  const {setUser,setAuth,logout} = userSlice.actions

  const { data: user, isSuccess, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => UserService.getUserInfo(),
    enabled: !!localStorage.getItem("access_token"),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
      dispatch(setAuth(true));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [user]);

  return { user };
};
