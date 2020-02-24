import $ from 'jquery';
import api from './api';
import './index.css';
import store from './store';
import bookmarks from './bookmarks';

const main = function () {
    api.getBookmarks()
        .then((bookmarks) => {
            bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
            bookmarks.render();
        });
    bookmarks.bindEventListeners();
    bookmarks.render();

};

$(main);
