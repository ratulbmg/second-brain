import type React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";


const Providers: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Providers