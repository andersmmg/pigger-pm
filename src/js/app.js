var Settings = require('settings');
var UI = require('ui');
var ajax = require('ajax');
var Feature = require('platform/feature');
var userList = [];
var itemList = [];

var usercard = new UI.Card({
  title: 'User',
  body: 'email',
  scrollable: true
});

var itemcard = new UI.Card({
  title: 'Item',
  body: 'price',
  scrollable: true
});

var menu = new UI.Menu({
  backgroundColor: 'white',
  textColor: 'black',
  highlightBackgroundColor: Feature.color('red','black'),
  highlightTextColor: 'white',
  sections: [{
    title: 'Menu',
    items: [{
      title: 'Users'
    },{
      title: 'Items'
    }]
  }]
});

var users = new UI.Menu({
  backgroundColor: 'white',
  textColor: 'black',
  highlightBackgroundColor: Feature.color('kelly-green','black'),
  highlightTextColor: 'white',
  sections: [{
    title: 'Users',
    items: [{
      title: 'Loading...'
    }]
  }]
});

var items = new UI.Menu({
  backgroundColor: 'white',
  textColor: 'black',
  highlightBackgroundColor: Feature.color('kelly-green','black'),
  highlightTextColor: 'white',
  sections: [{
    title: 'Items',
    items: [{
      title: 'Loading...'
    }]
  }]
});

menu.on('select', function(e) {
  switch(e.itemIndex) {
    case 0:
      getUsers();
      users.show();
      break;
    case 1:
      getItems();
      items.show();
      break;
  }
});

usercard.on('back', function() {
  users.show();
});

itemcard.on('back', function() {
  items.show();
});

users.on('back', function() {
  menu.show();
});

items.on('back', function() {
  menu.show();
});

users.on('select', function(e) {
  usercard.title(userList[e.itemIndex].title);
  if(userList[e.itemIndex].banned == 1) {
    usercard.subtitle("banned");
  }else{
    usercard.subtitle("active");
  }
  usercard.body("$"+userList[e.itemIndex].bal);
  usercard.show();
});

items.on('select', function(e) {
  itemcard.title(itemList[e.itemIndex].title);
  itemcard.subtitle(itemList[e.itemIndex].subtitle);
  itemcard.body(itemList[e.itemIndex].desc);
  itemcard.show();
});

menu.show();

function getUsers() {
  ajax({ url: 'http://api.ammaron.gq/pebble/users.json', type: 'json' },
    function(data) {
      users.section(0,{title: 'Users ('+data.count+')', items: data.users});
      userList = data.users;
      Settings.data('user-list', userList);
    }
  );
}
function getItems() {
  ajax({ url: 'http://api.ammaron.gq/pebble/items.json', type: 'json' },
    function(data) {
      items.section(0,{title: 'Items ('+data.count+')', items: data.items});
      itemList = data.items;
      Settings.data('item-list', itemList);
    }
  );
}