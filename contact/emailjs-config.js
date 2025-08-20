// ===== CONFIGURACIÓN EMAILJS =====
// Archivo: contact/emailjs-config.js

/**
 * Configuración para EmailJS
 * 
 * IMPORTANTE: Este archivo contiene las configuraciones necesarias para
 * el funcionamiento del formulario de contacto. Asegúrate de configurar
 * correctamente tu cuenta de EmailJS antes de usar.
 */

const EmailJSConfig = {
    // ===== CREDENCIALES EMAILJS =====
    // Obtener de tu dashboard de EmailJS: https://dashboard.emailjs.com/
    
    PUBLIC_KEY: "L-BAzfch2akrFYIrM",     // Tu User ID público
    SERVICE_ID: "service_rmjb2jp",       // ID del servicio de email
    TEMPLATE_ID: "template_l9chp0v",     // ID de la plantilla
    
    // ===== CONFIGURACIÓN DEL TEMPLATE =====
    // Variables que se enviarán en el email
    // Deben coincidir con las variables configuradas en tu template de EmailJS
    
    templateVariables: {
        from_name: "{{from_name}}",           // Nombre del contacto
        from_email: "{{from_email}}",         // Email del contacto
        phone: "{{phone}}",                   // Teléfono del contacto
        service: "{{service}}",               // Servicio solicitado
        message: "{{message}}",               // Mensaje del contacto
        to_email: "info@geckosolutions.bo"    // Email de destino
    },
    
    // ===== PLANTILLA DE EMAIL =====
    // Template HTML sugerido para EmailJS:
    emailTemplate: `
        <h2>Nuevo contacto desde Gecko Solutions</h2>
        
        <h3>Información del contacto:</h3>
        <ul>
            <li><strong>Nombre:</strong> {{from_name}}</li>
            <li><strong>Email:</strong> {{from_email}}</li>
            <li><strong>Teléfono:</strong> {{phone}}</li>
            <li><strong>Servicio de interés:</strong> {{service}}</li>
        </ul>
        
        <h3>Mensaje:</h3>
        <p>{{message}}</p>
        
        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de contacto de geckosolutions.bo</small></p>
    `,
    
    // ===== CONFIGURACIÓN DE RESPUESTA AUTOMÁTICA =====
    // Template para respuesta automática al cliente
    autoReplyTemplate: `
        <h2>¡Gracias por contactar Gecko Solutions!</h2>
        
        <p>Hola {{from_name}},</p>
        
        <p>Hemos recibido tu mensaje sobre <strong>{{service}}</strong> y nos pondremos en contacto contigo en las próximas 24 horas.</p>
        
        <h3>Resumen de tu consulta:</h3>
        <p>{{message}}</p>
        
        <h3>Mientras tanto, puedes:</h3>
        <ul>
            <li>Visitarnos en: <a href="https://geckosolutions.bo">geckosolutions.bo</a></li>
            <li>Seguirnos en redes sociales</li>
            <li>Contactarnos por WhatsApp: +591 64222142</li>
        </ul>
        
        <p>¡Esperamos poder ayudarte pronto!</p>
        
        <p>Saludos,<br>
        <strong>Equipo Gecko Solutions</strong><br>
        La Paz, Bolivia</p>
    `
};

// ===== FUNCIONES DE CONFIGURACIÓN =====

/**
 * Inicializar EmailJS con la configuración
 */
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: EmailJSConfig.PUBLIC_KEY
        });
        console.log('EmailJS inicializado correctamente');
        return true;
    } else {
        console.error('EmailJS no está disponible. Verifica que el script esté cargado.');
        return false;
    }
}

/**
 * Preparar parámetros para el template
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Parámetros formateados para EmailJS
 */
function prepareTemplateParams(formData) {
    return {
        from_name: formData.name || '',
        from_email: formData.email || '',
        phone: formData.phone || 'No proporcionado',
        service: formatServiceName(formData.service) || 'No especificado',
        message: formData.message || '',
        to_email: 'info@geckosolutions.bo',
        // Campos adicionales para tracking
        timestamp: new Date().toLocaleString('es-BO'),
        source: 'Sitio Web - geckosolutions.bo'
    };
}

/**
 * Formatear nombre del servicio para mejor legibilidad
 * @param {string} serviceValue - Valor del select del servicio
 * @returns {string} - Nombre formateado del servicio
 */
function formatServiceName(serviceValue) {
    const serviceNames = {
        'geckotaller': 'GeckoTaller - Sistema para talleres mecánicos',
        'geckorestaurant': 'GeckoRestaurant - Sistema para restaurantes',
        'geckofarma': 'GeckoFarma - Sistema para farmacias',
        'app-development': 'Desarrollo de aplicación móvil personalizada',
        'app-migration': 'Migración y modernización de aplicación',
        'app-update': 'Actualización y mantenimiento de aplicación',
        'web-development': 'Desarrollo de sitio web corporativo',
        'ecommerce': 'Desarrollo de tienda online / E-commerce',
        'consulting': 'Consultoría tecnológica',
        'other': 'Otro servicio / Consulta general'
    };
    
    return serviceNames[serviceValue] || serviceValue || 'Servicio no especificado';
}

/**
 * Enviar email principal usando EmailJS
 * @param {Object} templateParams - Parámetros del template
 * @returns {Promise} - Promesa del envío
 */
function sendMainEmail(templateParams) {
    return emailjs.send(
        EmailJSConfig.SERVICE_ID,
        EmailJSConfig.TEMPLATE_ID,
        templateParams
    );
}

/**
 * Configuración de validación de formulario
 */
const FormValidation = {
    rules: {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'El nombre debe contener solo letras y espacios (mínimo 2 caracteres)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Ingresa un email válido'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[\d\s\-\(\)]{7,}$/,
            message: 'Formato de teléfono no válido'
        },
        service: {
            required: true,
            message: 'Selecciona un servicio'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'El mensaje debe tener entre 10 y 1000 caracteres'
        }
    },
    
    /**
     * Validar un campo específico
     * @param {string} fieldName - Nombre del campo
     * @param {string} value - Valor del campo
     * @returns {Object} - Resultado de la validación
     */
    validateField: function(fieldName, value) {
        const rule = this.rules[fieldName];
        if (!rule) return { isValid: true };
        
        // Verificar si es requerido
        if (rule.required && (!value || value.trim() === '')) {
            return {
                isValid: false,
                message: `${fieldName} es obligatorio`
            };
        }
        
        // Si no es requerido y está vacío, es válido
        if (!rule.required && (!value || value.trim() === '')) {
            return { isValid: true };
        }
        
        // Verificar longitud mínima
        if (rule.minLength && value.length < rule.minLength) {
            return {
                isValid: false,
                message: rule.message
            };
        }
        
        // Verificar longitud máxima
        if (rule.maxLength && value.length > rule.maxLength) {
            return {
                isValid: false,
                message: rule.message
            };
        }
        
        // Verificar patrón
        if (rule.pattern && !rule.pattern.test(value)) {
            return {
                isValid: false,
                message: rule.message
            };
        }
        
        return { isValid: true };
    },
    
    /**
     * Validar todo el formulario
     * @param {Object} formData - Datos del formulario
     * @returns {Object} - Resultado de la validación completa
     */
    validateForm: function(formData) {
        const errors = {};
        let isValid = true;
        
        for (const [fieldName, value] of Object.entries(formData)) {
            const result = this.validateField(fieldName, value);
            if (!result.isValid) {
                errors[fieldName] = result.message;
                isValid = false;
            }
        }
        
        return { isValid, errors };
    }
};

// ===== GUÍA DE CONFIGURACIÓN =====

/**
 * PASOS PARA CONFIGURAR EMAILJS:
 * 
 * 1. Crear cuenta en https://www.emailjs.com/
 * 
 * 2. Crear un servicio de email:
 *    - Ir a "Email Services"
 *    - Agregar servicio (Gmail, Outlook, etc.)
 *    - Configurar credenciales
 * 
 * 3. Crear template de email:
 *    - Ir a "Email Templates"
 *    - Crear nuevo template
 *    - Usar las variables definidas en EmailJSConfig.templateVariables
 *    - Configurar asunto, destinatario, etc.
 * 
 * 4. Obtener credenciales:
 *    - PUBLIC_KEY: En "Account" > "API Keys"
 *    - SERVICE_ID: En la lista de servicios
 *    - TEMPLATE_ID: En la lista de templates
 * 
 * 5. Actualizar las constantes en EmailJSConfig
 * 
 * 6. Probar el formulario en modo desarrollo
 * 
 * ESTRUCTURA DE ARCHIVOS RECOMENDADA:
 * 
 * proyecto/
 * ├── index.html
 * ├── styles.css
 * ├── script.js
 * └── contact/
 *     ├── emailjs-config.js (este archivo)
 *     └── form-handler.js (lógica específica del formulario)
 */

// Exportar configuración para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EmailJSConfig,
        FormValidation,
        initializeEmailJS,
        prepareTemplateParams,
        sendMainEmail,
        formatServiceName
    };
}

// Hacer disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.EmailJSConfig = EmailJSConfig;
    window.FormValidation = FormValidation;
}