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

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <CauseProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route element={<UnAuthenticatedGuard />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                        </Route>
                        <Route element={<AuthenticatedGuard />}>
                            <Route path="/change-password" element={<ChangePassword />} />
                            <Route path="/my-profile" element={<MyProfile />} />
                            <Route path="/my-causes" element={<MyCauses />} />
                            <Route path="/create-cause" element={<CreateCause />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Routes>
                    <ToastContainer />
                    <Footer />
                </CauseProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
