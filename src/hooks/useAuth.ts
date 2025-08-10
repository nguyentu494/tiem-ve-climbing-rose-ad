import { Login, Logout } from "src/api/auth";
import { useAuthStore } from "src/store/auth.store";
import { LoginRequest } from "src/types/request/LoginRequest";
import { useShallow } from "zustand/react/shallow";


export const useAuth = () => {
  const { login, logout, loading, setLoading, ...rest } = useAuthStore(useShallow((state) => ({
    user: state.user,
    authenticated: state.isAuthenticated,
    loading: state.loading,
    setLoading: state.setLoading,
    login: state.login,
    logout: state.logout,
  })));

  const handleLogin = async (formatLogin: LoginRequest) => {
    try {
      const res = await Login(formatLogin);
      if (res.statusCode === 200) {
        login(res.data.user);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const handleLogOut = async () => {
    await logout();

    setLoading(false);
    // await Logout();
  };

  return {
    ...rest,
    loading,
    setLoading,
    login: handleLogin,
    logout: handleLogOut,
  };
};
