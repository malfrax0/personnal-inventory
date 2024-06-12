import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Emplacement from "./pages/Emplacement";

const Routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/emplacement/:id",
        element: <Emplacement/>
    }
]

export default Routes;