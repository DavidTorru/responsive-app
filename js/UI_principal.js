            let serverActual=null
            let channelActual=null
            let avatar=null
            let username=null
            let user_id=null
            
            //Modal de creacion de servidor
            function openModal() {
                var modal = document.getElementById("modal-server");
                modal.style.display = "flex";
            }
            function closeModal() {
                var modal = document.getElementById("modal-server");
                modal.style.display = "none";
            }
            document.getElementById("create-server").addEventListener("click", openModal);
            document.getElementById("close-modal").addEventListener("click", closeModal);


          

            //Modal de creacion de canales
            function openModalchannel() {
                var modal = document.getElementById("modal-channel");
                modal.style.display = "flex";
            }
            function closeModalchannel() {
                var modal = document.getElementById("modal-channel");
                modal.style.display = "none";
            }
            document.getElementById("create-channel").addEventListener("click", openModalchannel);
            document.getElementById("close-modal-channel").addEventListener("click", closeModalchannel);

            //Modal de unirse al servidor
            function openModalAddUser(server_name, server_id) {
               
                var modal = document.getElementById("modal-add-user");
                var span=document.getElementById("add_user_server_name")
                var yes=document.getElementById("yes_add_user")
                yes.removeEventListener('click', function(){
                    join_server(server_id)
                });
                yes.addEventListener('click', function(){
                    join_server(server_id)
                    closeModalAddUser()
                });
                span.textContent=server_name
                modal.style.display = "flex";
                

            }
            function closeModalAddUser() {
                var modal = document.getElementById("modal-add-user");
                modal.style.display = "none";
            }
            
            document.getElementById("no_add_user").addEventListener("click", closeModalAddUser);

            //Funcion para unirse a un servidor
            function join_server(server_id){
                data={
                    'server_id':server_id
                }
                fetch('http://127.0.0.1:5000/add_user', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            }).then(response => response.json())
            .then(data => {
              
                fetchserver()
            })
            .catch(error  => {
                console.log("error: ", error)
            })
            }
            
            function testeo(){
            fetch('http://127.0.0.1:5000/user', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            })
            .then(response => response.json())
                .then(data => {
                  
                    if(!data.error){

                        console.log('Respuesta del servidor:', data);
                        const refavataruser=document.getElementById("user-avatar")
                        const refusername=document.getElementById("user-name")
                        const refuserid=document.getElementById("user-id")
                        
                        refavataruser.src=data.avatar
                        refusername.textContent=data.username
                        refuserid.textContent="#"+data.user_id
                    }
                    else {
                   
                    setTimeout(function() {
                            window.location.href = '/HTML/index.html';
                        }, 1000);
                }
                    
                })
            .catch(error => {
                console.error('Error:', error);
              
                
            });
            return null;
            }
            

            
            // Cargar servidores del usuario
            function fetchserver(){
                fetch('http://127.0.0.1:5000/get_my_servers', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            }).then(response => response.json())
                .then(data => {
                     
                        const referenciadiv=document.getElementById("server")
                        referenciadiv.innerHTML=""
                        for (i=0;i<=data.length;i++){
                
                            const logo_app=document.createElement("div")
                            logo_app.className='logo-app'
                            const logo=document.createElement("img")
                            logo.setAttribute("server-name", data[i].server_id)
                            logo.setAttribute("true-server-name", data[i].name_server)
                            logo.src=data[i].icon
                            logo.width=50
                            logo.height=50
                            logo.alt='Icono del servidor'
                            
        
                            const resaltador=document.createElement('div')
                            resaltador.className='resaltador'

                            logo_app.appendChild(logo)
                            logo_app.appendChild(resaltador)

                            referenciadiv.appendChild(logo_app)

                            logo.addEventListener('click', function() {
                                const serverName = this.getAttribute('server-name');
                                const trueserverName= this.getAttribute('true-server-name')
                                changeToServers()
                                fetchchannels(serverName, trueserverName)
                            });
                        }
                })
                .catch(error => console.log(error))

                
            }

            async function control_fetch(){
                try {
                    await testeo()

                    await fetchallservers()

                    await fetchserver()
                }
                catch(error){
                    console.log(error)
                }
            }
            control_fetch()
            
            //Cargar canales del servidor actual
            function fetchchannels(serverName, trueserverName=null){
                serverActual=serverName
                fetch(`http://127.0.0.1:5000/get_channels/${serverName}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            }).then(response => response.json())
                .then(data => {
                    
                    const refservername=document.getElementById("server-name-display")
                    
                    refservername.textContent=trueserverName
                    const referenciadivcanal=document.getElementById('channel_container')
                    referenciadivcanal.innerHTML = ''
                    for(i=0;i<data.length;i++){
                        const content=document.createElement('div')
                        content.className='content'
                        const content2=document.createElement('div')
                        content2.className='contents2'
                        const adiv=document.createElement('div')
                        const channel_p=document.createElement('p')
                        channel_p.setAttribute("channel-id", data[i].channel_id)
                        channel_p.className='channel-p'
                        channel_p.textContent=data[i].name_channel
                        adiv.appendChild(channel_p)
                        content2.appendChild(adiv)
                        content.appendChild(content2)
                        referenciadivcanal.appendChild(content)

                        channel_p.addEventListener('click', function(){
                           
                            const channelid = this.getAttribute('channel-id');
                            fetchmessages(channelid)
                        })
                    }
                })
            .catch(error => {
                console.error('Error:', error);
        
        })}



            //Crear canales para el servidor actual
            const referenciabotoncrearcanal=document.getElementById("button-create-channel")
            referenciabotoncrearcanal.addEventListener("click", function(){
                event.preventDefault()
                const refnamechannel=document.getElementById("channel-name")
                
                name_channel=refnamechannel.value
                
                

                data={
                    "name_channel": name_channel,
                    "server_id": serverActual
                }
                fetch('http://127.0.0.1:5000/create_channel', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    , credentials: 'include'
                }).then(response => response.json())
                .then(data => {
                    fetchchannels(serverActual)
                   
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })


            // Crear servidores
            const refenciacrearserver= document.getElementById("button-create-server")
            refenciacrearserver.addEventListener("click", function() {
                const refnameserver=document.getElementById("server-name")
                const reflinkserver=document.getElementById("server-link")
        
                name_server = refnameserver.value;
                link_server= reflinkserver.value;

                data={
                    "name_server":name_server,
                    "icon":link_server
                    }
               

                fetch('http://127.0.0.1:5000/create_server', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    , credentials: 'include'
                })
                .then(response => response.json())
                .then(data => {
                  
                    server_id={
                        "server_id":data.id
                    }
                    fetch('http://127.0.0.1:5000/add_user', {
                    method: 'POST',
                    body: JSON.stringify(server_id),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    , credentials: 'include'
                })
                }).then(new_data =>{

                    dat={
                        "name_channel": "General",
                        "server_id": server_id.server_id
                    }
                   
                    fetch('http://127.0.0.1:5000/create_channel', {
                    method: 'POST',
                    body: JSON.stringify(dat),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    , credentials: 'include'
                }).then(dat=>{
                    closeModal()
                    fetchserver()
                    
                
                })
                    })
                .catch(error => {
                    console.error('Error:', error);
                });

               /*  const referenciadiv=document.getElementById("server")
                
                const logo_app=document.createElement("div")
                logo_app.className='logo-app'
                const logo=document.createElement("img")
                logo.src='../image/Logo.png'
                logo.width=50
                logo.height=50
                logo.alt='Logo Discordia'
                
                
    
                const resaltador=document.createElement('div')
                resaltador.className='resaltador'

                logo_app.appendChild(logo)
                logo_app.appendChild(resaltador)

                referenciadiv.appendChild(logo_app) */
            });


            // Crear canales
            



            //Mandar mensajes
            const referenciasend=document.getElementById('send')
            referenciasend.addEventListener('click', function(){
                const textref=document.getElementById("text")
                const texto=textref.value
                
                data={
                    "receiver_id":channelActual,
                    "content":texto
                }

                fetch('http://127.0.0.1:5000/send_message_channel', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    , credentials: 'include'
                }).then(response => response.json())
                .then(data => {
                    fetchmessages(channelActual)
                  
                   
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })


            //Cargar mensajes del canal actual
            function fetchmessages(channelid){
                channelActual=channelid
                fetch(`http://127.0.0.1:5000/get_messages_channel/${channelActual}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            }).then(response => response.json())
                .then(data => {
                  
                    const referenciachat=document.getElementById('chat-container')
                    referenciachat.innerHTML=''
                    for(i=0;i<data.length;i++){
                       
                        

                        const message=document.createElement('div')
                        message.className='message'
                        message.style.marginTop="35px"
                        message.style.marginBottom="35px"
                        const img=document.createElement('img')
                        img.className='avatar'
                        img.src=data[i].avatar
                        img.width=50
                        img.height=50
                        img.alt='Icono del servidor'

                        const divrandom=document.createElement('div')

                        const div_user_date=document.createElement('div')
                        div_user_date.className="user-date"

                        const div_username=document.createElement('div')
                        div_username.style.color = 'white';
                        div_username.style.marginRight = '10px'; 
                        div_username.className="username"
                        div_username.textContent=data[i].username

                        const div_date=document.createElement('div')
                        div_date.textContent=data[i].date

                        const div_options=document.createElement('div')
                        div_options.style.position = 'absolute';
                        div_options.style.top = '10px';
                        div_options.style.right = '90px';
                        div_options.textContent="X"
                        div_options.style.cursor = 'pointer';

                    
                        const id=data[i].id
                        div_options.addEventListener('click', async function() {
                            await deletemessage(id, message);
                            
                        })
                        const text=document.createElement('div')
                        text.style.color="white"
                        text.style.width="69vw"
                        text.style.height="10vh"
                        text.textContent=data[i].content

                        div_user_date.appendChild(div_username)
                        div_user_date.appendChild(div_date)
                        div_user_date.appendChild(div_options)

                        divrandom.appendChild(div_user_date)
                        divrandom.appendChild(text)

                        message.appendChild(img)
                        message.appendChild(divrandom)

                        referenciachat.appendChild(message)

                        
                            }
                        var scrollPosition = referenciachat.scrollHeight - referenciachat.scrollTop;
                        referenciachat.scrollTop = referenciachat.scrollHeight - scrollPosition;
   

                })
            .catch(error => {
                console.error('Error:', error);
        
        })}
           

            //Borrar mensajes
            function deletemessage(message_id, message){
                
                fetch(`http://127.0.0.1:5000/delete_message_channel/${message_id}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            }).then(response => response.json())
            .then(data => {
             
                if (data.error) {
                    
                } else {
                    var parentmessage=message.parentNode
                    parentmessage.removeChild(message)
        }
            })
            .catch(error=>{
                console.log(error)
            })
        }



            //Cargar servidores creados
            let allservers=null
            const testeo2=document.getElementById("search-servers")
            
            testeo2.addEventListener('click', fetchallservers)
            function fetchallservers(){
                fetch(`http://127.0.0.1:5000/servers`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
                , credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    const refservername=document.getElementById("server-name-display")
                    refservername.innerHTML=''
                    allservers=data
                 
                    const refallservercontainer=document.getElementById("all-server-container")
                    refallservercontainer.innerHTML=""
                    for(i=0;i<allservers.length;i++){
                        const content=document.createElement('div')
                        content.className='content'
                        const content2=document.createElement('div')
                        content2.className='contents2'
                        const adiv=document.createElement('div')
                        const channel_p=document.createElement('p')
                        channel_p.setAttribute("channel-id", allservers[i].server_id)
                        channel_p.className='channel-p'
                        channel_p.textContent=allservers[i].name_server
                        const name_server=allservers[i].name_server
                        const id_server=allservers[i].server_id
                        content.addEventListener("click", function(){
                            openModalAddUser(name_server, id_server)
                        });
                        adiv.appendChild(channel_p)
                        content2.appendChild(adiv)
                        content.appendChild(content2)
                        refallservercontainer.appendChild(content)

                        
                    }
                })
                .catch(error => console.log(error))
            }
            
            const reffilter=document.getElementById("filter")
            reffilter.addEventListener('input', function(){
                const filterword=reffilter.value
                const refsearchcontainer=document.getElementById('search-server-container')
                refsearchcontainer.innerHTML=""
               
                for(i=0;i<allservers.length;i++){
                    if(allservers[i].name_server.includes(filterword)){

                       
                        const div_server=document.createElement('div')
                        const img_server=document.createElement('img')
                        const p_server=document.createElement('p')
                        
                        div_server.className="server_searched"
                        img_server.src=allservers[i].icon
                        p_server.textContent=allservers[i].name_server
                        const id_server=allservers[i].server_id
                        const name_server=allservers[i].name_server
                        div_server.addEventListener("click", function(){
                            openModalAddUser(name_server, id_server)
                        });
                        div_server.appendChild(img_server)
                        div_server.appendChild(p_server)
                        
                        refsearchcontainer.appendChild(div_server)
                    }
                }
            })
        

            const refbuttonsearch=document.getElementById("search-servers")
            refbuttonsearch.addEventListener('click', changeToSearch)
            function changeToSearch(){

                const refchannelscontainer=document.getElementById("channels-container")
                const refsearchcontainer=document.getElementById("search-container")
                const refmessagescontainer=document.getElementById("container-messages")
                const refinputcontainer=document.getElementById("container-search")

                refchannelscontainer.style.display="none"
                refsearchcontainer.style.display="flex"
                refmessagescontainer.style.display="none"
                refinputcontainer.style.display="flex"
            }


            const refbuttonserver=document.getElementById("see-servers")
            refbuttonserver.addEventListener('click', changeToServers)
            function changeToServers(){
                const refchannelscontainer=document.getElementById("channels-container")
                const refsearchcontainer=document.getElementById("search-container")
                const refmessagescontainer=document.getElementById("container-messages")
                const refinputcontainer=document.getElementById("container-search")

                refchannelscontainer.style.display="flex"
                refsearchcontainer.style.display="none"
                refmessagescontainer.style.display="flex"
                refinputcontainer.style.display="none"


            }
            /* <div class="server_searched">
                    <img src="../image/Logo.png"/>
                    <p>Hola</p>
                </div>
         */
        
        /* <div class="message">
                        <img class="avatar" src="../image/Logo.png" width="50" height="50" alt="Logo Discordia">
                        <div>
                            <div class="user-date">
                                <div style="color: white; margin-right: 10px;" class="username">User</div>
                                <div >Fechas de mensaje</div>
                                <div style="position: absolute; top: 10px; right: 10px">...</div>
                            </div>
                            <div style="color: white;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
                        </div>   
                    </div> */

            /* <div class="content">
                            <div class="contents2">
                                <div>
                                    <p class="channel-p">General</p>
                                </div>
                            </div>
                        </div> */
            /* <div class="logo-app">
                        <img src="../image/Logo.png" width="50" height="50" alt="Logo Discordia"> 
                        <div class="resaltador"></div>
                        <div class="home">Inicio</div>
                    </div>
                    <div class="line"></div> */