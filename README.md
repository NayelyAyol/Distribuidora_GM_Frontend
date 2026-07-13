<h1 align="center">Distribuidora Grupo Moreno — Frontend</h1>

<p align="center">
  <strong>Trabajo de Integración Curricular</strong> — Escuela Politécnica Nacional<br>
  Desarrollo de un sistema web basado en IA y N8N para la gestión y comercialización de artículos de oficina.
</p>

---

## Descripción

**Distribuidora Grupo Moreno** es un negocio ubicado en el sur de Quito dedicado a la venta de productos escolares, materiales de oficina y suministros tecnológicos. Este repositorio contiene el componente **frontend** del sistema web desarrollado como parte del Trabajo de Integración Curricular para la obtención del título de **Tecnólogo Superior en Desarrollo de Software**.

El sistema permite al negocio automatizar visualmente sus procesos internos, reducir la intervención manual, mejorar la gestión de la información y adoptar decisiones más oportunas mediante la visualización de información centralizada, organizada y en tiempo real.

---

## Recursos importantes

| Recurso | Enlace |
|---|---|
| **Formulario F_AA_233** | [Acceder al formulario](https://epnecuador-my.sharepoint.com/:b:/g/personal/nayely_ayol_epn_edu_ec/IQDGGZMJBYgVSpsbU5W9fjFUAQqvHE0g_CcPMG3pCUdbQt4?e=bs8dmS) |
| **Formulario F_AA_234** | [Acceder al formulario](https://epnecuador-my.sharepoint.com/:b:/g/personal/nayely_ayol_epn_edu_ec/IQBSqO7BBe1JQLV6NigJ3nzyASY3ArSwA2nn0fouyjV_nnA?e=E1450D) |
| **Formulario F_AA_236** | [Acceder al formulario](https://epnecuador-my.sharepoint.com/:b:/g/personal/nayely_ayol_epn_edu_ec/IQAZ4UnZbAvWSq5Drwuxd6eCAXZRK-Uq7U413fua-VOCAK4?e=OCxalv) |
| **Documento de tesis** | [Ver documento](https://epnecuador-my.sharepoint.com/:b:/g/personal/nayely_ayol_epn_edu_ec/IQD8diL1tSu3Sa6r9kQUdLZ2ATQYk2OWxkY_RINBpOCB-D0?e=Yt6gNL) |
| **Certificación-IA** | [Ver certificado](https://epnecuador-my.sharepoint.com/:b:/g/personal/nayely_ayol_epn_edu_ec/IQAPA3d0BzRpTJ2LeoqOvhApAUfM0vu7_SHCzv02DWUGY7o?e=8qf6p4) |
| **Reporte de Turnitin** | [Ver reporte](https://epnecuador-my.sharepoint.com/:b:/g/personal/nayely_ayol_epn_edu_ec/IQDrQXwYanDvTrkU9uHKGBsZAbruxh4GJKJ24qE_aa-19lQ?e=Erxvfa) |
| **Video demostrativo** | [Ver video](https://youtu.be/k-cK8yeuxEI?si=Zun6W7I-MPhFBZKq) |

---

## Aplicación en producción

```
https://distribuidoragm.netlify.app/
```
---

## Pantallas del sistema

### Landing Page

<img width="1342" height="624" alt="image" src="https://github.com/user-attachments/assets/51301f6e-363b-46f1-ace5-c8bc431ba837" />

### Dashboard

<img width="1322" height="634" alt="image" src="https://github.com/user-attachments/assets/1092d728-fee5-4b5a-8391-abe6481af48d" />

### Módulo de ventas (Vendedor)

<img width="1361" height="641" alt="image" src="https://github.com/user-attachments/assets/48251615-d9b9-48da-aaea-30a1760bccae" />

### Recomendaciones automatizadas con N8N

<img width="1326" height="618" alt="image" src="https://github.com/user-attachments/assets/fa6eae8b-a486-42d7-b0bf-380a038b0b2f" />

### Recomendaciones de productos

<img width="1366" height="928" alt="image" src="https://github.com/user-attachments/assets/7a94161b-5e24-431c-9a84-44fcf128b4b7" />

### Catálogo de productos (Cliente)

<img width="1341" height="639" alt="image" src="https://github.com/user-attachments/assets/41d8ec2a-b29a-4ddb-ad6f-e6fbcc234ac2" />

### Carrito de compras

<img width="1346" height="640" alt="image" src="https://github.com/user-attachments/assets/d39e4ff5-48cf-4f53-9dcb-0fccd1c166c0" />

---

## Roles del sistema

### Administrador
- Inicio de sesión y gestión de perfil
- Restablecimiento de contraseña
- Gestión de vendedores y clientes
- Gestión de categorías
- Visualización de estadísticas y reporte de ventas
- Gestión de quejas y/o sugerencias
- Recomendaciones automatizadas mediante N8N

### Vendedor
- Inicio de sesión y gestión de perfil
- Restablecimiento de contraseña
- Gestión de productos e inventario
- Visualización de ventas realizadas
- Gestión de pedidos pendientes
- Recomendaciones al administrador

### Cliente
- Registro e inicio de sesión
- Restablecimiento de contraseña
- Gestión de perfil
- Visualización del catálogo de productos y categorías
- Gestión del carrito de compras
- Proceso de pago (efectivo, transferencia o tarjeta)
- Gestión de quejas y/o sugerencias


<img width="1342" height="800" alt="image" src="https://github.com/user-attachments/assets/4b27373f-7b1f-4207-a318-de8b5e8c6728" />

---

## Tecnologías utilizadas

### Herramientas
| Herramienta | Uso |
|---|---|
| **React** | Biblioteca principal para la construcción de interfaces |
| **Tailwind CSS** | Framework CSS con enfoque Utility First |
| **Vite** | Entorno de desarrollo y empaquetado |
| **Visual Studio Code** | Editor de código |
| **Figma** | Diseño de interfaces y prototipos |
| **GitHub** | Control de versiones y repositorio |
| **Netlify** | Despliegue y alojamiento del frontend |

### Librerías
| Librería | Descripción |
|---|---|
| `axios` | Envío y recepción de datos mediante peticiones HTTP(S) |
| `react-router-dom` | Navegación entre páginas de la aplicación |
| `react-hook-form` | Creación y validación de formularios |
| `react-toastify` | Mensajes informativos (éxito, error, advertencia) |

### Patrón de arquitectura
El frontend implementa una arquitectura **por capas (MVC — Modelo-Vista-Controlador)**, lo cual permite una adecuada organización del código, escalabilidad de funciones e integración de servicios externos.

<img width="1342" height="754" alt="image" src="https://github.com/user-attachments/assets/c974f1cf-1e3b-4d98-b249-9a5eb81560c1" />

---

## Instalación y ejecución local

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/NayelyAyol/Distribuidora_GM_Frontend.git

# 2. Ingresar al directorio
cd Distribuidora_GM_Frontend

# 3. Instalar dependencias
npm install

# 4. Crear el archivo de variables de entorno
cp .env.example .env
# Edita .env con la URL del backend

# 5. Ejecutar en modo desarrollo
npm run dev
```

---

## Metodología — Scrum

El proyecto se desarrolló bajo el marco ágil **Scrum**, organizado en 6 sprints:

| Sprint | Descripción |
|---|---|
| Sprint 0 | Preparación del entorno de desarrollo |
| Sprint 1 | Gestión de cuenta para todos los roles |
| Sprint 2 | Módulos del administrador |
| Sprint 3 | Módulos del vendedor |
| Sprint 4 | Módulos del cliente |
| Sprint 5 | Pruebas y despliegue |

---

## Autora

**Nayely del Rocio Ayol Guanoluisa**  
- nayely.ayol@epn.edu.ec  
- nayelyayol9@gmail.com

**Director:** Ing. Byron Gustavo Loarte Cajamarca, MSc.  
- byron.loarteb@epn.edu.ec

**Institución:** Escuela Politécnica Nacional — Escuela de Formación de Tecnólogos  
**Carrera:** Tecnólogo Superior en Desarrollo de Software  
**Año:** 2026
