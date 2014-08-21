var Phaser = require('Phaser');
var properties = require('./properties');

var BasicGame = {
  Boot: require('./states/boot.coffee'),
  Preloader: require('./states/preloader.coffee'),
  MainMenu: require('./states/mainMenu.coffee'),
  Game: require('./states/game.coffee')
};

window.onload = function() {

  //  Create your Phaser game and inject it into the gameContainer div.
  //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
  var containerId = navigator.isCocoonJS ? '' : 'gameContainer';
  var renderer = navigator.isCocoonJS ? Phaser.CANVAS : Phaser.AUTO;

  var game = new Phaser.Game(properties.size.x, properties.size.y, renderer, containerId);

  //  Add the States your game has.
  //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
  game.state.add('Boot', BasicGame.Boot);
  game.state.add('Preloader', BasicGame.Preloader);
  game.state.add('MainMenu', BasicGame.MainMenu);
  game.state.add('Game', BasicGame.Game);

  //  Now start the Boot state.
  game.state.start('Boot');

};
