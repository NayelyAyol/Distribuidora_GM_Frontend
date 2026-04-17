import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Landing from "./pages/Landing"
import Login from "./features/auth/pages/LoginPage"
import Register from "./features/auth/pages/RegisterPage"
import ForgotPassword from "./features/auth/pages/ForgotPassword"

import ProtectedRoute from "./routes/ProtectedRoute"
import MainLayout from "./components/layout/MainLayout"

// Pages
import Dashboard from "./features/dashboard/pages/DashboardPage"
import VendedorPage from "./features/admin/vendedores/pages/VendedorPage"
import ProfilePage from "./features/admin/profile/pages/ProfilePage"
import ClientesPage from "./features/admin/clientes/pages/ClientesPage"
import CategoriasPage from "./features/admin/categorias/pages/CategoriaPage"


function App() {
  return (
    <>
      <ToastContainer />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
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
          <Route path="/dashboard/clientes" element={<ClientesPage />} />
          <Route path="/dashboard/categorias" element={<CategoriasPage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App