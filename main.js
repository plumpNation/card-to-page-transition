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
            thumbnails = document.querySelector('.user-cards');

        users = response.results;

        thumbnails.insertAdjacentHTML('beforeend', usersMarkup);
        thumbnails.addEventListener('click', onClickThumbnail, false);
    }

    function onClickThumbnail(event) {
        const
            clicked = event.target,
            userIndex = clicked.parentElement.dataset.index;

        if (clicked.tagName !== 'IMG') {
            return;
        }

        [].forEach.call(
            document.querySelectorAll('.user-card.clone'),
            node => document.body.removeChild(node)
        );

        selectUserByIndex(userIndex);
    }

    function selectUserByIndex(userIndex) {
        const
            userCard = getUserCardByIndex(userIndex),
            clone    = createAbsoluteClone(userCard);

        document.body.appendChild(clone);
    }

    function createAbsoluteClone(node) {
        const
            coords = getPosition(node),
            clone  = node.cloneNode(true);

        clone.style.top      = coords.y + 'px';
        clone.style.left     = coords.x + 'px';

        clone.classList.add('clone');

        return clone;
    }

    function getUserCardByIndex(userIndex) {
        return document.querySelector(`.user-card[data-index="${userIndex}"]`);
    }

    function removePage(e) {
        e.currentTarget.remove();
    }

    function toThumbnailMarkup(user, index) {
        return `
        <li>
            <div class="user-card" data-index="${index}">
                <ul>
                    <li>${user.name.first} ${user.name.last}</li>
                </ul>
                <img src="${user.picture.large}">
            </div>
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

    function getPosition(el) {
        let xPos = 0,
            yPos = 0;

        while (el) {
            if (el.tagName == 'BODY') {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);

            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }

        return {
            'x': xPos,
            'y': yPos
        };
    }
}());
