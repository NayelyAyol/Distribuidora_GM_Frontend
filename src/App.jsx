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
import UsuariosCreatePage from "./features/usuarios/pages/UsuariosCreatePage"
import ProfilePage from "./features/admin/profile/pages/ProfilePage"
import UsuariosPage from "./features/usuarios/pages/UsuariosPage"
import CategoriasPage from "./features/admin/categorias/pages/CategoriaPage"
import FeedbackPage from "./features/feedback/pages/FeedbackPage"
import NotificationPage from "./features/recommendations/pages/NotificationPage"
import RecomendacionesPage from "./features/recommendations/pages/RecomendacionPage"
import ProductosPage from "./features/vendedor/productos/pages/ProductosPage"
import ClientesVendedorPage from "./features/vendedor/clientes/pages/ClientesVendedorPage"
import RecomendacionesVendedorPage from "./features/vendedor/recomendaciones/pages/RecomendacionPage"
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
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-contraseña" element={<ForgotPassword />} />
        <Route path="/resetear-contraseña" element={<ResetPasswordPage />} />

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
              <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR"]}>
                <CategoriasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categorias/:categoriaId/productos"
            element={
              <ProtectedRoute roles={["VENDEDOR", "ADMINISTRADOR"]}>
                <ProductosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categorias/:categoriaId/productos/:productoId"
            element={
              <ProtectedRoute roles={["VENDEDOR", "ADMINISTRADOR"]}>
                <ProductosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/pedidos"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <UsuariosCreatePage tipo="CLIENTE" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/vendedores"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR"]}>
                <UsuariosCreatePage tipo="VENDEDOR" />
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
            path="/dashboard/recomendaciones"
            element={
              <ProtectedRoute roles={["ADMINISTRADOR"]}>
                <RecomendacionesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/recomendaciones-vendedor"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <RecomendacionesVendedorPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/clientes-creados"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <ClientesVendedorPage />
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