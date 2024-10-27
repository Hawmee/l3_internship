import { createBrowserRouter } from "react-router-dom";
import Guest from "../layouts/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Authenticated from "../layouts/AuthenticatedLayout";
import ChefServiceLayout from "../layouts/users/ChefServiceLayout";
import ChefUnitLayout from "../layouts/users/ChefUnitLayout";
import PersCelluleLayout from "../layouts/users/PersCelluleLayout";
import PersSecLayout from "../layouts/users/PersSecLayout";
import Units from "../pages/units/Units";
import Dashboard from "../pages/dashboard/Dashboard";
import WaitingPage from "../pages/redirections/WaitingPage";
import ProtectedRoute from "./ProtectedRoute";
import Offers from "../pages/Offers/Offers";
import InterViews from "../pages/interviews/InterViews";
import Interns from "../pages/interns/Interns";
import InternShips from "../pages/internShips/InternShips";
import Accounts from "../pages/accounts/Accounts";
import Tasks from "../pages/tasks/Tasks";
import Attestation from "../pages/Attestations/Attestation.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authenticated />,
        children: [
            {
                path: "chefService",
                element: <ProtectedRoute element={<ChefServiceLayout />} />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "interviews",
                        element: <InterViews />,
                    },
                    {
                        path: "offers",
                        element: <Offers />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "internships",
                        element: <InternShips />,
                    },
                    {
                        path: "accounts",
                        element: <Accounts />,
                    },
                    {
                        path: "units",
                        element: <Units />,
                    },
                ],
            },
            {
                path: "chefUnits",
                element: <ProtectedRoute element={<ChefUnitLayout />} />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "offers",
                        element: <Offers />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "tasks",
                        element: <Tasks />,
                    },
                ],
            },
            {
                path: "persCellule",
                element: <ProtectedRoute element={<PersCelluleLayout />} />,
                children: [
                    {
                        path: "",
                        element: <Offers />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "internships",
                        element: <InternShips />,
                    },
                    {
                        path: "interview" +
                            "s",
                        element: <InterViews />,
                    },
                    {
                        path: "attestation",
                        element: <Attestation />,
                    },
                ],
            },
            {
                path: "persSecretariat",
                element: <ProtectedRoute element={<PersSecLayout />} />,
                children: [
                    {
                        path: "",
                        element: <Offers />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "interviews",
                        element: <InterViews />,
                    },
                ],
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
