import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Landing from "./pages/Landing"
import Login from "./features/auth/pages/LoginPage"
import Register from "./features/auth/pages/RegisterPage"
import ForgotPassword from "./features/auth/pages/ForgotPassword"
import Confirm from "./features/auth/pages/Confirm"
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage"

import ProtectedRoute from "./routes/ProtectedRoute"
import MainLayout from "./components/layout/MainLayout"

// Pages
import Dashboard from "./features/dashboard/pages/DashboardPage"
import VendedorPage from "./features/admin/usuarios/pages/VendedorPage"
import ProfilePage from "./features/admin/profile/pages/ProfilePage"
import UsuariosPage from "./features/admin/usuarios/pages/UsuariosPage"
import CategoriasPage from "./features/admin/categorias/pages/CategoriaPage"
import FeedbackPage from "./features/feedback/pages/FeedbackPage"
import NotificationPage from "./features/notifications/pages/NotificationPage"


import NotFound from "./features/notfound/NotFound"

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>

        {/* PUBLICAS */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar-contraseña" element={<ForgotPassword />} />
        <Route path="/resetear-contraseña" element = {<ResetPasswordPage/>}/>

        {/* PRIVADAS */}
        <Route
          element={
            <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/perfil" element={<ProfilePage />} />

          <Route
            path="/dashboard/usuarios"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR"]}>
                <UsuariosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categorias"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR"]}>
                <CategoriasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/clientes"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR"]}>
                <VendedorPage tipo="CLIENTE" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/vendedores"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR"]}>
                <VendedorPage tipo="VENDEDOR" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/quejas-sugerencias"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR"]}>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/notificaciones"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR"]}>
                <NotificationPage />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App