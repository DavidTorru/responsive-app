let serverActual=null
let channelActual=null
let avatar=null
let username=null
let user_id=null
let name=null
let lastname=null

function update(){
var form1 = document.getElementById("form1")
var form2 = document.getElementById("form2")
var form3 = document.getElementById("form3")
var form4 = document.getElementById("form4")
var form5 = document.getElementById("form5")
data = {
    "username":form2.value,
    "email":form5.value,
    "avatar":form1.value,
    "login_password":"",
    "name":form3.value,
    "lastname":form4.value,
  }
  console.log(data)
  fetch('http://127.0.0.1:5000/update_user', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            })
            .then(response => response.json())
                .then(data => {
                    console.log(data)})
}

// Volver a la ventana Principal
var back = document.getElementById("back");

  // Evento para volver a la pagina anterior
back.addEventListener("click", function() {
  window.history.back();
});

// Mostrar datos del usuario
function testeo(){
console.log("Testeo?")
console.log()
const cookies = document.cookie
console.log(cookies)

fetch('http://127.0.0.1:5000/user', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
    , credentials: 'include'
})

.then(response => response.json())
  .then(data => {
      console.log(data)
      if(!data.error){

          console.log('Respuesta del servidor:', data);
          const refavataruser=document.getElementById("imguser")
          const refusername=document.querySelectorAll("#user-name, #user-name-edit")
          const refuserid=document.getElementById("user-id")
          const refemail=document.getElementById("user-email")
          const reffirst_name=document.getElementById("first-name")
          const reflast_name=document.getElementById("last-name")

          refavataruser.src=data.avatar
          refusername.forEach((element) => {element.textContent = data.username;});
          refuserid.textContent="#"+data.user_id
          refemail.textContent=data.email
          reffirst_name.textContent=data.first_name
          reflast_name.textContent=data.last_name
      }
      else {
      console.log("Is not logged")
      setTimeout(function() {
              window.location.href = '/HTML/index.html';
          }, 1000);
  }
      
  })
.catch(error => {
    console.error('Error:', error);
    console.log(error.name)
    
});
return null;
}
testeo()


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
  update()            
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
  update()            
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
  update()            
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
  update()            
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
  update()            
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

});

  // Evento para el botón cancelar
cancelbtn6.addEventListener("click", function() {
    formPss.style.display = "none"; // Oculta el formulario
});

// Cerrar Sesion
var logoutButton = document.getElementById("logoutButton");

  // Evento para volver a la ventana anterior
logoutButton.addEventListener("click", function() {
  fetch('http://127.0.0.1:5000/log_out', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
    , credentials: 'include'
})
.then(response => response.json())
.then(data => {
    console.log(data)})
    window.alert("Sesion cerrada con exito!")
    window.location.href = '/HTML/index.html'
});
