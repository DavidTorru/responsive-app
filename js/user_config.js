// Volver a la ventana Principal
var back = document.getElementById("back");

  // Evento para volver a la pagina anterior
back.addEventListener("click", function() {
  window.history.back();
});

// Cambiar imagen de perfil
var changeImg = document.getElementById("changeImg");
var form_userimg = document.getElementById("form_userimg");
var okbtn1 = document.getElementById("okbtn1");
var cancelbtn1 = document.getElementById("cancelbtn1");

  // Evento para el botón cambiar imagen de perfil
changeImg.addEventListener("click", function() {
  form_userimg.style.display = "block"; // Muestra el formulario
});

// Agregar el evento para el boton aceptar
okbtn1.addEventListener("click", function() {
    pass
});

  // Evento para el botón cancelar
cancelbtn1.addEventListener("click", function() {
  form_userimg.style.display = "none"; // Oculta el formulario
});

// Editar datos de la cuenta
var editUsName = document.getElementById("editUsName")
var w2 = document.getElementById("w2")
var okbtn2 = document.getElementById("okbtn2")
var cancelbtn2 = document.getElementById("cancelbtn2")

var editFstName = document.getElementById("editFstName")
var w3 = document.getElementById("w3")
var okbtn3 = document.getElementById("okbtn3")
var cancelbtn3 = document.getElementById("cancelbtn3")

var editLastName = document.getElementById("editLastName")
var w4 = document.getElementById("w4")
var okbtn4 = document.getElementById("okbtn4")
var cancelbtn4 = document.getElementById("cancelbtn4")

var editMail = document.getElementById("editMail")
var w5 = document.getElementById("w5")
var okbtn5 = document.getElementById("okbtn5")
var cancelbtn5 = document.getElementById("cancelbtn5")

  // Evento para cambiar el Nombre del Usuario
editUsName.addEventListener("click", function() {
    w2.style.display = "block"; // Muestra el formulario
  });

  // Agregar el evento para el boton aceptar
okbtn2.addEventListener("click", function() {
    pass
});

  // Evento para el botón cancelar
cancelbtn2.addEventListener("click", function() {
  w2.style.display = "none"; // Oculta el formulario
});

  // Evento para cambiar el Primer Nombre
editFstName.addEventListener("click", function() {
    w3.style.display = "block"; // Muestra el formulario
  });

  // Agregar el evento para el boton aceptar
okbtn3.addEventListener("click", function() {
    pass
});

  // Evento para el botón cancelar
cancelbtn3.addEventListener("click", function() {
  w3.style.display = "none"; // Oculta el formulario
});

  // Evento para cambiar el Apellido
editLastName.addEventListener("click", function() {
    w4.style.display = "block"; // Muestra el formulario
  });

  // Agregar el evento para el boton aceptar
okbtn4.addEventListener("click", function() {
    pass
});

  // Evento para el botón cancelar
cancelbtn4.addEventListener("click", function() {
  w4.style.display = "none"; // Oculta el formulario
});

  // Evento para cambiar el Correo
editMail.addEventListener("click", function() {
    w5.style.display = "block"; // Muestra el formulario
  });

  // Agregar el evento para el boton aceptar
okbtn5.addEventListener("click", function() {
    pass
});

  // Evento para el botón cancelar
cancelbtn5.addEventListener("click", function() {
  w5.style.display = "none"; // Oculta el formulario
});

// Cambiar la Contraseña
var change_password = document.getElementById("change_password");
var formPss = document.getElementById("formPss");
var okbtn6 = document.getElementById("okbtn6");
var cancelbtn6 = document.getElementById("cancelbtn6");

  // Evento para el botón cambiar imagen de perfil
change_password.addEventListener("click", function() {
    formPss.style.display = "block"; // Muestra el formulario
});

  // Agregar el evento para el boton aceptar
okbtn6.addEventListener("click", function() {
    pass
});

  // Evento para el botón cancelar
cancelbtn6.addEventListener("click", function() {
    formPss.style.display = "none"; // Oculta el formulario
});

// Cerrar Sesion
var logoutButton = document.getElementById("logoutButton");

  // Evento para volver a la ventana anterior
logoutButton.addEventListener("click", function() {
  window.location.href = "index.html";
});