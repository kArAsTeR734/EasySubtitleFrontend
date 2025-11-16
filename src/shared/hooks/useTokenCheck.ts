import {AuthorizationService} from "../../api/AuthorizationService.ts";
import {useEffect, useState} from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthorizationService.isLoggedIn());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(AuthorizationService.isLoggedIn());
    };

    // Проверяем при монтировании
    checkAuth();

    // Слушаем изменения localStorage
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    // Периодическая проверка (раз в минуту)
    const interval = setInterval(checkAuth, 60000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => {
      AuthorizationService.logout();
      setIsLoggedIn(false);
    }
  };
};