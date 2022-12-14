import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer/Footer';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { MyProfile } from './components/MyProfile/MyProfile';
import { Register } from './components/Register/Register';
import { ChangePassword } from './components/ChangePassword/ChangePassword';
import { AuthProvider } from './contexts/AuthContext';
import { CauseProvider } from './contexts/CauseContext';
import { AuthenticatedGuard } from './guards/AuthenticatedGuard';
import { UnAuthenticatedGuard } from './guards/UnAuthenticatedGuard';
import { CreateCause } from './components/Causes/CreateCause/CreateCause';
import { Catalog } from './components/Causes/Catalog/Catalog';
import { MyCauses } from './components/Causes/MyCauses/MyCauses';
import { Search } from './components/Search/Search';
import { Donate } from './components/Donate/Donate';
import { Details } from './components/Causes/Details/Details';
import { EditCause } from './components/Causes/EditCause/EditCause';
import { RemoveCause } from './components/Causes/RemoveCause/RemoveCause';
import { OwnerGuard } from './guards/OwnerGuard';
import { Page404 } from './components/Page404/Page404';
import { JoinedCauses } from './components/Causes/MyCauses/JoinedCauses';
import { ForeignProfile } from './components/ForeignProfile/ForeignProfile';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <CauseProvider>
                    <Header />
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
                    <ToastContainer />
                    <Footer />
                </CauseProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
