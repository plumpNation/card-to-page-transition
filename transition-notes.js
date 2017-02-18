// coords        = getPosition(userThumbnail),
// clone         = createAbsoluteClone(userThumbnail, coords);

// document.body.appendChild(clone);
// addUserPage(userIndex);

// function createAbsoluteClone(node, coords) {
//     const clone = node.cloneNode(true);
//
//     clone.style.position = 'absolute';
//     clone.style.top      = coords.y + 'px';
//     clone.style.left     = coords.x + 'px';
//
//     clone.classList.add('clone');
//
//     return clone;
// }

function addUserPage(userIndex) {
    document.body.insertAdjacentHTML('beforeend', createUserPageMarkup(users[userIndex]));
    document.body.querySelector('.user-page').addEventListener('click', removePage);
}

/**
 * Lifted from https://www.kirupa.com/html5/get_element_position_using_javascript.htm
 */
// function getPosition(el) {
//     let xPos = 0,
//         yPos = 0;
//
//     while (el) {
//         if (el.tagName == 'BODY') {
//             // deal with browser quirks with body/window/document and page scroll
//             var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
//             var yScroll = el.scrollTop || document.documentElement.scrollTop;
//
//             xPos += (el.offsetLeft - xScroll + el.clientLeft);
//             yPos += (el.offsetTop - yScroll + el.clientTop);
//
//         } else {
//             // for all other non-BODY elements
//             xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//             yPos += (el.offsetTop - el.scrollTop + el.clientTop);
//         }
//
//         el = el.offsetParent;
//     }
//
//     return {
//         'x': xPos,
//         'y': yPos
//     };
// }

// // deal with the page getting resized or scrolled
// window.addEventListener("scroll", updatePosition, false);
// window.addEventListener("resize", updatePosition, false);
//
// function updatePosition() {
//     // add your code to update the position when your browser
//     // is resized or scrolled
// }
