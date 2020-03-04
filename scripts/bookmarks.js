import store from "./store.js";
import api from "./api.js";

function renderMain() {
  return `
    <h1>My Bookmarks</h1>
    <button class="add-bookmark">Add Bookmark</button>
    ${renderList()}
    <button class="add-bookmark">Add Bookmark</button>
    <div>
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
  `;
}

function generateNewBookmarkHtml() {
  return `
  <section class="row">
      <div class="bookmark-container">
        <ul class="js-bookmarks-container"></ul>
      </div>
    </section>
    
  <form id="js-new-bookmark-form">
    <fieldset>
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

const generateError = function(message) {
  return `
      <section class="error-container">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

function renderList() {
  let html = `<ul>`;
  store.store.bookmarks.forEach(b => (html += renderBookmark(b)));
  html += `</ul>`;
  return html;
}

function renderBookmark(bookmark) {
  let html = `<li class="bookmark" id="${bookmark.id}">`;
  html += `<h3>${bookmark.title}</h3>`;
  if (bookmark.expanded) {
    html += `<p>${bookmark.desc}</p>`;
    html += `<p>Rating: ${bookmark.rating}</p>`;
    html += `<a class="bookmark-url" href="${bookmark.url}" target="_blank">Click Here</a>`;
  }
  html += `</li>`;
  return html;
}

function expandBookmark() {
  $("main").on("click", ".bookmark", e => {
    const id = $(e.currentTarget).attr("id");
    store.toggleBookmarkExpanded(id);
    render();
  });
}

function visitBookmark() {
  $("main").on("click", ".bookmark-url", e => {
    e.stopPropagation();
  });
}

function addNewBookmarkClick() {
  $("main").on("click", ".add-bookmark", event => {
    event.preventDefault();
    console.log("newbutton");

    $("main").html(generateNewBookmarkHtml());
  });
}

//.api goes here but where?? look up dog example
//i did everything riiight ugh whyyyy
function submitButtonClick() {
  if (store.adding === false) {
    renderMain();
  }
  if (store.adding === true) {
    $("main").on("click", ".add-bookmark", e => {
      e.preventDefault();
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
          //console.log(store);
          store.setError(error.message);
          renderError();
        });
    });
  }
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $(".error-container").html(el);
  } else {
    $(".error-container").empty();
  }
}
/*

    store.addBookmark({
      title: `Google ${store.store.bookmarks.length}`,
      url: "https://www.google.com",
      desc: "find any website here",
      rating: 3,
      id: `${store.store.bookmarks.length}`
    });
    render();
  });
}
*/

function handleCancelButton() {
  $("main").on("click", "#js-cancel-bookmark", event => {
    //event.preventDefault();
    console.log("cancel button");

    //$("generateNewBookmarkHtml").hide();
    $("main").html(renderMain);
  });
}

function filterBookmarks() {
  if (store.bookmarks) {
    filteredBookmarks = bookmarks.filter(b => b.rating === 4);
  }
}

const render = () => {
  //console.log(store.store.bookmarks);
  /*$("main").html("<h1>Rendering....</h1>");
  setTimeout(() => {
    $("main").html(renderMain());
  }, 1000);*/
  $("main").html(renderMain());
};

const bindEventListeners = () => {
  expandBookmark();
  visitBookmark();
  submitButtonClick();
  handleCancelButton();
  addNewBookmarkClick();
  generateError();
  filterBookmarks();
};

export default {
  render,
  bindEventListeners
};
