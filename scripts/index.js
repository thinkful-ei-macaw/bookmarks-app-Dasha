import bookmarks from "./bookmarks.js";
import api from "./api.js";
import store from "./store.js";

console.log(bookmarks);

const main = function() {
  api.getBookmarks().then(bookmarks => {
    bookmarks.forEach(bookmark => store.addBookmark(bookmark));
  });
  bookmarks.bindEventListeners();
  bookmarks.render();
};
console.log(store);
$(main);
