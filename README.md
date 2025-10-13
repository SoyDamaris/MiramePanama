<<<<<<< HEAD
# MÍRAME PANAMÁ - Formulario de Registro

Un formulario web juvenil y elegante para el registro de usuarios con integración automática a Google Sheets.

## Características

- ✅ Diseño juvenil y elegante con colores azul, rojo y blanco
- ✅ Logo personalizado de MÍRAME PANAMÁ
- ✅ Validación completa de campos obligatorios
- ✅ Integración automática con Google Sheets
- ✅ Diseño responsivo para móviles y escritorio
- ✅ Animaciones y efectos visuales modernos

## Campos del Formulario

Todos los campos son obligatorios:

1. **Nombre Completo** - Validación de letras y longitud
2. **Dirección** - Texto libre con validación de longitud
3. **Correo Electrónico** - Validación de formato de email
4. **Fecha de Nacimiento** - Validación de fecha válida
5. **Cédula** - Solo números, entre 6-15 dígitos

## Configuración de Google Sheets

### Opción 1: Google Apps Script (Recomendado)

1. **Crear una nueva hoja de cálculo en Google Sheets**
   - Ve a [Google Sheets](https://sheets.google.com)
   - Crea una nueva hoja de cálculo
   - Nombra las columnas: Nombre, Dirección, Correo, Fecha de Nacimiento, Cédula, Timestamp

2. **Crear un script de Google Apps**
   - En tu hoja de cálculo, ve a `Extensiones > Apps Script`
   - Reemplaza el código por defecto con el contenido del archivo `google-apps-script.js`
   - Guarda el proyecto con un nombre descriptivo

3. **Configurar el script como aplicación web**
   - Haz clic en `Implementar > Nueva implementación`
   - Selecciona `Tipo: Aplicación web`
   - Ejecutar como: `Yo`
   - Quién tiene acceso: `Cualquiera`
   - Haz clic en `Implementar`

4. **Actualizar la URL en el código**
   - Copia la URL de la aplicación web
   - Abre `script.js` y reemplaza `YOUR_SCRIPT_ID` con tu ID de script

### Opción 2: Google Forms (Alternativa)

1. **Crear un formulario de Google**
   - Ve a [Google Forms](https://forms.google.com)
   - Crea un nuevo formulario
   - Agrega los campos necesarios con los nombres exactos

2. **Obtener la URL de envío**
   - En el formulario, haz clic en `Enviar`
   - Copia el enlace de envío
   - Reemplaza la URL en `script.js`

3. **Configurar la hoja de respuestas**
   - Ve a `Respuestas > Crear hoja de cálculo`
   - Los datos se guardarán automáticamente

## Instalación

1. **Descargar archivos**
   ```bash
   # Los archivos ya están listos:
   # - index.html
   # - styles.css
   # - script.js
   ```

2. **Configurar Google Sheets**
   - Sigue las instrucciones de configuración arriba
   - Actualiza las URLs en `script.js`

3. **Abrir el formulario**
   - Abre `index.html` en un navegador web
   - O despliega en un servidor web

## Personalización

### Cambiar colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-red: #dc2626;
    --primary-blue: #2563eb;
    --primary-white: #ffffff;
}
```

### Modificar validaciones
Edita el objeto `validations` en `script.js`:
```javascript
const validations = {
    nombre: {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        errorMessage: 'Mensaje personalizado'
    }
};
```

### Agregar campos
1. Agrega el campo en `index.html`
2. Actualiza las validaciones en `script.js`
3. Modifica la función `prepareFormData()`
4. Actualiza la configuración de Google Sheets

## Estructura de Archivos

```
EduGuide/
├── index.html          # Estructura HTML del formulario
├── styles.css          # Estilos CSS con diseño juvenil
├── script.js           # Lógica JavaScript y validaciones
├── google-apps-script.js # Script para Google Apps Script
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con Flexbox y Grid
- **JavaScript ES6+** - Validaciones y lógica del formulario
- **Google Apps Script** - Integración con Google Sheets
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía Inter

## Características de Diseño

- **Responsive Design** - Se adapta a móviles y escritorio
- **Animaciones CSS** - Efectos de entrada y transiciones
- **Validación en Tiempo Real** - Feedback inmediato al usuario
- **Estados Visuales** - Loading, éxito, error
- **Accesibilidad** - Labels, focus states, contraste

## Soporte

Para soporte técnico o personalizaciones adicionales, contacta al equipo de desarrollo.

---

**MÍRAME PANAMÁ** - Formulario de Registro Web
=======
# MiramePanama
>>>>>>> b6692a517745954d28400f32430b013753834012
