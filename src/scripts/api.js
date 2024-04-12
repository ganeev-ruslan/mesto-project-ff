const config = {
    url: "https://nomoreparties.co/v1/wff-cohort-10",
    headers: {
        authorization: "af6e5107-9f53-409b-89ed-6a4a2874b113", 
        'Content-Type': 'application/json',
    },
    
};

//проверка ответа от сервера 
function responseServer(res){
    if (res.ok){
        return res.json();
    }return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка данных пользователя с сервера 

const  takeTokenApi=()=>{
    return fetch(`${config.url}/users/me`, {
       headers: config.headers,
    }).then((res)=>responseServer(res))
}

//загрузка карточек с сервера 
function getInitialCards(){
    return fetch(`${config.url}/cards`,{
        headers:config.headers
    }).then((res)=>responseServer(res))
}

//редактирование профиля
function editingProfile(userData){
    return fetch(`${config.url}/users/me`, {
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify(userData),
    }).then((res)=>responseServer(res))
}

// Добавление новой карточки 
function addNewCardApi(addCardData){
    return fetch(`${config.url}/cards`, {
        method: "POST",
        headers: config.headers, 
        body: JSON.stringify(addCardData),
    }).then((res)=>responseServer(res))
}


//лайк карточки 
function likeCardApi(cardId){
    return fetch(`${config.url}/cards/likes/${cardId}`, {
        method: 'PUT', 
        headers: config.headers
    }).then((res)=>responseServer(res))
}

// снятие лайка с карточки 
function unlikedCard (cardId){
    return fetch(`${config.url}/cards/likes/${cardId}`, {
        method: 'DELETE', 
        headers: config.headers
    }).then((res)=>responseServer(res))
}

//удаление карточки 
function deleteCardApi(cardId){
    return fetch(`${config.url}/cards/${cardId}`, {
        method: 'DELETE', 
        headers: config.headers
    }).then((res)=>responseServer(res))
}

// обновление аватара 

function saveAvatarPicture(cardData){
    return fetch(`${config.url}/users/me/avatar`, {
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify(cardData),
    }).then((res)=>responseServer(res))
}


export {takeTokenApi, getInitialCards, editingProfile, addNewCardApi, likeCardApi, unlikedCard, deleteCardApi, saveAvatarPicture}