# Gecko Solutions - Landing Page

Una landing page moderna, minimalista y responsiva para Gecko Solutions, startup tecnológica boliviana especializada en soluciones digitales para talleres mecánicos, restaurantes y farmacias.

## 🚀 Características Principales

### Diseño y UX
- **Diseño minimalista y elegante** con paleta de colores corporativa
- **Totalmente responsivo** para dispositivos móviles, tablets y desktop
- **Animaciones suaves** y efectos de scroll modernos
- **Tipografía moderna** usando Google Fonts (Inter)
- **Iconografía consistente** con Font Awesome

### Funcionalidades
- **Navegación suave** entre secciones
- **Formulario de contacto funcional** integrado con EmailJS
- **Validación de formularios** en tiempo real
- **Efectos de parallax** sutiles
- **Botón scroll-to-top** animado
- **Optimizado para SEO** con meta tags apropiados

### Productos Destacados
1. **GeckoTaller** - Sistema integral para talleres mecánicos
2. **GeckoRestaurant** - Plataforma completa para restaurantes
3. **GeckoFarma** - Sistema especializado para farmacias

### Servicios
- Desarrollo de aplicaciones móviles
- Migración y actualización de apps
- Sistemas de gestión empresarial
- Soporte técnico 24/7

## 📁 Estructura del Proyecto

```
gecko-solutions/
├── index.html              # Página principal
├── styles.css              # Estilos CSS principales
├── script.js               # JavaScript funcionalidad
├── README.md               # Documentación
├── assets/                 # Recursos estáticos
│   ├── images/
│   │   └── gecko.png       # Logo de la empresa
│   └── icons/              # Iconos adicionales
├── docs/                   # Documentación adicional
│   ├── setup.md           # Guía de instalación
│   └── deployment.md      # Guía de despliegue
└── contact/                # Configuración de contacto
    └── emailjs-config.js   # Configuración EmailJS
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** semántico y accesible
- **CSS3** con variables CSS y Grid/Flexbox
- **JavaScript ES6+** vanilla (sin frameworks)
- **Google Fonts** (Inter) para tipografía
- **Font Awesome 6** para iconografía

### Servicios Externos
- **EmailJS** para envío de formularios
- **Google Fonts API** para tipografías
- **CDN de Font Awesome** para iconos

### Herramientas de Desarrollo
- **CSS Grid y Flexbox** para layouts responsivos
- **CSS Custom Properties** para mantenimiento
- **Intersection Observer API** para animaciones
- **LocalStorage** para preferencias del usuario

## ⚙️ Configuración

### 1. Configuración de EmailJS

Para que el formulario de contacto funcione correctamente:

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar un servicio de email
3. Crear una plantilla de email
4. Actualizar las credenciales en `script.js`:

```javascript
// Reemplazar con tus credenciales de EmailJS
emailjs.init({publicKey: "TU_PUBLIC_KEY"});
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
```

### 2. Personalización de Colores

Los colores se definen en variables CSS en `styles.css`:

```css
:root {
    --gecko-green: #87C52F;        /* Verde principal */
    --gecko-dark-green: #74a929;   /* Verde oscuro */
    --gecko-black: #000000;        /* Negro corporativo */
    --gecko-white: #ffffff;        /* Blanco */
}
```

### 3. Configuración de Analytics (Opcional)

Para integrar Google Analytics, agregar en el `<head>` de `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚀 Instalación y Despliegue

### Desarrollo Local

1. **Clonar o descargar** los archivos del proyecto
2. **Abrir `index.html`** en un navegador web moderno
3. **Usar un servidor local** para desarrollo (recomendado):

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (live-server)
npx live-server

# Con PHP
php -S localhost:8000
```

### Producción

#### Opción 1: Hosting Estático (Recomendado)
- **Netlify**: Arrastra la carpeta del proyecto
- **Vercel**: Conecta con repositorio Git
- **GitHub Pages**: Subir a repositorio público
- **Firebase Hosting**: `firebase deploy`

#### Opción 2: Servidor Web Tradicional
- Subir todos los archivos vía FTP/SFTP
- Configurar dominio y SSL
- Optimizar imágenes para web

### Optimizaciones para Producción

1. **Minificar CSS y JavaScript**
2. **Optimizar imágenes** (WebP, compresión)
3. **Configurar cache headers**
4. **Habilitar compresión GZIP**
5. **Configurar CDN** para recursos estáticos

## 📱 Responsividad

El diseño está optimizado para:

- **Desktop**: 1200px+ (diseño completo)
- **Tablet**: 768px - 1199px (layout adaptado)
- **Mobile**: 320px - 767px (diseño móvil)
- **Mobile pequeño**: 320px - 479px (optimizado)

### Breakpoints Principales

```css
/* Tablet y desktop pequeño */
@media (max-width: 1024px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 480px) { }
```

## 🎨 Guía de Estilo

### Colores Corporativos
- **Verde Gecko**: #87C52F (llamadas a la acción, acentos)
- **Verde Oscuro**: #74a929 (hover states, sombras)
- **Negro**: #000000 (headers, navegación)
- **Grises**: Escala desde #f8f9fa hasta #191c1f

### Tipografía
- **Familia**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Títulos**: Bold (700), tamaños responsivos
- **Texto**: Regular (400), línea de altura 1.6

### Espaciado
- **Sistema de espaciado**: Múltiplos de 0.25rem
- **Contenedores**: Max-width 1200px, padding lateral responsive
- **Secciones**: Padding vertical 4rem (desktop), 2rem (mobile)

## 🔧 Mantenimiento

### Actualización de Contenido

1. **Productos/Servicios**: Editar secciones en `index.html`
2. **Información de contacto**: Actualizar footer y sección de contacto
3. **Colores**: Modificar variables CSS en `:root`
4. **Imágenes**: Reemplazar en carpeta `assets/images/`

### Monitoreo y Analytics

- **Performance**: Usar Chrome DevTools Lighthouse
- **Errores JavaScript**: Consola del navegador
- **Formularios**: Verificar entregas en EmailJS dashboard
- **SEO**: Google Search Console

### Copias de Seguridad

- **Código**: Repositorio Git (GitHub/GitLab)
- **Configuración**: Documentar cambios en EmailJS
- **Contenido**: Backup regular de archivos

## 📞 Información de Contacto

### Gecko Solutions
- **WhatsApp**: +591 64222142
- **Email**: info@geckosolutions.bo
- **Ubicación**: La Paz, Bolivia
- **Servicios**: Nacional

### Soporte Técnico
Para soporte técnico del sitio web o modificaciones, contactar al equipo de desarrollo de Gecko Solutions.

## 📄 Licencia

© 2024 Gecko Solutions. Todos los derechos reservados.

---

**Desarrollado con ❤️ por el equipo de Gecko Solutions**