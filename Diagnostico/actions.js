document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    var form = this;
    var formData = new FormData(form); // Crear un objeto FormData con los datos del formulario

    // Validación manual del formulario
    var isValid = true;
    form.querySelectorAll('input, textarea, select').forEach(function (input) {
        if (!input.checkValidity()) {
            isValid = false;
            input.classList.add('is-invalid'); // Marcar el campo como inválido
        } else {
            input.classList.remove('is-invalid'); // Marcar el campo como válido
        }

        // Añadir un listener para corregir el estado de error cuando el usuario modifique el campo
        input.addEventListener('input', function () {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid'); // Quitar la clase de error cuando sea válido
            }
        });
    });

    if (!isValid) {
        return; // Detener el envío si el formulario no es válido
    }

    // Enviar el formulario con AJAX
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Obtener la respuesta del servidor
    .then(data => {
        // Mostrar el mensaje de éxito o error
        var alertContainer = document.getElementById('alert-container');
        alertContainer.style.display = 'block'; // Mostrar el contenedor de alertas

        if (data.includes("Error")) {
            // Mostrar mensaje de error
            alertContainer.innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.
                    </div>
                </div>
            `;
        } else {
            // Mostrar mensaje de éxito
            alertContainer.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">¡Mensaje enviado con éxito!</h4>
                    <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
                    <hr>
                    <p class="mb-0">Si necesitas más ayuda, no dudes en contactarnos nuevamente.</p>
                </div>
            `;
            form.reset(); // Limpiar el formulario después de un envío exitoso
        }

        // Ocultar el mensaje después de 3 segundos
        setTimeout(function () {
            alertContainer.style.display = 'none';
        }, 3000);
    })
    .catch(error => {
        // Mostrar mensaje de error en caso de fallo en la solicitud
        var alertContainer = document.getElementById('alert-container');
        alertContainer.style.display = 'block';
        alertContainer.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.
                </div>
            </div>
        `;

        // Ocultar el mensaje después de 3 segundos
        setTimeout(function () {
            alertContainer.style.display = 'none';
        }, 3000);
    });
});


// Función para cargar los datos en la tabla
function loadData() {
    fetch('get_data.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            console.log(data); // Verifica que los datos son correctos
            const tableBody = document.getElementById('data-table-body');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="8">No se encontraron registros</td></tr>';
            } else {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id}</td>
                        <td>${row.firstName}</td>
                        <td>${row.lastName}</td>
                        <td>${row.email}</td>
                        <td>${row.queryType}</td>
                        <td>${row.message}</td>
                        <td>${row.consent ? 'Sí' : 'No'}</td>
                        <td>${row.submitted_at}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            const tableBody = document.getElementById('data-table-body');
            tableBody.innerHTML = '<tr><td colspan="8">Error al cargar los datos. Inténtalo de nuevo.</td></tr>';
        });
}

// Cargar los datos cuando se abre el acordeón
document.querySelector('.accordion-button').addEventListener('click', function () {
    loadData();  // Cargar los datos solo cuando se abre el acordeón
});

// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', function () {
    loadData();
});

// Actualizar los datos cada 5 segundos (opcional)
setInterval(loadData, 5000);

/*
// Bootstrap form validation
// Validación de Bootstrap
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')

            // Forzar la validación manualmente para los radio buttons
            var radioButtons = form.querySelectorAll('input[type="radio"][name="queryType"]');
            var isRadioSelected = Array.prototype.slice.call(radioButtons).some(function (radio) {
                return radio.checked;
            });
            if (!isRadioSelected) {
                var invalidFeedback = form.querySelector('.invalid-feedback');
                if (invalidFeedback) {
                    invalidFeedback.style.display = 'block';
                }
            }
        }, false)
    })
})();*/
