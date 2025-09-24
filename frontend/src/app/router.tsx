import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout";
import { Signin } from "../pages";
import Home from "../pages/Home/Home";
// import All_coll from "../pages/all_collection/All_collection";
// import SocialPost from "../pages/social_post/SocialPost";
// import Videos from "../pages/videos/Videos";
// import Docs from "../pages/docs/Docs";
// import Links from "../pages/links/Links";
// import InerLayout from "./InerLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path='signin' element={<Signin />} />
            {/* <Route path='signup' element={<Signup />} /> */}
        </Route>
        
        {/* <Route path='/' element={<InerLayout/>}>
            <Route path='/' element={<Dashboard />} />
            <Route path="all_collection" element={<All_coll/>}/>
            <Route path="social_post" element={<SocialPost/>}/>
            <Route path="videos" element={<Videos/>}/>
            <Route path="docs" element={<Docs/>}/>
            <Route path="links" element={<Links/>}/>
        </Route> */}
        </>
    )
)

export default router