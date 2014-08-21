# force cache busting to work
cacheBust = ["./bullet.png#grunt-cache-bust", "./powerup.wav#grunt-cache-bust" ]

class Preloader
  constructor: (game) ->
    @background = null
    @preloadBar = null
    return

  preload: ->
    
    #  Show the loading progress bar asset we loaded in boot.js
    @stage.backgroundColor = "#2d2d2d"
    @preloadBar = @add.sprite(300, 400, "preloaderBar")
    @preloadBar.anchor.setTo 0.5, 0.5
    @add.text(300, 360, "Loading...",
      font: "32px monospace"
      fill: "#fff"
    ).anchor.setTo 0.5, 0.5
    
    #  This sets the preloadBar sprite as a loader sprite.
    #  What that does is automatically crop the sprite from 0 to full-width
    #  as the files below are loaded in.
    @load.setPreloadSprite @preloadBar
    
    #  Here we load the rest of the assets our game needs.
    @load.image "bullet", "./bullet.png"
    @load.audio "powerUp", ["./powerup.wav"]
    #this.load.audio('titleMusic', ['audio/main_menu.mp3']);
    #  + lots of other required assets here
    return

  
  create: ->
    
    #  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    @preloadBar.cropEnabled = false
    return

  update: ->
    
    #  You don't actually need to do this, but I find it gives a much smoother game experience.
    #  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    #  You can jump right into the menu if you want and still play the music, but you'll have a few
    #  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    #  it's best to wait for it to decode here first, then carry on.
    
    #  If you don't have any music in your game then put the game.state.start line into the create function and delete
    #  the update function completely.
    
    #if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    #  this.ready = true;
    @state.start "MainMenu"
    return

module.exports = Preloader
