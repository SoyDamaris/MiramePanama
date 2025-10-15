// Configuración de Google Sheets
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbymrWa2qsJcZ3wP3Uura1OKmSF6uNXorAZJShXV6HE_wq31p-U7E_RPueGaE2SVc4EeTw/exec';

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script cargado correctamente');
    
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) {
        console.error('❌ No se encontró el formulario con ID "registrationForm"');
        return;
    }
    
    console.log('✅ Formulario encontrado');
    
    // Validaciones simplificadas
    const validations = {
        cidParticipante: {
            required: true,
            validate: (value) => {
                // Permitir entre 7-9 dígitos (sin contar guiones)
                const digits = value.replace(/[^0-9]/g, '');
                return digits.length >= 7 && digits.length <= 9;
            },
            errorMessage: 'La C.I. debe tener entre 7 y 9 dígitos'
        },
        primerNombre: {
            required: true,
            minLength: 2,
            maxLength: 50,
            errorMessage: 'El primer nombre debe tener entre 2 y 50 caracteres'
        },
        primerApellido: {
            required: true,
            minLength: 2,
            maxLength: 50,
            errorMessage: 'El primer apellido debe tener entre 2 y 50 caracteres'
        },
        fechaNacimiento: {
            required: true,
            errorMessage: 'Debes seleccionar una fecha de nacimiento'
        },
        provincia: {
            required: true,
            errorMessage: 'Debes seleccionar una provincia'
        },
        distrito: {
            required: true,
            minLength: 2,
            maxLength: 50,
            errorMessage: 'El distrito debe tener entre 2 y 50 caracteres'
        },
        corregimiento: {
            required: true,
            minLength: 2,
            maxLength: 50,
            errorMessage: 'El corregimiento debe tener entre 2 y 50 caracteres'
        },
        celular: {
            required: true,
            pattern: /^[0-9]{4}-[0-9]{4}$/,
            errorMessage: 'El celular debe tener el formato 6000-0000'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Ingresa un correo electrónico válido'
        }
    };

    // Función para mostrar errores
    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        if (inputElement) {
            inputElement.style.borderColor = '#dc2626';
        }
    }

    // Función para limpiar errores
    function clearError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        
        if (inputElement) {
            inputElement.style.borderColor = '';
        }
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
        
        // Validación de longitud
        if (validation.minLength && value.length < validation.minLength) {
            showError(fieldName, validation.errorMessage);
            return false;
        }
        
        if (validation.maxLength && value.length > validation.maxLength) {
            showError(fieldName, validation.errorMessage);
            return false;
        }
        
        // Validación de patrón
        if (validation.pattern && !validation.pattern.test(value)) {
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

    // Función para preparar datos
    function prepareFormData() {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        data.timestamp = new Date().toLocaleString('es-PA');
        
        return data;
    }

    // Función para mostrar estado de carga
    function showLoading() {
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        }
    }

    // Función para ocultar estado de carga
    function hideLoading() {
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Registro';
        }
    }

    // Función para mostrar mensaje de éxito
    function showSuccess() {
        if (successMessage) {
            successMessage.style.display = 'flex';
            form.style.display = 'none';
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Función para enviar a Google Sheets
    async function sendToGoogleSheets(data) {
        try {
            console.log('📤 Enviando datos a Google Sheets:', data);
            
            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            console.log('📥 Respuesta recibida:', response);
            return true;
        } catch (error) {
            console.error('❌ Error enviando datos:', error);
            return false;
        }
    }

    // Event listener para el formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        console.log('📝 Formulario enviado');
        
        // Validar formulario
        if (!validateForm()) {
            console.log('❌ Formulario no válido');
            return;
        }
        
        console.log('✅ Formulario válido, enviando...');
        
        showLoading();
        
        try {
            const formData = prepareFormData();
            const success = await sendToGoogleSheets(formData);
            
            if (success) {
                showSuccess();
                console.log('✅ Datos enviados exitosamente:', formData);
                
                // Limpiar formulario después de 5 segundos
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                    
                    // Limpiar errores
                    Object.keys(validations).forEach(fieldName => {
                        clearError(fieldName);
                    });
                }, 5000);
            } else {
                alert('❌ Error al enviar el formulario. Revisa la consola para más detalles.');
            }
        } catch (error) {
            console.error('❌ Error:', error);
            alert('Hubo un error al enviar el formulario.');
        } finally {
            hideLoading();
        }
    });

    // Formateo automático para CID
    const cidInput = document.getElementById('cidParticipante');
    if (cidInput) {
        cidInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            // Formatear automáticamente solo si tiene más de 1 dígito
            if (value.length > 1) {
                if (value.length <= 5) {
                    value = value.slice(0, 1) + '-' + value.slice(1);
                } else if (value.length <= 8) {
                    // Para 6-8 dígitos: X-XXXX-XXX
                    value = value.slice(0, 1) + '-' + value.slice(1, 5) + '-' + value.slice(5);
                } else {
                    // Para 9 dígitos: X-XXXX-XXXX
                    value = value.slice(0, 1) + '-' + value.slice(1, 5) + '-' + value.slice(5, 9);
                }
            }
            
            e.target.value = value;
        });
    }

    // Formateo automático para celular
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 4) {
                value = value.slice(0, 4) + '-' + value.slice(4, 8);
            }
            
            e.target.value = value;
        });
    }

    // Capitalización automática para primer nombre
    const primerNombreInput = document.getElementById('primerNombre');
    if (primerNombreInput) {
        primerNombreInput.addEventListener('input', (e) => {
            const words = e.target.value.split(' ');
            const capitalizedWords = words.map(word => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
                return word;
            });
            e.target.value = capitalizedWords.join(' ');
        });
    }

    // Capitalización automática para primer apellido
    const primerApellidoInput = document.getElementById('primerApellido');
    if (primerApellidoInput) {
        primerApellidoInput.addEventListener('input', (e) => {
            const words = e.target.value.split(' ');
            const capitalizedWords = words.map(word => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
                return word;
            });
            e.target.value = capitalizedWords.join(' ');
        });
    }

    // Capitalización para distrito
    const distritoInput = document.getElementById('distrito');
    if (distritoInput) {
        distritoInput.addEventListener('input', (e) => {
            const words = e.target.value.split(' ');
            const capitalizedWords = words.map(word => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
                return word;
            });
            e.target.value = capitalizedWords.join(' ');
        });
    }

    // Capitalización para corregimiento
    const corregimientoInput = document.getElementById('corregimiento');
    if (corregimientoInput) {
        corregimientoInput.addEventListener('input', (e) => {
            const words = e.target.value.split(' ');
            const capitalizedWords = words.map(word => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
                return word;
            });
            e.target.value = capitalizedWords.join(' ');
        });
    }

    console.log('✅ Todos los event listeners configurados');
});
