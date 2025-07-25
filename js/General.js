const APIADMIN_URL = 'https://retoolapi.dev/EWVZu8/tbAdministradores';

const btn_Profile = document.getElementById("btnPerson");
const btn_Menu = document.getElementById("btnMenu");
const dialog_profile = document.getElementById("Profile-content");
const body = document.getElementById("Body");
const btnActive = document.getElementsByClassName("Active-Btn");
const btnUnactive = document.getElementsByClassName("Unactive-Btn");
const NavOptions = document.getElementById("Navbar_Options");

const Alert_Error_Profile = document.getElementById('Alert_Error_Profile');

async function CargarProfile(id) {
    try{
        const res = await fetch(`${APIADMIN_URL}/${id}`);
        const data = await res.json();
        RellenarProfile(data);
    } catch(err){
        console.error('Error al cargar datos' , err);
        dialog_profile.innerHTML += `
            <h1>Error al cargar los datos</h1>
            <button class="Btn-Close" id="Btn-close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
        `;
        Alert_Error_Profile.hidden = false;
        const btn_DialogClose = document.getElementById("Btn-close");

        btn_DialogClose.addEventListener('click', () => {
        body.style.filter = "blur(0px)";
        dialog_profile.close();
        });
        setTimeout(() => {
            Alert_Error_Profile.hidden = true;
        }, 3000)
    }
}
function RellenarProfile(Profile){
    
    let Proyecto_Asignado;
    if(Profile.Proyecto_Asignado){
        Proyecto_Asignado = Profile.Proyecto_Asignado;
    }else{
        Proyecto_Asignado = 'No hay Proyecto Asignado';
    }

    btn_Profile.title = `Perfil de ${Profile.Nombre_Administrador} ${Profile.Apellido_Administrador}`;

    dialog_profile.innerHTML = '';
    dialog_profile.innerHTML += `
       <main>
             <article>
                <header class="Div-info">
                    <p>Nombre:</p>
                    <h1>${Profile.Nombre_Administrador} ${Profile.Apellido_Administrador}</h1>
                </header>
                <div class="Div-info">
                    <p>Proyecto Asignado:</p>
                    <h3>${Proyecto_Asignado}</h3>
                </div>
                <div class="Div-info">
                    <p>Correo Institucional:</p>
                    <h3>${Profile.Correo_Electronico}</h3>
                </div>
                <div class="Div-info">
                    <p>Contraseña:</p>
                    <h3>${Profile.Contrasenia}</h3>
                </div>
            </article>
            <article class="Article2">
                <div class="Div-image-dialog">
                    <img src="${Profile.Foto_Perfil}" alt="" class="Profile-image">
                    <div class="Div-rol">
                        <p>Rol:</p>
                        <h3>Administrador</h3>
                    </div>
                </div>
                <button onClick="Logout()">Cerrar Sesion</button>
            </article>
            <button class="Btn-Close" id="Btn-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
        </main>
    `;

    const btn_DialogClose = document.getElementById("Btn-close");
    
    btn_DialogClose.addEventListener('click', () => {
    body.style.filter = "blur(0px)";
    dialog_profile.close();
});
}
btn_Profile.addEventListener('click', () => {
    body.style.filter = "blur(6px)";
    dialog_profile.showModal();  
})
dialog_profile.addEventListener('cancel', (e) => {
    body.style.filter = "blur(0px)";
    dialog_profile.close();
});
function ocultarBotones(botones) {
    for (let i = 0; i < botones.length; i++) {
        botones[i].hidden = true;
    }
}
function mostrarBotones(botones) {
    for (let i = 0; i < botones.length; i++) {
        botones[i].hidden = false;
    }
}
function Guardar_Admin() {
    const idAdmin = localStorage.getItem("id_admin");
    
    if (idAdmin) {
        CargarProfile(idAdmin);
    } else {
        window.location.href = "Index.html";
    }
}
function Logout() {
    localStorage.removeItem("id_admin");
    window.location.href = "Index.html";
}
function VisibilidadBotones(){
        if(window.innerWidth <= 980){
        ocultarBotones(btnActive);
        ocultarBotones(btnUnactive);
        btn_Menu.hidden = false;
        NavOptions.hidden = true

    }else{
        mostrarBotones(btnActive);
        mostrarBotones(btnUnactive);
        btn_Menu.hidden = true;
        NavOptions.hidden = false;
    }
}
function CargaInicialGeneral(){
    Guardar_Admin();
    VisibilidadBotones();
    Alert_Error_Profile.hidden = true;
}

window.addEventListener("DOMContentLoaded", CargaInicialGeneral);
window.addEventListener("resize", VisibilidadBotones);