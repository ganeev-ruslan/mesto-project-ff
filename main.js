(()=>{"use strict";var e={url:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"af6e5107-9f53-409b-89ed-6a4a2874b113","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e){e.target.classList.contains("popup")&&c(e.target)}function r(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("click",n)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),document.removeEventListener("click",n)}function u(n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__like-button"),l=c.querySelector(".card__delete-button");return u.src=n.link,u.alt=n.name,c.querySelector(".card__title").textContent=n.name,l.addEventListener("click",(function(){return o=c,void(r=n._id,fetch("".concat(e.url,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){o.remove(),console.log("Карточка успешно удалена:",e)})).catch((function(e){console.log("Произошла ошибка при удалении карточки:",e)}));var r,o})),i.addEventListener("click",(function(){return r=i,o=n._id,u=c,void(r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(e){r.classList.remove("card__like-button_is-active"),a(u,e)})).catch((function(e){console.log("Произошла ошибка при добавлении лайка:",e)})):function(n){return fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(e){r.classList.add("card__like-button_is-active"),a(u,e)})).catch((function(e){console.log("Произошла ошибка при добавлении лайка:",e)})));var r,o,u})),u.addEventListener("click",(function(){return o(n)})),n.likes.some((function(e){return e._id===r}))&&i.classList.add("card__like-button_is-active"),a(c,n),c}function a(e,t){var n=e.querySelector(".count");n&&(n.textContent=t.likes.length)}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},l=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__error_visible"),n.classList.remove("popup__input_type_error"),n.textContent=""},s=function(e,t){e.some((function(e){return!e.validity.valid}))?(t.disabled=!0,t.classList.add("popup__button_disabled")):(t.disabled=!1,t.classList.remove("popup__button_disabled"))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){l(e,t)})),s(n,r)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f,_=document.querySelector(".places__list"),v=document.querySelector(".popup__caption"),m=document.querySelector(".popup__image"),y=document.querySelectorAll(".popup"),h=document.querySelector(".popup_type_image"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__add-button"),L=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),k=document.querySelector(".profile__image"),C=document.querySelectorAll(".popup__close"),A=S.querySelector(".popup__input_type_card-name"),x=b.querySelector(".popup__input_type_name"),w=h.querySelector(".popup__input_type_url"),j=b.querySelector(".popup__input_type_description"),O=document.querySelector(".popup_new_avatar"),T=O.querySelector(".popup__edit_new-avatar");Promise.all([fetch("".concat(e.url,"/cards"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.url,"/users/me"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];f=c._id,o.forEach((function(e){var t=u(e,I,f);_.append(t)})),k.style.backgroundImage="url(".concat(c.avatar,")"),L.textContent=c.name,g.textContent=c.about})).catch((function(e){console.log("Произошла ошибка при загрузке данных:",e)})),C.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){c(t)}))})),y.forEach((function(e){e.addEventListener("mousedown",n)})),k.addEventListener("click",(function(){T.value="",d(O,i),o(O)})),E.addEventListener("click",(function(){x.value="",w.value="",d(S,i),o(S)})),q.addEventListener("click",(function(){x.value=L.textContent,j.value=g.textContent,d(b,i),o(b)})),O.addEventListener("submit",(function(n){n.preventDefault();var r,o=T.value;D(O,!0),(r={avatar:o},fetch("".concat(e.url,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))).then((function(e){k.style.backgroundImage="url(".concat(e.avatar,")"),c(O)})).catch((function(e){console.error("При обновлении автара произошла ошибка:",e)})).finally((function(){D(O,!1)}))})),b.addEventListener("submit",(function(n){n.preventDefault();var r={name:x.value,about:j.value};D(b,!0),function(n){return fetch("".concat(e.url,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)}).then((function(e){return t(e)}))}(r).then((function(e){L.textContent=e.name,g.textContent=e.about,c(b)})).catch((function(e){console.error(e)})).finally((function(){D(b,!1)}))})),S.addEventListener("submit",(function(n){n.preventDefault();var r,o={name:A.value,link:w.value};D(S,!0),(r=o,fetch("".concat(e.url,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))).then((function(e){var t=u(e,I,f);_.prepend(t),c(S)})).catch((function(e){console.error(e)})).finally((function(){D(S,!1)}))}));var P,D=function(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить..."};function I(e){m.src=e.link,m.alt=e.name,v.textContent=e.name,o(h)}P=i,Array.from(document.querySelectorAll(P.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r),n.forEach((function(t){t.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMesage):t.setCustomValidity(""),t.validity.valid?l(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__error_visible"),r.textContent=n,r.classList.add("popup__input_type_error")}(e,t,t.validationMessage)}(e,t),s(n,r)}))}))}(e,P)}))})();