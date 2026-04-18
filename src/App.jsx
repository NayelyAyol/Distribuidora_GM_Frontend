import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Landing from "./pages/Landing"
import Login from "./features/auth/pages/LoginPage"
import Register from "./features/auth/pages/RegisterPage"
import ForgotPassword from "./features/auth/pages/ForgotPassword"
import  Confirm  from "./features/auth/pages/Confirm"

import ProtectedRoute from "./routes/ProtectedRoute"
import MainLayout from "./components/layout/MainLayout"

// Pages
import Dashboard from "./features/dashboard/pages/DashboardPage"
import VendedorPage from "./features/admin/usuarios/pages/VendedorPage"
import ProfilePage from "./features/admin/profile/pages/ProfilePage"
import UsuariosPage from "./features/admin/usuarios/pages/UsuariosPage"
import CategoriasPage from "./features/admin/categorias/pages/CategoriaPage"
import NotFound from "./features/notfound/NotFound"

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar-contraseña" element={<ForgotPassword />} />

        {/* PRIVATE */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ADMIN */}
          <Route path="/dashboard/perfil" element={<ProfilePage />} />
          <Route path="/dashboard/vendedores" element={<VendedorPage />} />
          <Route path="/dashboard/usuarios" element={<UsuariosPage />} />
          <Route path="/dashboard/categorias" element={<CategoriasPage />} />
        </Route>

        {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App