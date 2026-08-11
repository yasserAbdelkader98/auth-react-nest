import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from "../pages/Home";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AccountSettings from "../pages/AccountSettings";
import { Suspense } from 'react'
import AuthGuard from '../Guards/auth.guard'
import Swagger from '../pages/swagger'

function Routing() {    
    
    return ( 
    <>
        <Suspense>
            <Routes>
                <Route path='/' element={< Home />}></Route>
                <Route path='/login' element={< Login />}></Route>
                <Route path='/register' element={< Register />}></Route>         
                <Route path='/docs' element={< Swagger />}></Route>         
                
                <Route element={<AuthGuard />}>
                    <Route path='/accountSettings' element={< AccountSettings />}></Route>         
                </Route>
                    
                <Route path='*' element={< NotFound />}></Route>

            </Routes>
        </Suspense>
    </> );
}

export default Routing;
