import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import useAuthStore from "./store/Auth";

function ChecklistApp() {
  const isLoggedIn = useAuthStore(store => store.isLoggedIn);

  if (isLoggedIn) return <AppNavigator />;
  return <AuthNavigator />;
}

export default ChecklistApp;
