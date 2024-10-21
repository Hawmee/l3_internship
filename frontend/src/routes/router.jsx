import { createBrowserRouter } from "react-router-dom";
import Guest from "../layouts/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Authenticated from "../layouts/AuthenticatedLayout";
import ChefServiceLayout from "../layouts/users/ChefServiceLayout";
import ChefUnitLayout from "../layouts/users/chefUnitLayout";
import PersCelluleLayout from "../layouts/users/PersCelluleLayout";
import PersSecLayout from "../layouts/users/PersSecLayout";
import Units from "../pages/chefService/units/Units";
import Dashboard from "../pages/chefService/dashboard/Dashboard";
import WaitingPage from "../pages/redirections/WaitingPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authenticated />,
    children: [
      {
        path: "chefService",
        element: (
          <ProtectedRoute
            element={<ChefServiceLayout />}
            requiredUserType="chefService"
          />
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "units",
            element: <Units />,
          },
        ],
      },
      {
        path: "chefUnits",
        element: <ChefUnitLayout />,
      },
      {
        path: "persCellule",
        element: <PersCelluleLayout />,
      },
      {
        path: "persSecretariat",
        element: <PersSecLayout />,
      },
      {
        path: "/waiting",
        element: <WaitingPage />,
      },
    ],
  },

  {
    path: "/guest",
    element: <Guest />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
