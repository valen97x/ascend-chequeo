"use strict";

document.addEventListener("DOMContentLoaded", () => {

   const form = document.getElementById("form-perfil-jugador");
   const accionesEdicion = document.getElementById("perfil-acciones-edicion");
   const btnEditar = document.getElementById("btn-editar-perfil");
   const grupoGuardarCancelar = document.getElementById("grupo-guardar-cancelar");
   const btnGuardar = document.getElementById("btn-guardar-perfil");
   const btnCancelar = document.getElementById("btn-cancelar-edicion");

   const btnCambiarAvatar = document.getElementById("btn-cambiar-avatar");
   const inputAvatar = document.getElementById("input-avatar");
   const imgAvatar = document.getElementById("perfil-avatar-img");

   const btnCambiarBanner = document.getElementById("btn-cambiar-banner");
   const inputBanner = document.getElementById("input-banner");
   const bannerImg = document.getElementById("perfil-banner-img");

   // Campos de texto libre (contenteditable) -> se sincronizan a un input oculto antes de enviar
   const camposContenteditable = [
      { vistaId: "perfil-nombre", inputId: "input-nombre-completo" },
      { vistaId: "perfil-sobre-mi", inputId: "input-bio" },
      { vistaId: "perfil-email", inputId: "input-email" }
   ];

   // Campos que ya son inputs reales (date, texto) -> solo se muestran/ocultan
   const idsInputsReales = ["perfil-ciudad", "perfil-pais", "perfil-fecha-nacimiento"];
   // Sus "vistas" de solo lectura equivalentes, que se ocultan en modo edicion
   const idsVistasSoloLectura = ["perfil-ubicacion-vista", "perfil-edad-vista"];

   // Si no existe el boton de editar, es un perfil ajeno (solo lectura) -> no hacemos nada mas
   if (!accionesEdicion || !btnEditar) {
      return;
   }

   accionesEdicion.classList.remove("oculto");

   function activarModoEdicion() {
      camposContenteditable.forEach(({ vistaId }) => {
         const el = document.getElementById(vistaId);
         if (el) {
            el.setAttribute("contenteditable", "true");
            el.classList.add("campo-en-edicion");
         }
      });

      idsInputsReales.forEach((id) => {
         const el = document.getElementById(id);
         if (el) el.classList.remove("oculto");
      });

      idsVistasSoloLectura.forEach((id) => {
         const el = document.getElementById(id);
         if (el) el.classList.add("oculto");
      });

      btnCambiarAvatar.classList.remove("oculto");
      btnCambiarBanner.classList.remove("oculto");
      btnEditar.classList.add("oculto");
      grupoGuardarCancelar.classList.remove("oculto");
   }

   function leerImagenComoURL(input, callback) {
      if (!input.files || !input.files[0]) return;
      const lector = new FileReader();
      lector.onload = () => callback(lector.result);
      lector.readAsDataURL(input.files[0]);
   }

   btnEditar.addEventListener("click", activarModoEdicion);

   inputAvatar.addEventListener("change", () => {
      leerImagenComoURL(inputAvatar, (url) => {
         imgAvatar.src = url;
      });
   });

   inputBanner.addEventListener("change", () => {
      leerImagenComoURL(inputBanner, (url) => {
         bannerImg.src = url;
      });
   });

   // Al guardar: copiamos el texto de cada contenteditable a su input oculto
   // y recien ahi enviamos el formulario de verdad al backend (PHP)
   btnGuardar.addEventListener("click", () => {
      camposContenteditable.forEach(({ vistaId, inputId }) => {
         const vista = document.getElementById(vistaId);
         const input = document.getElementById(inputId);
         if (vista && input) {
            input.value = vista.textContent.trim();
         }
      });

      form.submit();
   });

   btnCancelar.addEventListener("click", () => {
      window.location.reload();
   });

});
