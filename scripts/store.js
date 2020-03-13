"use strict";
const store = {
  bookmarks: [
    {
      title: "Thinkful",
      url: "https://www.thinkful.com",
      desc: "coding bootcamp",
      rating: 5,
      id: "1"
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com",
      desc: "ouroboros of desperation",
      rating: 1,
      id: "2"
    },
    {
      title: "Google",
      url: "https://www.google.com",
      desc: "find any website here",
      rating: 3,
      id: "3"
    }
  ],
  //this should be empty
  adding: false,
  error: null,
  filter: 0
};

const findById = function(id) {
  return store.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function(bookmark) {
  return store.bookmarks.push(bookmark);
};

function setFilter(rating) {
  store.filter = rating;
}

function toggleBookmarkExpanded(bookmarkID) {
  const bookmarkToToggle = store.bookmarks.find(
    bookmark => bookmark.id === bookmarkID
  );
  bookmarkToToggle.expanded = !bookmarkToToggle.expanded;
}

function setAddingBookmarkStatus(bool) {
  this.addingBookmark = bool;
}

function setError(error) {
  this.error = error;
}

function findAndUpdate(id, newData) {
  const newBookmark = this.bookmarks.find(bookmark => bookmark.id === id);
  Object.assign(newBookmark, newData);
}

const findAndDelete = function(id) {
  return (store.bookmarks = store.bookmarks.filter(
    currentBookmark => currentBookmark.id !== id
  ));
};

function setErrorMessage(error) {
  this.errorMessage = error;
}
export default {
  store,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  setErrorMessage,
  setError,
  setFilter,
  setAddingBookmarkStatus,
  toggleBookmarkExpanded
};
