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

        [].forEach.call(
            document.querySelectorAll('.user-page'),
            node => document.body.removeChild(node)
        );

        document.body.insertAdjacentHTML('beforeend', createUserPageMarkup(users[userIndex]));
        document.body.querySelector('.user-page').addEventListener('click', removePage);
    }

    function removePage(e) {
        e.currentTarget.remove();
    }

    function toThumbnailMarkup(user, index) {
        return `
        <li class="user-thumbnail">
            <dl>
                <dt>Name</dt>
                <dd>${user.name.first} ${user.name.last}</dd>
            </dl>
            <img src="${user.picture.large}" data-index="${index}">
        </li>
        `;
    }

    function createUserPageMarkup(user) {
        return `
            <article class="user-page">
                <header><h1>${user.name.first} ${user.name.last}</h1></header>
                <img src="${user.picture.large}">
            </article>
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
