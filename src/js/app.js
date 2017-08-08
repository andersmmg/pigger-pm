var Settings = require('settings');
var UI = require('ui');
var ajax = require('ajax');
var Feature = require('platform/feature');
var messageList = [];
var myusername = "andersmmg";
var myid = 0;

var messagecard = new UI.Card({
  title: 'Message',
  subtitle: 'from',
  body: 'body',
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
      title: 'Messages'
    }]
  }]
});

var messages = new UI.Menu({
  backgroundColor: 'white',
  textColor: 'black',
  highlightBackgroundColor: Feature.color('kelly-green','black'),
  highlightTextColor: 'white',
  sections: [{
    title: 'Messages',
    items: [{
      title: 'Loading...'
    }]
  }]
});

menu.on('select', function(e) {
  switch(e.itemIndex) {
    case 0:
      load();
      messages.show();
      break;
  }
});

messagecard.on('back', function() {
  messages.show();
});

messages.on('back', function() {
  menu.show();
});

messages.on('select', function(e) {
  messagecard.title(messageList[e.itemIndex].title);
  messagecard.subtitle(messageList[e.itemIndex].subtitle);
  messagecard.body(messageList[e.itemIndex].msg);
  messagecard.show();
});

menu.show();

function getMessages() {
  ajax({ url: 'http://api.ammaron.gq/pebble/messages.php?id='+myid, type: 'json' },
    function(data) {
      messages.section(0,{title: 'Messages ('+data.count+')', items: data.messages});
      messageList = data.messages;
      Settings.data('message-list', messageList);
    }
  );
}
function load() {
  ajax({ url: 'http://api.ammaron.gq/pebble/username-id.php?username='+myusername, type: 'text' },
    function(data) {
      myid = data;
      Settings.data('message-id', myid);
      getMessages();
    }
  );
}