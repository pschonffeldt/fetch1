const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const clearButton = document.getElementById("clear-button");
const instructions = document.getElementById("app__instructions");

const getUsers = async () => {
  try {
    const userID = searchInput.value.toLowerCase();
    if (!userID) return;

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userID}`
    );
    const data = await res.json();
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
  // Get all elements with class "userdata"
  const userdataEls = document.getElementsByClassName("userdata");

  // Loop through and clear each one’s innerHTML
  for (let el of userdataEls) {
    el.innerHTML = "";
  }
  instructions.textContent = `Enter a Pokémon's name or number in the search bar and click "Search." You can also click "Random" to find a random Pokémon, or use the "Clear" button to reset the Pokédex.`;
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearData();
  getUsers();
});

const getRandomUsers = () => {
  clearData();
  const MAX_ID = 10;
  const randomId = Math.floor(Math.random() * MAX_ID) + 1;
  searchInput.value = randomId;
  getUsers();
};

clearButton.addEventListener("click", clearData);

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  getRandomUsers();
});

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     data.forEach((user) => {
//       const markupUser = `<li>${user.name}, número de usuario ${user.id}</li>`;
//       document
//         .querySelector(".users")
//         .insertAdjacentHTML("beforeend", markupUser);

//       const markupContact = `<div>
//                 <p>Datos de contacto de ${user.name}</p>
//                 <ul>
//                     <li>Usuario: ${user.username}</li>
//                     <li>Correo: ${user.email}</li>
//                     <li>Teléfono: ${user.phone}</li>
//                     <li>Sitio web: ${user.website}</li>
//                 </ul>
//                     </div>`;
//       document
//         .querySelector(".email")
//         .insertAdjacentHTML("beforeend", markupContact);

//       const markupAddress = `<div>
//                 <p>Ubicación de ${user.name}</p>
//                 <ul>
//                     <li>Ciudad: ${user.address.city}</li>
//                     <li>Dirección: ${user.address.street}</li>
//                     <li>Depto: ${user.address.suite}</li>
//                     <li>Código postal: ${user.address.zipcode}</li>
//                     <a href="https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}">Ver en mapa</a>
//                 </ul>
//             </div>`;
//       document
//         .querySelector(".address")
//         .insertAdjacentHTML("beforeend", markupAddress);
//     });
//   })
//   .catch((error) => console.log(error));
