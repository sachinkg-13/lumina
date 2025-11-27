import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, ThemeProvider } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  //Conditional rendering
  return !loading ? (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative min-h-screen w-full flex flex-wrap bg-background text-foreground">
        <div className="w-full block ">
          <div className="top-0">
            <Header />
          </div>
          <div className="">
            <main>
              <Outlet />
            </main>
          </div>
          <div className="bottom-0">
            <Footer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md p-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="h-32 w-full bg-muted animate-pulse rounded-xl" />
      </div>
    </div>
  );
}

export default App;
