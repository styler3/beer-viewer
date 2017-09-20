var API_URL = '/api/';

var categories = [];
var beers = [];

function buildCategoriesMenu() {
  for (i in categories) {
    var cat = categories[i];

    var label = $("<label>", {
      for: "cat" + cat["id"]
    }).text(cat["name"]);

    var checkbox = $("<input>", {
      type: "checkbox",
      id: "cat" + cat["id"],
      value: cat["id"],
      class: "category",
      click: updateBeers
    })

    $("#category").append(checkbox);
    $("#category").append(label);
  }
}

function getCategories() {
  $.get(API_URL + 'categories', function(result) {
    categories = result['data'];
    buildCategoriesMenu();
  })
}

function updateBeers() {
  console.log("Updating Beers");
}

getCategories();
$(document).ready(buildCategoriesMenu);
