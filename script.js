const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const clearButton = document.getElementById("clear-button");
const instructions = document.getElementById("app__messages");
const userdataEls = document.getElementsByClassName("userdata");
const stats = document.getElementsByClassName("stats");
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const buildUserUrl = (userID) => {
  if (userID) {
    return `${BASE_URL}/${userID}`;
  } else {
    return BASE_URL;
  }
};

const fetchJson = async (url) => {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Fetch falló con status ${resp.status} en ${url}`);
  }
  return resp.json();
};

const fetchAllUsers = async () => {
  try {
    const data = await fetchJson(buildUserUrl());
    stats.textContent = `Número total de usuarios: ${data.length}`;
  } catch (err) {
    console.error("Error al obtener los usuarios iniciales:", err);
    stats.textContent = "No se pudo cargar la cantidad de usuarios.";
  }
};

const getUsers = async () => {
  try {
    const userID = searchInput.value.trim();
    if (!userID) {
      instructions.textContent = `Debes ingresar un número en el buscador.`;
      return;
    }
    const data = await fetchJson(buildUserUrl(userID));
    showData(data);
  } catch (err) {
    alert("Usuario no encontrado");
    console.error(err);
  }
};

const showData = (data) => {
  instructions.textContent = "";

  const markupUser = `
    <div class="userdata">
        <h1>Usuarios activos:</h1>
        <li>${data.name}, número de usuario ${data.id}</li>
        <li>Usuario: ${data.username}</li>
        <h1>Contacto:</h1>
        <li>Correo: ${data.email}</li>
        <li>Teléfono: ${data.phone}</li>
        <li>Sitio web: ${data.website}</li>
        <h1>Ubicación:</h1>
        <li>Ciudad: ${data.address.city}</li>
        <li>Dirección: ${data.address.street}</li>
        <li>Depto: ${data.address.suite}</li>
        <li>Código postal: ${data.address.zipcode}</li>
        <li><a href="https://www.google.com/maps/search/?api=1&query=${data.address.geo.lat},${data.address.geo.lng}">Ver en mapa</a></li>
    </div>`;
  document.querySelector(".data").insertAdjacentHTML("beforeend", markupUser);
};

const clearData = () => {
  for (let el of userdataEls) {
    el.innerHTML = "";
  }
};

const showInstructions = () => {
  clearData();
  instructions.textContent = `Ingresa el número de proveedor en la barra de búsqueda y haz clic en "Buscar."
También puedes hacer clic en "Aleatorio" para encontrar un proveedor al azar, o usar el
botón "Limpiar" para reiniciar el buscador`;
};

const getRandomUsers = () => {
  clearData();
  const MAX_ID = 10;
  const randomId = Math.floor(Math.random() * MAX_ID) + 1;
  searchInput.value = randomId;
  getUsers();
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearData();
  getUsers();
});

clearButton.addEventListener("click", showInstructions);

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  getRandomUsers();
});
