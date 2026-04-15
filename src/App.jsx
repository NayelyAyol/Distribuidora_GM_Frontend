import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Landing from "./pages/Landing"
import Login from "./features/auth/pages/LoginPage"
import Register from "./features/auth/pages/RegisterPage"

import ProtectedRoute from "./routes/ProtectedRoute"

// Layout dashboard
import MainLayout from "./components/layout/MainLayout"

// Pages
import Dashboard from "./features/dashboard/pages/DashboardPage"

// Admin
import VendedorPage from "./features/admin/vendedores/pages/VendedorPage"

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/vendedores"
          element={
            <ProtectedRoute>
              <MainLayout>
                <VendedorPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App