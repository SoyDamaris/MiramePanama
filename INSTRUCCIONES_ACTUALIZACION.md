# 📋 Instrucciones de Actualización - MÍRAME PANAMÁ

## ✅ **Cambios Realizados y Subidos a GitHub**

### **🔄 Cambios en el Formulario:**

1. **✅ CID-Participante actualizado:**
   - **Formato anterior:** X-XXXX-XXXX (ej: 1-2345-6789)
   - **Formato nuevo:** X-XXXX-XXX (ej: 1-2345-678)
   - **Validación actualizada** para aceptar el nuevo formato

2. **✅ Nombre separado en dos campos:**
   - **Campo anterior:** Nombre Completo
   - **Campos nuevos:** Primer Nombre + Primer Apellido
   - **Validación independiente** para cada campo

3. **✅ URL de Google Apps Script actualizada:**
   - **Nueva URL:** `https://script.google.com/macros/s/AKfycbymrWa2qsJcZ3wP3Uura1OKmSF6uNXorAZJShXV6HE_wq31p-U7E_RPueGaE2SVc4EeTw/exec`
   - **Actualizada en todos los archivos**

### **📊 Nueva Estructura de Google Sheets:**

```
A: CID-Participante
B: Primer Nombre
C: Primer Apellido
D: Fecha de Nacimiento
E: Provincia
F: Distrito
G: Corregimiento
H: Celular
I: Email
J: Fecha y Hora de Registro
K: IP Address
L: User Agent
```

## 🚀 **Pasos para Completar la Actualización**

### **Paso 1: Actualizar Google Apps Script**

1. **Ve a** [script.google.com](https://script.google.com)
2. **Abre tu proyecto** con ID: `AKfycbymrWa2qsJcZ3wP3Uura1OKmSF6uNXorAZJShXV6HE_wq31p-U7E_RPueGaE2SVc4EeTw`
3. **Borra todo el código existente**
4. **Copia y pega** el contenido completo del archivo `google-apps-script-actualizado.js`
5. **Guarda el proyecto** (Ctrl+S)

### **Paso 2: Verificar Configuración**

Asegúrate de que el script esté configurado como:
- **Tipo:** Aplicación web
- **Ejecutar como:** Yo
- **Quién tiene acceso:** Cualquiera

### **Paso 3: Probar la Actualización**

1. **Abre `diagnostico.html`** en tu navegador
2. **Ejecuta "Probar Conexión Google Sheets"**
3. **Verifica** que aparezca ✅ "Google Sheets funcionando correctamente"

### **Paso 4: Probar el Formulario**

1. **Abre `index.html`** en tu navegador
2. **Llena el formulario** con datos de prueba:
   - **CID:** 1-2345-678
   - **Primer Nombre:** Juan
   - **Primer Apellido:** Pérez
   - **Fecha:** 01/01/1990
   - **Provincia:** Panamá
   - **Distrito:** San Miguelito
   - **Corregimiento:** Villa Lucre
   - **Celular:** 6000-0000
   - **Email:** juan@ejemplo.com
3. **Envía el formulario**
4. **Verifica** que los datos aparezcan en Google Sheets

## 📝 **Archivos Actualizados**

### **Formularios:**
- ✅ `index.html` - Formulario principal actualizado
- ✅ `test.html` - Formulario de prueba actualizado
- ✅ `script.js` - Validaciones y funcionalidad actualizada
- ✅ `script-simple.js` - Script simplificado actualizado

### **Diagnóstico:**
- ✅ `diagnostico.html` - Herramientas de diagnóstico actualizadas

### **Google Apps Script:**
- ✅ `google-apps-script-actualizado.js` - Script completo para Google Apps Script

## 🔧 **Características del Formulario Actualizado**

### **✅ Validaciones:**
- **CID:** Formato X-XXXX-XXX (8 dígitos total)
- **Primer Nombre:** 2-50 caracteres, solo letras
- **Primer Apellido:** 2-50 caracteres, solo letras
- **Fecha:** Validación de fecha válida
- **Provincia:** Selección obligatoria
- **Distrito/Corregimiento:** 2-50 caracteres
- **Celular:** Formato 6000-0000
- **Email:** Formato de email válido

### **✅ Formateo Automático:**
- **CID:** Se formatea automáticamente mientras escribes
- **Nombres:** Capitalización automática
- **Distrito/Corregimiento:** Capitalización automática

### **✅ Integración:**
- **Google Sheets:** Datos se guardan automáticamente
- **Backup:** Copias de seguridad diarias
- **Validación:** Verificación en tiempo real

## 🎯 **Verificación Final**

Después de completar todos los pasos:

1. ✅ **Formulario funciona** - Los datos se envían sin errores
2. ✅ **Nuevos campos** - Primer Nombre y Primer Apellido separados
3. ✅ **CID actualizado** - Formato X-XXXX-XXX funciona
4. ✅ **Google Sheets** - Datos aparecen en las columnas correctas
5. ✅ **Validaciones** - Todos los campos se validan correctamente

## 🚨 **Si hay Problemas**

### **Usa las herramientas de diagnóstico:**
```bash
# Abre en tu navegador:
diagnostico.html
```

### **O usa el formulario de prueba:**
```bash
# Abre en tu navegador:
test.html
```

### **Revisa la consola del navegador (F12)** para ver errores específicos.

---

**💡 Tip:** Todos los cambios ya están subidos a GitHub. Solo necesitas actualizar el Google Apps Script con el código del archivo `google-apps-script-actualizado.js`.
