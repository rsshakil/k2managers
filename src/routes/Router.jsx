import { createContext, useEffect, useId, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
// import components or pages
import { HelmetProvider } from 'react-helmet-async'
import Login from '../pages/Login/Login'
import Verify from '../pages/Verify/Verify'
import AccountLock from '../pages/AccountLock/AccountLock'
import Protected from './Protected' // private route
// import utilities

import ElementAdder from '../components/ElementAdder/ElementAdder'
import WrapperContainer from '../components/layout/WrapperContainer'
import { offInitialize } from '../store/slice/authSlice'
import AuthRouters from './AuthRouters'
import ComponentRouter from './ComponentRouter'
import AppDesigner from '../pages/AppList/AppDesigner'

import Layout from '../components/layout/Layout'
import SimpleLayout from '../components/layout/SimpleLayout'
import Logout from '../pages/Logout/Logout'

export const DataManageContext = createContext()

const Router = () => {
    const [dataManage, setDataManage] = useState({})
    const id = useId()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(offInitialize())
    }, [dispatch])

    return (
        <DataManageContext.Provider value={[dataManage, setDataManage]}>
            <RecoilRoot>
                <BrowserRouter>
                    <WrapperContainer>
                        <Routes>
                            <Route element={<SimpleLayout />}>
                                <Route path="/app_designer/:appId" element={<AppDesigner />} />
                            </Route>
                            <Route element={<Layout />}>
                                <Route index element={<Login />} />
                                <Route path="/login" element={<Navigate to="/" />} />
                                <Route path="*" element={<Navigate to="/top" />} />
                                <Route path="/verify" element={<Verify />} />
                                <Route path="/account_lock" element={<AccountLock />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route
                                    element={
                                        <HelmetProvider>
                                            <Protected>
                                                <Outlet />
                                            </Protected>
                                        </HelmetProvider>
                                    }
                                >
                                    {AuthRouters.map((i) => (
                                        <Route key={id} path={i.path} element={i.element} />
                                    ))}
                                    {ComponentRouter.map((i) => (
                                        <Route key={id} path={i.path} element={i.element} />
                                    ))}
                                </Route>
                                <Route element={<ElementAdder />} path="/adder" />
                            </Route>

                        </Routes>
                    </WrapperContainer>
                </BrowserRouter>
            </RecoilRoot>
        </DataManageContext.Provider>
    )
}

export default Router
