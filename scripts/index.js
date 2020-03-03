import bookmarks from "./bookmarks.js";
import api from "./api.js";
import store from "./store.js";

const main = function() {
  bookmarks.bindEventListeners();

  api.getBookmarks().then(bookmarkList => {
    console.log(bookmarkList);
    bookmarkList.forEach(bookmark => store.addBookmark(bookmark));
    bookmarks.render();
  });
};

$(main);
