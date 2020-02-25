"use strict";
//initial view
const store = {
  bookmarks: [{ title: "test", url: "https://www.thinkful.com", rating: 5 }],
  //this should be empty
  adding: false,
  error: null,
  filter: 0
};
//given by instructor ^^

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function(bookmark) {
  console.log(this.bookmarks);
  this.bookmarks.push(bookmark);
};

function findAndUpdate(id, newData) {
  const newBookmark = this.bookmarks.find(bookmark => bookmark.id === id);
  Object.assign(newBookmark, newData);
}
const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(
    currentBookmark => currentBookmark.id !== id
  );
};

//expanded bookmark view

//add bookmark form html

//form error
//insert error function

function setErrorMessage(error) {
  this.errorMessage = error;
}

//add here from notes
//const store should be empty

export default {
  store,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  setErrorMessage
};
