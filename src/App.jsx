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
import RecomendacionesPage from "./features/recommendations/pages/RecomendacionPage"
import ProductosPage from "./features/vendedor/productos/pages/ProductosPage"
import RecomendacionesVendedorPage from "./features/vendedor/recomendaciones/pages/RecomendacionPage"
import NotFound from "./features/notfound/NotFound"
import PedidosDisponiblesPage from "./features/vendedor/pedidos/pages/PedidosDisponiblesPage"
import PedidosPage from "./features/vendedor/pedidos/pages/PedidosPage"
import PedidoDetallePage from "./features/vendedor/pedidos/pages/PedidoDetallePage"
import CrearProductoPage from "./features/vendedor/productos/pages/CrearProductoPage"
import ActualizarProductoPage from "./features/vendedor/productos/pages/ActualizarProductoPage"
import VentaPage from "./features/vendedor/ventas/pages/VentaPage"
import CarritoPage from "./features/cliente/carrito/pages/CarritoPage"
import SeleccionMetodoPagoPage from "./features/cliente/carrito/pages/SeleccionMetodoPago"
import ConfirmacionPedidoPage from "./features/cliente/carrito/pages/ConfirmacionPedidoPage"
import PedidoExitosoPage from "./features/cliente/carrito/pages/PedidoExitosoPage"
import CobroPage from "./features/vendedor/ventas/pages/CobroPage"
import ConfirmacionVentaPage from "./features/vendedor/ventas/pages/ConfirmacionVentaPage"
import VentaExitosaPage from "./features/vendedor/ventas/pages/VentaExitosaPage"

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
            <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR", "CLIENTE"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" 
          element={
            <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR"]}>
              <Dashboard />
            </ProtectedRoute>} 
          />

          <Route path="/dashboard/perfil" 
          element={
          <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR", "CLIENTE"]}>
              <ProfilePage />
          </ProtectedRoute> }
          />

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
              <ProtectedRoute roles={["ADMINISTRADOR", "VENDEDOR", "CLIENTE"]}>
                <CategoriasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categorias/:categoriaId/productos"
            element={
              <ProtectedRoute roles={["VENDEDOR", "ADMINISTRADOR", "CLIENTE"]}>
                <ProductosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categorias/:categoriaId/productos/crear"
            element={
              <ProtectedRoute roles={["VENDEDOR", "ADMINISTRADOR"]}>
                <CrearProductoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categorias/:categoriaId/productos/actualizar"
            element={
              <ProtectedRoute roles={["VENDEDOR", "ADMINISTRADOR"]}>
                <ActualizarProductoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/mi-carrito"
            element={
              <ProtectedRoute roles={["CLIENTE"]}>
                <CarritoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/mi-carrito/pago"
            element={
              <ProtectedRoute roles={["CLIENTE"]}>
                <SeleccionMetodoPagoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/mi-carrito/pago/confirmar-pago"
            element={
              <ProtectedRoute roles={["CLIENTE"]}>
                <ConfirmacionPedidoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/mi-carrito/pago/confirmar-pago/pedido-exitoso"
            element={
              <ProtectedRoute roles={["CLIENTE"]}>
                <PedidoExitosoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/pedidos"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <PedidosDisponiblesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/mis-pedidos"
            element={
              <ProtectedRoute roles={["VENDEDOR", "CLIENTE"]}>
                <PedidosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/ventas"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <VentaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/ventas/cobro"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <CobroPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/ventas/cobro/confirmacion-venta"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <ConfirmacionVentaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/ventas/cobro/confirmacion-venta/venta-exitosa"
            element={
              <ProtectedRoute roles={["VENDEDOR"]}>
                <VentaExitosaPage />
              </ProtectedRoute>
            }
          />

          <Route
              path="/dashboard/mis-pedidos/:id"
              element={
                <ProtectedRoute roles={["VENDEDOR"]}>
                  <PedidoDetallePage />
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

        </Route>
        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App