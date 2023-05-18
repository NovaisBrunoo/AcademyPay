import Home from '../pages/Home'
import SingIn from '../pages/SignIn'
import Main from '../pages/Main';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getItem } from '../utils/storage'
import { ContextProvider } from '../context/context'

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}
function MainRoutes() {
    return (
        <ContextProvider >
            <Routes>
                <Route path='/' element={<SingIn />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Main' element={<Main />} />
                <Route element={<ProtectedRoutes redirectTo='/' />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </ContextProvider >
    )

}

export default MainRoutes;