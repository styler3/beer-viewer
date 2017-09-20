var API_URL = '/api/';

var categories = [];
var beers = [];
var min_abv = 4;
var max_abv = 7;
var min_ibu = 12;
var max_ibu = 22;

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

function createSliders() {
  $("#abv").slider({
    range: true,
    min: 3,
    max: 8,
    values: [min_abv, max_abv],
    slide: function(event, ui) {
      min_abv = ui.values[0];
      max_abv = ui.values[1];
      updateBeers();
    }
  });
  $("#ibu").slider({
    range: true,
    min: 11,
    max: 23,
    values: [min_ibu, max_ibu],
    slide: function(event, ui) {
      min_abv = ui.values[0];
      max_abv = ui.values[1];
      updateBeers();
    }
  });
}

getCategories();
$(document).ready(function() {
    createSliders();
    buildCategoriesMenu();
  }
);
