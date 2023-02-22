import './variables.css';

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';

import { Footer } from './components/Layout/Footer/Footer';
import { ForgotPassword } from './components/Authentication/ForgotPassword/ForgotPassword';
import { Header } from './components/Layout/Header/Header';
import { Home } from './components/Home/Home';
import Login from './components/Authentication/Login/Login';
import { Logout } from './components/Authentication/Logout/Logout';
import { Register } from './components/Authentication/Register/Register';
import { ChangePassword } from './components/Authentication/ChangePassword/ChangePassword';
import { AuthProvider } from './contexts/AuthContext';
import { CauseProvider } from './contexts/CauseContext';
import { AuthenticatedGuard } from './guards/AuthenticatedGuard';
import { UnAuthenticatedGuard } from './guards/UnAuthenticatedGuard';
import { CreateCause } from './components/Causes/CreateCause/CreateCause';
import { Catalog } from './components/Causes/Catalog/Catalog';
import { Search } from './components/Search/Search';
import { Donate } from './components/Pages/Donate/Donate';
import { EditCause } from './components/Causes/EditCause/EditCause';
import { RemoveCause } from './components/Causes/RemoveCause/RemoveCause';
import { OwnerGuard } from './guards/OwnerGuard';
import { Page404 } from './components/Pages/Page404/Page404';
import { Spinner } from './shared/Spinner';

const Details = lazy(() => import('./components/Causes/Details/Details'));
const JoinedCauses = lazy(() => import('./components/Causes/MyCauses/JoinedCauses/JoinedCauses'));
const MyCauses = lazy(() => import('./components/Causes/MyCauses/MyCreatedCauses/MyCauses'));
const MyProfile = lazy(() => import('./components/User/MyProfile/MyProfile'));
const ForeignProfile = lazy(() => import('./components/User/ForeignProfile/ForeignProfile'));

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <CauseProvider>
                    <Header />
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/details/:causeId" element={<Details />} />
                            <Route path="/foreignProfile/:userId" element={<ForeignProfile />} />
                            <Route path="/donate" element={<Donate />} />
                            <Route path="/search" element={<Search />} />

                            <Route element={<UnAuthenticatedGuard />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                            </Route>

                            <Route element={<AuthenticatedGuard />}>
                                <Route path="/change-password" element={<ChangePassword />} />
                                <Route path="/my-profile" element={<MyProfile />} />
                                <Route path="/my-causes" element={<MyCauses />} />
                                <Route path="/joinedCauses" element={<JoinedCauses />} />
                                <Route path="/create-cause" element={<CreateCause />} />
                                <Route path="/logout" element={<Logout />} />

                                <Route element={<OwnerGuard />}>
                                    <Route path="/edit/:causeId" element={<EditCause />} />
                                    <Route path="/delete/:causeId" element={<RemoveCause />} />
                                </Route>
                            </Route>
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                    <ToastContainer />
                    <Footer />
                </CauseProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
