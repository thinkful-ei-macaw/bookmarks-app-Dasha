import STORE from "./store.js";
const store = STORE.store;

/********** TEMPLATE GENERATION FUNCTIONS **********/
//i has a confusion

// These functions return HTML

function generateInitialViewHtml() {
  return `
  <div class="start-screen">
    <p>bookmarks added here
    </p>
    <section class="row">
        <div class="controls">
          <button id="js-new-bookmark">Add New</button>
          
          <select
            class="filter-control"
            id="js-filter-control"
            name="filter"
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
  `;
}

function generateNewBookmarkHtml() {
  return `
  <section class="row">
      <div class="bookmark-container">
        <ul class="js-bookmarks-container"></ul>
      </div>
    </section>
    `;
  //add new form!
}

function generateExpandedView() {
  //how it looks in extended view, when someone opens it
  //how to generate expanded view? object.smth
  //or handle on click 'view' .show() this function
}
function generateErrorForm() {
  //this is an error, html goes here
  //show only when error triggered use .hide() or .show()
  //if using .hide() make sure to add to CSS display: none
}

function generateBookmarkElement(bookmark) {
  //here is the bookmarks string
  return `
  <li><a href="${bookmark.url}" target="_blank">${bookmark.title} - ${bookmark.rating}</a></li>
    `;
}

/* return `
   <form id='js-bookmarks-container'>
   <fieldset>
   <legend>New Bookmark</legend>
     <div class='col-6'>
       <label for='js-form-title'>Title</label>
       <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='title goes here'></li>

       <label for='js-form-description'>Description</label>
       <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="best website in the whole world!"></textarea>
     </div>
     <div class='col-6'>
       <label for='js-form-url'>URL</label>
       <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='https://...'></li>

       <label for='js-form-rating' id='rating-label'>Rating: </label>
       <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
         <option value='5' selected>5</option>
         <option value='4'>4</option>
         <option value='3'>3</option>
         <option value='2'>2</option>
         <option value='1'>1</option>
       </select>
     </div>
     <div class='add-btn-container col-12'>
       <button type='submit' id='js-add-bookmark' class='add-button'>ADD BOOKMARK</button>
       <button type='button' id='js-cancel-bookmark'>CANCEL</button>
     </div>
     </fieldset>
   </form>
   `;
}
*/

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

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag
//based on the state of the store

const generateBookmarksString = function(bookmarks) {
  bookmarks = bookmarks.map(bookmark => generateBookmarkElement(bookmark));
  return bookmarks.join("");
};

const render = function() {
  //renderError();
  // Filter item list by bookmark ratings:
  //bookmarks = store.bookmarks.filter(b=>b.rating===store.filter)
  let bookmarks = [...store.bookmarks];

  //this is wrong below, do i need it?
  //if (store.hideCheckedItems) {
  //bookmarks = bookmarks.filter(bookmark => !bookmark.checked);
  //}

  // render the shopping list in the DOM
  const bookmarksString = generateBookmarksString(bookmarks);

  // insert that HTML into the DOM
  $(".js-bookmarks-container").html(bookmarksString);
};

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
//get all bookmarks from store object
function handleNewBookmarkClicked() {
  $("#js-new-bookmark").on("click", () => {
    Store.setAddingBookmarkStatus(true);
    Store.setUpdatingBookmarkStatus(false);
    render();
  });
}

// Handler for add bookmark

function handleAddBookmarkClicked() {
  $("#js-form-container").on("submit", "#js-new-item-form", event => {
    event.preventDefault();
    // Serialize the JSON and parse it into an object
    const serializedJSON = JSON.parse($(event.target).serializeJSON());
    const newBookmarkObject = constructBookmarkObject(serializedJSON);

    API.createNewBookmark(
      newBookmarkObject,
      newBookmark => {
        Store.addBookmark(newBookmark);

        Store.setAddingBookmarkStatus(false);
        // Render
        render();
      },
      error => errorCallback(error)
    );
  });
}

//generate rating handler
function handleFilterRatingsDropdown() {}

//add item to bookmark list
function addItemToBookmarkList(
  bookmarkName,
  rating,
  urlName,
  descriptionDetails
) {
  store.bookmarks.push({
    id: cuid(),
    title: bookmarkName,
    rating: ratingNum,
    url: urlName,
    description: descriptionDetails,
    expanded: false
  });
}
//listen for click and update the store
function handleAddNewItemBtn() {
  $(".newBtn").on("click", function() {
    store.adding = true;
    render();
  });
}

/******* Main App Start ******/
function handleBookmarkList() {
  render();
  //call event listeners here
  handleAddNewItemBtn();
}

/***** Event listener handlers *****/
// Handle binding all event listeners
function bindEventListeners() {
  handleNewBookmarkClicked();
  handleAddBookmarkClicked();
  //handleDeleteBookmarkClicked();
  handleFilterRatingsDropdown();
  //handleToggleExpandedBookmarkView();
  //handleEditBookmarkClicked();
  //handleCancelButton();
}

export default {
  render,
  handleBookmarkList,
  bindEventListeners
};
