import { createBrowserRouter } from "react-router-dom";
import Guest from "../layouts/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Authenticated from "../layouts/AuthenticatedLayout";
import ChefServiceLayout from "../layouts/users/ChefServiceLayout";
import ChefUnitLayout from "../layouts/users/chefUnitLayout";
import PersCelluleLayout from "../layouts/users/PersCelluleLayout";
import PersSecLayout from "../layouts/users/PersSecLayout";
import Units from "../pages/units/Units";
import Dashboard from "../pages/dashboard/Dashboard";
import WaitingPage from "../pages/redirections/WaitingPage";
import ProtectedRoute from "./ProtectedRoute";
import Offers from "../pages/Offers/Offers";

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
            path:"offers",
            element:<Offers />
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
        children:[
          {
            path:"",
            element:<Offers />
          }
        ]
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
