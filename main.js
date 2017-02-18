(function () {
    'use strict';

    const
        serviceAPI = 'https://randomuser.me/api/?',
        gettingUsers = getUsers(20);

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

        resetClones();

        navigateToUser(userIndex);
    }

    /**
     * Not really navigating. We'll clone the user card and make some adjustments to it.
     */
    function navigateToUser(userIndex) {
        const clone = cloneUserByIndex(userIndex);

        setTimeout(() => clone.classList.add('full'), 0);
    }

    /**
     * This function assumes that there will only be one cloned and one clone.
     */
    function resetClones() {
        const
            clone = document.querySelector('.user-card.clone'),
            cloned = document.querySelector('.cloned');

        if (clone) {
            clone.remove();
        }

        if (cloned) {
            cloned.classList.remove('cloned');
        }
    }

    function cloneUserByIndex(userIndex) {
        const
            userCard = getUserCardByIndex(userIndex),
            clone    = createAbsoluteClone(userCard);

        userCard.parentElement.classList.add('cloned');

        document.body.appendChild(clone);

        return clone;
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

    function getUsers(requiredUserCount) {
        return fetch(serviceAPI + 'results=' + requiredUserCount)
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
