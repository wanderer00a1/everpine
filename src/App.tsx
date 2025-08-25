import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/bookings",
          element: <Bookings />,
        },
        {
          path: "/cabins",
          element: <Cabins />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
