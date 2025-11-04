# Expo Login & Registro

![Expo](https://img.shields.io/badge/Expo-51.0.0-000000?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

Aplicación móvil creada con Expo para demostrar un flujo moderno de autenticación: inicio de sesión, registro y visualización del perfil con una interfaz limpia y animaciones fluidas.

<p align="center">
  <img src="assets/images/queen.png" alt="Vista previa de la app" width="240" />
</p>

## ✨ Características principales

- Flujo de autenticación completo (login, registro y cierre de sesión) respaldado por `AuthContext`.
- Integración con servicios remotos a través de `apiClient`, `authService` y `profileService`.
- Navegación declarativa usando el sistema de rutas de Expo Router.
- Componentes reutilizables y tipados con TypeScript para asegurar una base sólida.
- Temas, tipografías y recursos gráficos listos para personalizar.

## 🧱 Arquitectura

La aplicación sigue una arquitectura modular con separación clara de responsabilidades:

- `src/app`: pantallas y layout principal administrados por Expo Router.
- `src/components`: componentes UI atómicos listos para reutilizar.
- `src/context/AuthContext.tsx`: proveedor de estado global para autenticación.
- `src/services`: capa de comunicación con la API y abstracciones para login, registro y perfil.
- `src/constants.ts`: configuración compartida (ej.: URLs base, claves o colores).

## 📂 Estructura del proyecto

```text
expo-login-registro
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
├── assets/
│   ├── fonts/
│   └── images/
│       ├── icon.png
│       ├── queen.png
│       └── ...
└── src/
    ├── constants.ts
    ├── app/
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   ├── credits/
    │   ├── home/
    │   ├── login/
    │   └── photo/
    ├── components/
    ├── context/
    └── services/
```

## ⚙️ Configuración rápida

```bash
# 1. Instala dependencias
npm install

# 2. Arranca el servidor de desarrollo
npx expo start

# 3. Escanea el QR con Expo Go o ejecuta en un emulador
```

## 🛠️ Stack tecnológico

- Expo SDK 51 con soporte multiplataforma.
- React Native + TypeScript para maximizar seguridad de tipos.
- Expo Router para la navegación.
- Context API para manejo de estado global.
- Servicios basados en `fetch` con manejo centralizado de cabeceras y errores.

## 📚 Recursos adicionales

- [Documentación oficial de Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
