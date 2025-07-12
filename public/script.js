const form = document.getElementById('formCliente');
const lista = document.getElementById('lista');
const idField = document.getElementById('id');
const docField = document.getElementById('documento');
const nameField = document.getElementById('nombre');
const apeField = document.getElementById('apellido');
const cancelBtn = document.getElementById('cancelar');

// Renderizar lista de clientes
function render(data) {
  console.log('DATA RECIBIDA:', data); // <-- Aquí
  lista.innerHTML = '';
  data.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${c.documento} - ${c.nombre} - ${c.apellido}
      <button data-id="${c._id}" class="edit">Editar</button>
      <button data-id="${c._id}" class="delete">Eliminar</button>`;
    lista.appendChild(li);
  });
}

// Obtener todos los clientes del servidor
function load() {
  fetch('/clientes')
    .then(r => r.json())
    .then(render);
}

// Manejar envío de formulario (crear o editar)
form.addEventListener('submit', e => {
  e.preventDefault();
  const body = { documento: docField.value, nombre: nameField.value, apellido: apeField.value};
  const id = idField.value;
  const url = id ? `/clientes/${id}` : '/clientes';
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(() => {
    form.reset(); idField.value = '';
    load();
  });
});

// Eventos de editar y eliminar en la lista
lista.addEventListener('click', e => {
  const id = e.target.dataset.id;
  if (e.target.classList.contains('edit')) {
    fetch('/clientes')
      .then(r => r.json())
      .then(data => {
        const c = data.find(x => x._id === id);
        idField.value = c._id; docField.value = c.documento; nameField.value = c.nombre; apeField.value = c.apellido;
      });
  } else if (e.target.classList.contains('delete')) {
    fetch(`/clientes/${id}`, { method: 'DELETE' })
      .then(() => load());
  }
});

// Cancelar edición
cancelBtn.addEventListener('click', () => { form.reset(); idField.value = ''; });

// Carga inicial
load();
