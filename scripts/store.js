"use strict";
//initial view
const store = {
  bookmarks: [
    {
      title: "Thinkful",
      url: "https://www.thinkful.com",
      desc: "coding bootcamp",
      rating: 5
    },
    {
      title: "Instagram",
      url: "https://wwww.instagram.com",
      desc: "ouroboros of desperation",
      rating: 1
    },
    {
      title: "Google",
      url: "https://wwww.google.com",
      desc: "find any website here",
      rating: 3
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
  //console.log(this.bookmarks);
  //param addNewBookmark??
  this.store.bookmarks.push(bookmark);
};

function filterBookmarksByRating(rating) {
  setRatingFilter(rating);
  this.bookmarks = filterStoreBookmarksArray();
}

function toggleBookmarkExpanded(bookmarkID) {
  const bookmarkToToggle = this.bookmarks.find(
    bookmark => bookmark.id === bookmarkID
  );
  bookmarkToToggle.expanded = !bookmarkToToggle.expanded;
  //bookmark.expanded=false;
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
  //findAndUpdate(id, { expanded: true })
  //expanded: false to go back
}

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
  setError,
  filterBookmarksByRating,
  setAddingBookmarkStatus,
  toggleBookmarkExpanded
};
