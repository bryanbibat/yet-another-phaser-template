Persist = require("Persist")
Store = new Persist.Store("LocalStorage")
properties = require("../properties")

# force cache busting to work
cacheBust = ["./preloader-bar.png#grunt-cache-bust"]

class Boot
  constructor: (game) ->

  preload: ->
    
    #  Here we load the assets required for our preloader (in this case a loading bar)
    @load.image "preloaderBar", "./preloader-bar.png"
    return

  create: ->
    
    #  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    @input.maxPointers = 1
    
    #  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    @stage.disableVisibilityChange = true
    @scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    @scale.minWidth = 300
    @scale.minHeight = 400
    @scale.maxWidth = 768
    @scale.maxHeight = 1024
    @scale.forceLandscape = false
    @scale.pageAlignHorizontally = true
    if navigator.isCocoonJS
      @scale.maxWidth = window.innerWidth * window.devicePixelRatio
      @scale.maxHeight = window.innerHeight * window.devicePixelRatio
    else
      unless @game.device.desktop
        @scale.pageAlignVertically = true
    @scale.setScreenSize true
    
    #  By this point the preloader assets have loaded to the cache, we've set the game settings
    #  So now let's start the real preloader going
    @state.start "Preloader"
    return

module.exports = Boot
