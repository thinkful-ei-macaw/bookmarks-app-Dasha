import STORE from "./store.js";
import api from "./api.js";
const store = STORE.store;

//template generator functions
//i has a confusion

// These functions return HTML

function generateInitialViewHtml() {
  return `
  <h1>My Bookmarks</h1>
       <section class="row">
            <div class="controls">
                <button id="js-new-bookmark">Add New</button>

                <select class="filter-control" id="js-filter-control" name="filter"
                    aria-label="Filter ratings by minimum rating">
                    <option value="0">All</option>
                    <option value="5">5 stars</option>
                    <option value="4">4+ stars</option>
                    <option value="3">3+ stars</option>
                    <option value="2">2+ stars</option>
                    <option value="2">1+ stars</option>
                </select>
                <label for="filter-control" id="filter-label">Filter </label>

            </div>
        </section>
        
      <div id='js-form-container' class='form-container'>
      <form>
      <fieldset>
      <legend></legend>
      <h2>${store.bookmarks.title}</h2>
      <div class="description">${store.bookmarks.desc}
      <a href="${store.bookmarks.url}"target="_blank">${store.bookmarks.title} - ${store.bookmarks.rating}</a>
      </div>
      <button id="expand">See More</button>
      <button id="delete">Delete</button>
      </div>
      
      
</fieldset>
</form>
      </div>
         
  `;
}

/*<h2>Another Placeholder Title</h2>
      <div class="description">Description goes here
      <button id="expand">See More</button>
      <button id="delete">Delete</button>
      </div>
      <h2>Yet Another Placeholder Title</h2>
      <div class="description">Description goes here
      <button id="expand">See More</button>
      <button id="delete">Delete</button>
      </div>
      */
/*${generateBookmarksString(
          store.bookmarks.bookmarks,
          store.bookmarks.filter
        )}
        or is it ${generateBookmarkElement()}
*/
function generateNewBookmarkHtml() {
  return `
  <section class="row">
      <div class="bookmark-container">
        <ul class="js-bookmarks-container"></ul>
      </div>
    </section>
    
  <form id="js-new-bookmark-form">
    <fieldset>
      <legend>New Bookmark</legend>
      <div class="col-6">
        <label for="js-form-title">Title</label>
        <li class="new-item-li">
          <input
            type="text"
            id="js-form-title"
            name="title"
            placeholder="title goes here" required
          />
        </li>

        <label for="js-form-description">Description</label>
        <li class="new-item-li">
          <textarea
            id="js-form-description"
            name="description"
            placeholder="this is the best site ever!"></textarea>
        </li>
      </div>

      <div class="col-6">
        <label for="js-form-url">URL</label>
        <li class="new-item-li">
          <input
            type="url"
            id="js-form-url"
            name="url"
            placeholder="https://..." required/>
        </li>

        <label for="js-form-rating" id="rating-label">
          Rating:1-5
        </label>
        <select
          id="js-form-rating"
          name="rating"
          aria-labelledby="rating-label"
        >
          <option value="5" selected>
            5
          </option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <div class="add-btn-container col-12">
        <button type="submit" id="js-add-bookmark" class="add-button">
          ADD BOOKMARK
        </button>
        <button type="button" id="js-cancel-bookmark">
          CANCEL
        </button>
      </div>
    </fieldset>
  </form>
  ;`;
}
//<button class='close-form' type='button'>Close</button>

function generateExpandedView() {
  //how it looks in extended view, when someone opens it
  //how to generate expanded view? object.smth
  //or handle on click 'view' .show() this function
  return `
  <div class="container">
              <h2>My Bookmarks</h2>
              <form id="js-expanded-view">
              <li><a href="${bookmark.url}"target="_blank">${bookmark.title} - ${bookmark.rating}</a></li>
              `;
}

function generateErrorForm() {
  //this is an error, html goes here
  //show only when error triggered use .hide() or .show()
  //if using .hide() make sure to add to CSS display: none
  //if store.error generate the form and add this html
  return `<section class="error-container">
    <span id="js-error-message"> </span>

    <form id="js-error-form">
      <div class="error-container">We has failure!</div>
      
      <button type="return-home">Return Home</button>
    </form>
  </section>
  ;`;
}
//how do i add user imports into here
//this would need to go into the bottom of the initial view, user generated bookmarks but how??? helpe
function generateBookmarkElement(bookmark) {
  //here is the bookmarks string
  let bookmarkTitle = `<span class="#js-new-bookmark-form Title">${bookmark.name}</span>`;
  //if bookmark.expanded=true, then call the 'expanded' function, return
  //let bookmarkRating = store.bookmarks.filter(b => b.rating === store.filter);
  if (bookmark.expanded === true) {
    return generateExpandedView();
  } else
    return `
    <li class="home-container" data-bookmark-id="${item.id}">
  ${bookmarkTitle}
              <div class="shopping-item-controls">
              <li class="js-bookmark-element" data-item-id="${item.id}">
      
 
        
    
`;
}
//check if bookmark.expanded=true
//if false=

//send using fetch call but the data is generated in an object while using a form
//form needs to go into addnew function

//render everything as well?

function generateUpdateBookmarkForm() {
  return `
      <form id='js-edit-form'>
      <fieldset>
      <legend>Update Bookmark</legend>
        <div class='col-6'>
          <label for='js-form-title'>Title</label>
          <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='Amazing programming article'></li>

         
          <label for='js-form-description'>Description</label>
          <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="I can't believe its not PHP!"></textarea>
        </div>
        <div class='col-6'>
          <label for='js-form-url'>URL</label>
          <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='https://...'></li>

          <label for='js-form-rating' id='rating-label'>Rating: </label>
          <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
        </div>
        <div class='add-btn-container col-12'>
          <button type='submit' id='js-update-bookmark' class='add-button'>UPDATE BOOKMARK</button>
          <button type='button' id='js-cancel-bookmark'>CANCEL</button>
        </div>
        </fieldset>
      </form>
      `;
}

//render functions

// This function conditionally replaces the contents of the <main> tag
//based on the state of the store

/*if (bookmark.expanded) return generateBookmarkExpanded(bookmark);
 */

const generateBookmarksString = function(bookmarks) {
  bookmarks = bookmarks.map(bookmark => generateBookmarkElement(bookmark));

  return bookmarks.join("");
};

function render() {
  if (store.adding === false) {
    //console.log("logging");
    $("main").html(generateInitialViewHtml());
  } else {
    $("main").html(bookmarksList());
  }
  // Filter item list by bookmark ratings:
  //let bookmarks = store.bookmarks.filter(b => b.rating === store.filter);
  /*
  let bookmarks = [...store.bookmarks];
  if (store.bookmarks.filter) {
    bookmarks = bookmarks.filter(b => b.rating === store.filter);
  }

  // render the shopping list in the DOM
  const bookmarksString = generateBookmarksString(bookmarks);

  // insert that HTML into the DOM
  $(".js-new-bookmark").html(bookmarksString);
  */
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $(".error-container").html(generateErrorForm);
  } else {
    $(".error-container").empty();
  }
}
/*
how to filter things: 
let bookmarks = [{ title: "test", url: "https://www.thinkful.com", rating: 5 }];

filteredBookmarks = bookmarks.filter(b=>b.rating===4);

console.log(filteredBookmarks);*/

const getBookmarkIdFromElement = function(bookmark) {
  return $(bookmark)
    .closest(".home-container")
    .data("bookmark-id");
};
/*const generateError = function(message) {
  return `
      <section class='error-content'> 
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
  `;
};
*/

//event handlerssss

// These functions handle events (submit, click, etc)
//get all bookmarks from store object
function handleNewBookmarkClicked() {
  $("main").on("click", "#js-new-bookmark", event => {
    event.preventDefault();
    console.log("newbutton");

    $("main").html(generateNewBookmarkHtml);
  });
}
/*
//handler for expand view
//findandUpdate to change to true
function handleSeeMoreClicked() {
  $("main").on("click", "#expand", event => {
    event.preventDefault();
    // Sets expanded status on the target by ID
    $("main").html(generateExpandedView);
    render();
  });
}
*/

//go back from expand view to initial view
//if expand=true, show expandHtml

function handleDeleteBookmarkClicked() {
  $("main").on("click", ".delete", event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    api
      .deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch(err => {
        store.setError(err.message);
        renderError();
      });
  });
}

// Handler for submit button

function handleSubmitBookmarkClicked() {
  $("main").on("submit", "#js-new-bookmark-form", event => {
    event.preventDefault();
    console.log("helllooooo");
    const newBookmarkName = $("#js-form-title").val();
    $("#js-form-title").val("");
    const newBookmarkUrl = $("#js-form-url").val();
    $("#js-form-url").val("");
    const newBookmarkDesc = $("#js-form-description").val();
    $("#js-form-description").val("");
    const newBookmarkRating = $("#js-form-rating").val();
    $("#js-form-rating").val("");
    api
      .createBookmark(
        newBookmarkName,
        newBookmarkUrl,
        newBookmarkDesc,
        newBookmarkRating
      )
      .then(() => {
        store.addBookmark(
          newBookmarkName,
          newBookmarkUrl,
          newBookmarkDesc,
          newBookmarkRating
        );
        render();
      })
      .catch(error => {
        console.log(store);
        store.setError(error.message);
        renderError();
      });
  });
}

//replace below with if store.expanded=false, return initialviewHtml

function handleCancelButton() {
  $("main").on("click", "#js-cancel-bookmark", event => {
    event.preventDefault();
    console.log("cancel button");

    //$("generateNewBookmarkHtml").hide();
    $("main").html(generateInitialViewHtml);
  });
}

//generate rating handler
function handleFilterRatingsDropdown() {}

// Handle binding all event listeners
function bindEventListeners() {
  handleNewBookmarkClicked();
  handleSubmitBookmarkClicked();
  handleDeleteBookmarkClicked();
  handleFilterRatingsDropdown();
  handleCancelButton();
  //handleToggleExpandedBookmarkView();
  //handleEditBookmarkClicked();
}

export default {
  render,
  bindEventListeners
};
