"use strict";
//initial view
const store = {
  bookmarks: [
    { title: "test", url: "https://www.thinkful.com", rating: 5 },
    {
      title: "Title 1",
      rating: 3,
      url: "http://www.title1.com",
      description: "lorem ipsum dolor sit",
      expanded: false
    },
    {
      title: "Title 2",
      rating: 5,
      url: "http://www.title2.com",
      description: "dolorum tempore deserunt",
      expanded: false
    }
  ],

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
//bookmark.expanded=false;

function setError(error) {
  this.error = error;
}

function findAndUpdate(id, newData) {
  const newBookmark = this.bookmarks.find(bookmark => bookmark.id === id);
  Object.assign(newBookmark, newData);
}
//findAndUpdate(id, { expanded: true })
//expanded: false to go back
const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(
    currentBookmark => currentBookmark.id !== id
  );
};

//expanded bookmark view
//if (bookmark.expanded) return generateBookmarkExpanded(bookmark);
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
  setErrorMessage,
  setError
};
