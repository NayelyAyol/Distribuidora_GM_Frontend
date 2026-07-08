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
| **Formulario** | [Acceder al formulario](https://drive.google.com/drive/folders/1gfpqcx5QPoUCaq23HhrDsVcgJQUHiPZf?usp=sharing) |
| **Documento de tesis** | [Ver documento](https://drive.google.com/drive/folders/1TQsjPepmN-22VomGDVJ9JQcu1T7EoEbz?usp=sharing) |
| **Video demostrativo** | [Ver video](https://youtu.be/k-cK8yeuxEI?si=Zun6W7I-MPhFBZKq) |

---

## Aplicación en producción

```
https://distribuidoragm.netlify.app/
```

---

## Pantallas del sistema

### Panel de administrador



### Módulo de ventas (Vendedor)

<img width="1361" height="641" alt="image" src="https://github.com/user-attachments/assets/48251615-d9b9-48da-aaea-30a1760bccae" />

### Catálogo de productos (Cliente)

<img width="1341" height="639" alt="image" src="https://github.com/user-attachments/assets/41d8ec2a-b29a-4ddb-ad6f-e6fbcc234ac2" />

### Carrito de compras

<img width="1346" height="640" alt="image" src="https://github.com/user-attachments/assets/d39e4ff5-48cf-4f53-9dcb-0fccd1c166c0" />

---

## Roles del sistema

### Administrador
- Inicio de sesión y gestión de perfil
- Gestión de vendedores y clientes
- Gestión de categorías
- Visualización de estadísticas y reporte de ventas
- Gestión de quejas y/o sugerencias
- Recomendaciones automatizadas mediante N8N

### Vendedor
- Inicio de sesión y gestión de perfil
- Gestión de productos e inventario
- Visualización de ventas realizadas
- Gestión de pedidos pendientes
- Recomendaciones al administrador

### Cliente
- Registro e inicio de sesión
- Gestión de perfil
- Visualización del catálogo de productos y categorías
- Gestión del carrito de compras
- Proceso de pago (efectivo, transferencia o tarjeta)
- Gestión de quejas y/o sugerencias

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

<img width="898" height="521" alt="image" src="https://github.com/user-attachments/assets/c974f1cf-1e3b-4d98-b249-9a5eb81560c1" />

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

| Sprint | Descripción | HU cubiertas |
|---|---|---|
| Sprint 0 | Preparación del entorno de desarrollo | — |
| Sprint 1 | Gestión de cuenta para todos los roles | HU-001, HU-002 |
| Sprint 2 | Módulos del administrador | HU-003, HU-004, HU-009, HU-010, HU-017, HU-019 |
| Sprint 3 | Módulos del vendedor | HU-005, HU-006, HU-007, HU-008, HU-011, HU-015, HU-018 |
| Sprint 4 | Módulos del cliente | HU-012, HU-013, HU-014, HU-016 |
| Sprint 5 | Pruebas y despliegue | — |

---

## Pruebas

Se realizaron pruebas unitarias con **Vitest** para verificar el correcto funcionamiento de cada módulo antes del despliegue a producción. Las pruebas cubren los 19 casos de uso definidos en las historias de usuario (HU-001 a HU-019).

---

## Autora

**Nayely del Rocío Ayol Guanoluisa**  
- nayely.ayol@epn.edu.ec  
- nayelyayol9@gmail.com

**Director:** Ing. Byron Gustavo Loarte Cajamarca, MSc.  
- byron.loarteb@epn.edu.ec

**Institución:** Escuela Politécnica Nacional — Escuela de Formación de Tecnólogos  
**Título obtenido:** Tecnólogo Superior en Desarrollo de Software  
**Año:** 2026

---

## Licencia

Este proyecto es público y se encuentra a disposición de la comunidad a través del repositorio institucional de la Escuela Politécnica Nacional. Los derechos patrimoniales corresponden a la autora del presente trabajo.
