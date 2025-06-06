fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((user) => {
      const markupUser = `<li>${user.name}, número de usuario ${user.id}</li>`;
      document
        .querySelector(".users")
        .insertAdjacentHTML("beforeend", markupUser);

      const markupContact = `<div>
                <p>Datos de contacto de ${user.name}</p>
                <ul>
                    <li>Usuario: ${user.username}</li>
                    <li>Correo: ${user.email}</li>
                    <li>Teléfono: ${user.phone}</li>
                    <li>Sitio web: ${user.website}</li>
                </ul>
                    </div>`;
      document
        .querySelector(".email")
        .insertAdjacentHTML("beforeend", markupContact);

      const markupAddress = `<div>
                <p>Ubicación de ${user.name}</p>
                <ul>
                    <li>Ciudad: ${user.address.city}</li>
                    <li>Dirección: ${user.address.street}</li>
                    <li>Depto: ${user.address.suite}</li>
                    <li>Código postal: ${user.address.zipcode}</li>
                    <a href="https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}">Ver en mapa</a>
                </ul>
            </div>`;
      document
        .querySelector(".address")
        .insertAdjacentHTML("beforeend", markupAddress);
    });
  })
  .catch((error) => console.log(error));
