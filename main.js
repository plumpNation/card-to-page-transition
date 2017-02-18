(function () {
    'use strict';

    const
        serviceAPI = 'https://randomuser.me/api/?results=20',
        gettingUsers = getUsers();

    let users;

    document.addEventListener('DOMContentLoaded', init);

    function buildUserList(response) {
        const
            usersMarkup = response.results.map(toThumbnailMarkup).join(''),
            thumbnails = document.querySelector('.user-thumbnails');

        users = response.results;

        thumbnails.insertAdjacentHTML('beforeend', usersMarkup);
        thumbnails.addEventListener('click', onClickThumbnail, false);
    }

    function onClickThumbnail(event) {
        const
            clicked = event.target,
            userIndex = clicked.dataset.index;

        if (clicked.tagName !== 'IMG') {
            return;
        }

        console.log(users[userIndex]);
    }

    function toThumbnailMarkup(user, index) {
        return `
        <li class="user-thumbnail">
            <dl>
                <dt>Name</dt>
                <dd>${user.name.first} ${user.name.last}</dd>
            </dl>
            <img src="${user.picture.medium}" data-index="${index}">
        </li>
        `;
    }

    function getUsers() {
        return fetch(serviceAPI)
            .then(response => response.json())
    }

    function init() {
        gettingUsers.then(buildUserList);
    }
}());
