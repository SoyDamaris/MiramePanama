// Configuración de Google Sheets
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbw7ifaSMWndDOD3o2xMyD9OGaojyCJoihe-WjC9kkz5yKH87R9ymxDaSCohoKYhglR0Tg/exec';

// Elementos del DOM
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validaciones
const validations = {
    nombre: {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        errorMessage: 'El nombre debe contener solo letras y tener entre 2 y 100 caracteres'
    },
    direccion: {
        required: true,
        minLength: 10,
        maxLength: 200,
        errorMessage: 'La dirección debe tener entre 10 y 200 caracteres'
    },
    correo: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Ingresa un correo electrónico válido'
    },
    fechaNacimiento: {
        required: true,
        validate: (value) => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 0 && age <= 120;
        },
        errorMessage: 'Ingresa una fecha de nacimiento válida'
    },
    cedula: {
        required: true,
        pattern: /^[0-9]{6,15}$/,
        errorMessage: 'La cédula debe contener solo números y tener entre 6 y 15 dígitos'
    }
};

// Función para mostrar errores
function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.style.borderColor = '#dc2626';
}

// Función para limpiar errores
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    inputElement.style.borderColor = '';
}

// Función para validar un campo
function validateField(fieldName, value) {
    const validation = validations[fieldName];
    
    if (!validation) return true;
    
    // Validación requerida
    if (validation.required && (!value || value.trim() === '')) {
        showError(fieldName, 'Este campo es obligatorio');
        return false;
    }
    
    if (!value || value.trim() === '') return true;
    
    // Validación de longitud mínima
    if (validation.minLength && value.length < validation.minLength) {
        showError(fieldName, validation.errorMessage);
        return false;
    }
    
    // Validación de longitud máxima
    if (validation.maxLength && value.length > validation.maxLength) {
        showError(fieldName, validation.errorMessage);
        return false;
    }
    
    // Validación de patrón
    if (validation.pattern && !validation.pattern.test(value)) {
        showError(fieldName, validation.errorMessage);
        return false;
    }
    
    // Validación personalizada
    if (validation.validate && !validation.validate(value)) {
        showError(fieldName, validation.errorMessage);
        return false;
    }
    
    clearError(fieldName);
    return true;
}

// Función para validar todo el formulario
function validateForm() {
    let isValid = true;
    const formData = new FormData(form);
    
    for (const [key, value] of formData.entries()) {
        if (!validateField(key, value)) {
            isValid = false;
        }
    }
    
    return isValid;
}

// Función para preparar datos para envío
function prepareFormData() {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        data[key] = value.trim();
    }
    
    // Agregar timestamp
    data.timestamp = new Date().toLocaleString('es-PA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    return data;
}

// Función para mostrar estado de carga
function showLoading() {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
}

// Función para ocultar estado de carga
function hideLoading() {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Registro';
}

// Función para mostrar mensaje de éxito
function showSuccess() {
    successMessage.style.display = 'flex';
    form.style.display = 'none';
    
    // Scroll hacia el mensaje de éxito
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

// Función para enviar datos a Google Sheets
async function sendToGoogleSheets(data) {
    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Como usamos no-cors, no podemos verificar el status
        // Asumimos que fue exitoso si no hay error
        return true;
    } catch (error) {
        console.error('Error enviando datos:', error);
        return false;
    }
}

// Función alternativa para envío usando Google Forms (más confiable)
function sendToGoogleForms(data) {
    // Esta es una implementación alternativa usando Google Forms
    // Necesitarás crear un formulario de Google y usar su URL de envío
    
    const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    const formData = new FormData();
    
    // Mapear campos del formulario a los nombres de entrada de Google Forms
    const fieldMapping = {
        nombre: 'entry.XXXXXXXXX', // Reemplaza con el ID real del campo
        direccion: 'entry.XXXXXXXXX',
        correo: 'entry.XXXXXXXXX',
        fechaNacimiento: 'entry.XXXXXXXXX',
        cedula: 'entry.XXXXXXXXX',
        timestamp: 'entry.XXXXXXXXX'
    };
    
    Object.keys(data).forEach(key => {
        if (fieldMapping[key]) {
            formData.append(fieldMapping[key], data[key]);
        }
    });
    
    return fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });
}

// Event listeners
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) {
        // Enfocar el primer campo con error
        const firstError = form.querySelector('.error-message.show');
        if (firstError) {
            const fieldName = firstError.id.replace('-error', '');
            document.getElementById(fieldName).focus();
        }
        return;
    }
    
    showLoading();
    
    try {
        const formData = prepareFormData();
        
        // Intentar enviar a Google Sheets
        const success = await sendToGoogleSheets(formData);
        
        if (success) {
            showSuccess();
            
            // Opcional: Limpiar formulario después de un delay
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';
                
                // Limpiar todos los errores
                Object.keys(validations).forEach(fieldName => {
                    clearError(fieldName);
                });
            }, 5000);
        } else {
            throw new Error('Error al enviar datos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
        hideLoading();
    }
});

// Validación en tiempo real
Object.keys(validations).forEach(fieldName => {
    const input = document.getElementById(fieldName);
    
    input.addEventListener('blur', () => {
        validateField(fieldName, input.value);
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            clearError(fieldName);
        }
    });
});

// Efectos visuales adicionales
document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para los campos
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach((input, index) => {
        input.style.animationDelay = `${0.1 + index * 0.1}s`;
    });
    
    // Validación visual en tiempo real
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
            input.style.boxShadow = '';
        });
    });
});

// Función para formatear cédula mientras se escribe
document.getElementById('cedula').addEventListener('input', (e) => {
    // Solo permitir números
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Función para formatear nombre mientras se escribe
document.getElementById('nombre').addEventListener('input', (e) => {
    // Capitalizar primera letra de cada palabra
    const words = e.target.value.split(' ');
    const capitalizedWords = words.map(word => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word;
    });
    e.target.value = capitalizedWords.join(' ');
});
