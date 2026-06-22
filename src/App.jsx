import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import NavigationSetter from "./components/NavigationSetter"
import PrivateRoute from "./routes/ProtectedRoute"

// Layouts
import MainLayout from "./components/layout/MainLayout"
import PublicLayout from "./layouts/PublicLayout"

// Páginas públicas
const Landing             = lazy(() => import("./pages/Landing"))
const Login               = lazy(() => import("./features/auth/pages/LoginPage"))
const Register            = lazy(() => import("./features/auth/pages/RegisterPage"))
const ForgotPassword      = lazy(() => import("./features/auth/pages/ForgotPassword"))
const Confirm             = lazy(() => import("./features/auth/pages/Confirm"))
const ResetPasswordPage   = lazy(() => import("./features/auth/pages/ResetPasswordPage"))
const CatalogoPage        = lazy(() => import("./features/catalogo/pages/CatalogoPage"))
const ProductoDetallePage = lazy(() => import("./features/producto/pages/ProductoDetallePage"))
const NotFound            = lazy(() => import("./features/notfound/NotFound"))

// Páginas privadas compartidas
const Dashboard     = lazy(() => import("./features/dashboard/pages/DashboardPage"))
const ProfilePage   = lazy(() => import("./features/admin/profile/pages/ProfilePage"))
const CategoriasPage = lazy(() => import("./features/admin/categorias/pages/CategoriaPage"))
const ProductosPage = lazy(() => import("./features/vendedor/productos/pages/ProductosPage"))

// Administrador
const UsuariosPage        = lazy(() => import("./features/usuarios/pages/UsuariosPage"))
const UsuariosCreatePage  = lazy(() => import("./features/usuarios/pages/UsuariosCreatePage"))
const FeedbackPage        = lazy(() => import("./features/feedback/pages/FeedbackPage"))
const RecomendacionesPage = lazy(() => import("./features/recommendations/pages/RecomendacionPage"))

// Vendedor
const CrearProductoPage          = lazy(() => import("./features/vendedor/productos/pages/CrearProductoPage"))
const ActualizarProductoPage     = lazy(() => import("./features/vendedor/productos/pages/ActualizarProductoPage"))
const PedidosDisponiblesPage     = lazy(() => import("./features/vendedor/pedidos/pages/PedidosDisponiblesPage"))
const PedidosPage                = lazy(() => import("./features/vendedor/pedidos/pages/PedidosPage"))
const PedidoDetallePage          = lazy(() => import("./features/vendedor/pedidos/pages/PedidoDetallePage"))
const VentaPage                  = lazy(() => import("./features/vendedor/ventas/pages/VentaPage"))
const CobroPage                  = lazy(() => import("./features/vendedor/ventas/pages/CobroPage"))
const ConfirmacionVentaPage      = lazy(() => import("./features/vendedor/ventas/pages/ConfirmacionVentaPage"))
const VentaExitosaPage           = lazy(() => import("./features/vendedor/ventas/pages/VentaExitosaPage"))
const MisVentasPage              = lazy(() => import("./features/vendedor/ventas/pages/MisVentasPage"))
const VentaDetallePage           = lazy(() => import("./features/vendedor/ventas/pages/VentaDetallePage"))
const RecomendacionesVendedorPage = lazy(() => import("./features/vendedor/recomendaciones/pages/RecomendacionPage"))

// Cliente
const CarritoPage                 = lazy(() => import("./features/cliente/carrito/pages/CarritoPage"))
const SeleccionMetodoPagoPage     = lazy(() => import("./features/cliente/carrito/pages/SeleccionMetodoPago"))
const ConfirmacionPedidoPage      = lazy(() => import("./features/cliente/carrito/pages/ConfirmacionPedidoPage"))
const PedidoExitosoPage           = lazy(() => import("./features/cliente/carrito/pages/PedidoExitosoPage"))
const NuevoPedidoPage             = lazy(() => import("./features/cliente/pedidos/pages/NuevoPedidoPage"))
const QuejasSugerenciasClientePage = lazy(() => import("./features/cliente/quejasysugerencias/pages/QuejasSugerenciasClientePage"))


const ALL   = ["ADMINISTRADOR", "VENDEDOR", "CLIENTE"]
const ADM   = ["ADMINISTRADOR"]
const VEN   = ["VENDEDOR"]
const CLI   = ["CLIENTE"]
const ADM_VEN = ["ADMINISTRADOR", "VENDEDOR"]
const ADM_VEN_CLI = ALL
const VEN_CLI = ["VENDEDOR", "CLIENTE"]

const privateRoutes = [
  // Compartidas
  { path: "/dashboard",          roles: ADM_VEN,     element: <Dashboard /> },
  { path: "/dashboard/perfil",   roles: ALL,         element: <ProfilePage /> },
  { path: "/dashboard/categorias", roles: ALL,       element: <CategoriasPage /> },
  { path: "/dashboard/categorias/:categoriaId/productos",                      roles: ALL,     element: <ProductosPage /> },
  { path: "/dashboard/categorias/:categoriaId/productos/crear",                roles: ADM_VEN, element: <CrearProductoPage /> },
  { path: "/dashboard/categorias/:categoriaId/productos/actualizar/:id",       roles: ADM_VEN, element: <ActualizarProductoPage /> },

  // Administrador
  { path: "/dashboard/usuarios",          roles: ADM, element: <UsuariosPage /> },
  { path: "/dashboard/vendedores",        roles: ADM, element: <UsuariosCreatePage tipo="VENDEDOR" /> },
  { path: "/dashboard/quejas-sugerencias",roles: ADM, element: <FeedbackPage /> },
  { path: "/dashboard/recomendaciones",   roles: ADM, element: <RecomendacionesPage /> },

  // Vendedor
  { path: "/dashboard/pedidos",                                         roles: VEN,     element: <PedidosDisponiblesPage /> },
  { path: "/dashboard/ventas",                                          roles: VEN,     element: <VentaPage /> },
  { path: "/dashboard/ventas/cobro",                                    roles: VEN,     element: <CobroPage /> },
  { path: "/dashboard/ventas/cobro/confirmacion-venta",                 roles: VEN,     element: <ConfirmacionVentaPage /> },
  { path: "/dashboard/ventas/cobro/confirmacion-venta/venta-exitosa",   roles: VEN,     element: <VentaExitosaPage /> },
  { path: "/dashboard/mis-ventas",                                      roles: VEN,     element: <MisVentasPage /> },
  { path: "/dashboard/mis-ventas/detalle/:id",                          roles: VEN,     element: <VentaDetallePage /> },
  { path: "/dashboard/recomendaciones-vendedor",                        roles: VEN,     element: <RecomendacionesVendedorPage /> },

  // Compartidas Vendedor + Cliente
  { path: "/dashboard/mis-pedidos",       roles: VEN_CLI, element: <PedidosPage /> },
  { path: "/dashboard/mis-pedidos/:id",   roles: VEN_CLI, element: <PedidoDetallePage /> },

  // Cliente
  { path: "/dashboard/catalogo",                                              roles: CLI, element: <CatalogoPage /> },
  { path: "/dashboard/producto/:id",                                           roles: CLI, element: <ProductoDetallePage /> },
  { path: "/dashboard/mi-carrito",                                             roles: CLI, element: <CarritoPage /> },
  { path: "/dashboard/mi-carrito/pago",                                        roles: CLI, element: <SeleccionMetodoPagoPage /> },
  { path: "/dashboard/mi-carrito/pago/confirmar-pago",                         roles: CLI, element: <ConfirmacionPedidoPage /> },
  { path: "/dashboard/mi-carrito/pago/confirmar-pago/pedido-exitoso",          roles: CLI, element: <PedidoExitosoPage /> },
  { path: "/dashboard/mis-pedidos/nuevo-pedido",                               roles: CLI, element: <NuevoPedidoPage /> },
  { path: "/dashboard/mis-pedidos/pago",                                        roles: CLI, element: <SeleccionMetodoPagoPage /> },
  { path: "/dashboard/mis-pedidos/pago/confirmar-pago",                         roles: CLI, element: <ConfirmacionPedidoPage /> },
  { path: "/dashboard/mis-pedidos/pago/confirmar-pago/pedido-exitoso",          roles: CLI, element: <PedidoExitosoPage /> },
  { path: "/dashboard/mis-quejas-y-sugerencias",                               roles: CLI, element: <QuejasSugerenciasClientePage /> },
]

function LoadingScreen() {
  return <div className="p-6 text-gray-500">Cargando...</div>
}

export default function App() {
  return (
    <>
      <ToastContainer />
      <NavigationSetter />

      <Suspense fallback={<LoadingScreen />}>
        <Routes>

          {/* Públicas */}
          <Route path="/login"                        element={<Login />} />
          <Route path="/confirm"                      element={<Confirm />} />
          <Route path="/registro"                     element={<Register />} />
          <Route path="/resetear-password"            element={<ForgotPassword />} />
          <Route path="/recuperar-password/:token"    element={<ResetPasswordPage />} />

          <Route element={<PublicLayout />}>
            <Route path="/"           element={<Landing />} />
            <Route path="/catalogo"   element={<CatalogoPage />} />
            <Route path="/producto/:id" element={<ProductoDetallePage />} />
          </Route>

          {/* Privadas */}
          <Route
            element={
              <PrivateRoute roles={ALL}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            {privateRoutes.map(({ path, roles, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute roles={roles}>
                    {element}
                  </PrivateRoute>
                }
              />
            ))}
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </>
  )
}