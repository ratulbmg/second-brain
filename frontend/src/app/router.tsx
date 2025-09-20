import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout";
import { Dashboard, Signin, Signup } from "../pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
        </Route>
        </>
    )
)

export default router