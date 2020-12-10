/**
 * 
 * Game configurations.
 * @name configurations
 */
const configurations = {
    type: Phaser.AUTO,
    width: 288,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

/**
 *  Game assets.
 *  @name assets
 */
const assets = {
    bird: {
        red: 'bird-red',
        yellow: 'bird-yellow',
        blue: 'bird-blue'
    },
    obstacle: {
        pipe: {
            green: {
                top: 'pipe-green-top',
                bottom: 'pipe-green-bottom'
            },
            red: {
                top: 'pipe-red-top',
                bottom: 'pipe-red-bo'
            }
        }
    },
    scene: {
        width: 144,
        background: {
            day: 'background-day',
            night: 'background-night'
        },
        ground: 'ground',
        gameOver: 'game-over',
        restart: 'restart-button',
        messageInitial: 'message-initial'
    },
    scoreboard: {
        width: 25,
        base: 'number',
        number0: 'number0',
        number1: 'number1',
        number2: 'number2',
        number3: 'number3',
        number4: 'number4',
        number5: 'number5',
        number6: 'number6',
        number7: 'number7',
        number8: 'number8',
        number9: 'number9'
    },
    animation: {
        bird: {
            red: {
                clapWings: 'red-clap-wings',
                stop: 'red-stop'
            },
            blue: {
                clapWings: 'blue-clap-wings',
                stop: 'blue-stop'
            },
            yellow: {
                clapWings: 'yellow-clap-wings',
                stop: 'yellow-stop'
            }
        },
        ground: {
            moving: 'moving-ground',
            stop: 'stop-ground'
        }
    }
}

// Game
/**
 * The main controller for the entire Phaser game.
 * @name game
 * @type {object}
 */
const game = new Phaser.Game(configurations)
    /**
     * If it had happened a game over.
     * @type {boolean}
     */
let gameOver
    /**
     * If the game has been started.
     * @type {boolean}
     */
let gameStarted
    /**
     * Up button component.
     * @type {object}
     */
let upButton
    /**
     * Restart button component.
     * @type {object}
     */
let restartButton
    /**
     * Game over banner component.
     * @type {object}
     */
let gameOverBanner
    /**
     * Message initial component.
     * @type {object}
     */
let messageInitial
    // Bird
    /**
     * Player component.
     * @type {object}
     */
let player
    /**
     * Bird name asset.
     * @type {string}
     */
let birdName
    /**
     * Quantity frames to move up.
     * @type {number}
     */
let framesMoveUp
    // Background
    /**
     * Day background component.
     * @type {object}
     */
let backgroundDay
    /**
     * Night background component.
     * @type {object}
     */
let backgroundNight
    /**
     * Ground component.
     * @type {object}
     */
let ground
    // pipes
    /**
     * Pipes group component.
     * @type {object}
     */
let pipesGroup
    /**
     * Gaps group component.
     * @type {object}
     */
let gapsGroup
    /**
     * Counter till next pipes to be created.
     * @type {number}
     */
let nextPipes
    /**
     * Current pipe asset.
     * @type {object}
     */
let currentPipe
    // score variables
    /**
     * Scoreboard group component.
     * @type {object}
     */
let scoreboardGroup
    /**
     * Score counter.
     * @type {number}
     */
let score

/**
 *   Load the game assets.
 */
function preload() {
    // Backgrounds and ground
    this.load.image(assets.scene.background.day, 'assets/background-day.png')
    this.load.image(assets.scene.background.night, 'assets/background-night.png')
    this.load.spritesheet(assets.scene.ground, 'assets/ground-sprite.png', {
        frameWidth: 336,
        frameHeight: 112
    })

    // Pipes
    this.load.image(assets.obstacle.pipe.green.top, 'assets/pipe-green-top.png')
    this.load.image(assets.obstacle.pipe.green.bottom, 'assets/pipe-green-bottom.png')
    this.load.image(assets.obstacle.pipe.red.top, 'assets/pipe-red-top.png')
    this.load.image(assets.obstacle.pipe.red.bottom, 'assets/pipe-red-bottom.png')

    // Start game
    this.load.image(assets.scene.messageInitial, 'assets/message-initial.png')

    // End game
    this.load.image(assets.scene.gameOver, 'assets/gameover.png')
    this.load.image(assets.scene.restart, 'assets/restart-button.png')

    // Birds
    this.load.spritesheet(assets.bird.red, 'assets/bird-red-sprite.png', {
        frameWidth: 34,
        frameHeight: 24
    })
    this.load.spritesheet(assets.bird.blue, 'assets/bird-blue-sprite.png', {
        frameWidth: 34,
        frameHeight: 24
    })
    this.load.spritesheet(assets.bird.yellow, 'assets/bird-yellow-sprite.png', {
        frameWidth: 34,
        frameHeight: 24
    })

    // Numbers
    this.load.image(assets.scoreboard.number0, 'assets/number0.png')
    this.load.image(assets.scoreboard.number1, 'assets/number1.png')
    this.load.image(assets.scoreboard.number2, 'assets/number2.png')
    this.load.image(assets.scoreboard.number3, 'assets/number3.png')
    this.load.image(assets.scoreboard.number4, 'assets/number4.png')
    this.load.image(assets.scoreboard.number5, 'assets/number5.png')
    this.load.image(assets.scoreboard.number6, 'assets/number6.png')
    this.load.image(assets.scoreboard.number7, 'assets/number7.png')
    this.load.image(assets.scoreboard.number8, 'assets/number8.png')
    this.load.image(assets.scoreboard.number9, 'assets/number9.png')
}

/**
 *   Create the game objects (images, groups, sprites and animations).
 */
function create() {
    backgroundDay = this.add.image(assets.scene.width, 256, assets.scene.background.day).setInteractive()
    backgroundDay.on('pointerdown', moveBird)
    backgroundNight = this.add.image(assets.scene.width, 256, assets.scene.background.night).setInteractive()
    backgroundNight.visible = false
    backgroundNight.on('pointerdown', moveBird)

    gapsGroup = this.physics.add.group()
    pipesGroup = this.physics.add.group()
    scoreboardGroup = this.physics.add.staticGroup()

    ground = this.physics.add.sprite(assets.scene.width, 458, assets.scene.ground)
    ground.setCollideWorldBounds(true)
    ground.setDepth(10)

    messageInitial = this.add.image(assets.scene.width, 156, assets.scene.messageInitial)
    messageInitial.setDepth(30)
    messageInitial.visible = false

    upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    if (upButton != true && upButton != false) {
        upButton = true;
    }
    // Ground animations
    this.anims.create({
        key: assets.animation.ground.moving,
        frames: this.anims.generateFrameNumbers(assets.scene.ground, {
            start: 0,
            end: 2
        }),
        frameRate: 15,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.ground.stop,
        frames: [{
            key: assets.scene.ground,
            frame: 0
        }],
        frameRate: 20
    })

    // Red Bird Animations
    this.anims.create({
        key: assets.animation.bird.red.clapWings,
        frames: this.anims.generateFrameNumbers(assets.bird.red, {
            start: 0,
            end: 2
        }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.bird.red.stop,
        frames: [{
            key: assets.bird.red,
            frame: 1
        }],
        frameRate: 20
    })

    // Blue Bird animations
    this.anims.create({
        key: assets.animation.bird.blue.clapWings,
        frames: this.anims.generateFrameNumbers(assets.bird.blue, {
            start: 0,
            end: 2
        }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.bird.blue.stop,
        frames: [{
            key: assets.bird.blue,
            frame: 1
        }],
        frameRate: 20
    })

    // Yellow Bird animations
    this.anims.create({
        key: assets.animation.bird.yellow.clapWings,
        frames: this.anims.generateFrameNumbers(assets.bird.yellow, {
            start: 0,
            end: 2
        }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.bird.yellow.stop,
        frames: [{
            key: assets.bird.yellow,
            frame: 1
        }],
        frameRate: 20
    })

    prepareGame(this)

    gameOverBanner = this.add.image(assets.scene.width, 206, assets.scene.gameOver)
    gameOverBanner.setDepth(20)
    gameOverBanner.visible = false

    restartButton = this.add.image(assets.scene.width, 300, assets.scene.restart).setInteractive()
    restartButton.on('pointerdown', restartGame)
    restartButton.setDepth(20)
    restartButton.visible = false
}

/**
 *  Update the scene frame by frame, responsible for move and rotate the bird and to create and move the pipes.
 */
function update() {
    if (gameOver || !gameStarted)
        return

    if (framesMoveUp > 0)
        framesMoveUp--;
    else if (upButton) {
        moveBird()
    } else {
        player.setVelocityY(120)

        if (player.angle < 90)
            player.angle += 1
    }

    pipesGroup.children.iterate(function(child) {
        if (child == undefined)
            return

        if (child.x < -50)
            child.destroy()
        else
            child.setVelocityX(-100)
    })

    gapsGroup.children.iterate(function(child) {
        child.body.setVelocityX(-100)
    })

    nextPipes++
    if (nextPipes === 130) {
        makePipes(game.scene.scenes[0])
        nextPipes = 0
    }
}

/**
 *  Bird collision event.
 *  @param {object} player - Game object that collided, in this case the bird. 
 */
function hitBird(player) {
    this.physics.pause()

    gameOver = true
    gameStarted = false

    player.anims.play(getAnimationBird(birdName).stop)
    ground.anims.play(assets.animation.ground.stop)

    gameOverBanner.visible = true
    restartButton.visible = true
}

/**
 *   Update the scoreboard.
 *   @param {object} _ - Game object that overlapped, in this case the bird (ignored).
 *   @param {object} gap - Game object that was overlapped, in this case the gap.
 */
function updateScore(_, gap) {
    score++
    gap.destroy()

    if (score % 10 == 0) {
        backgroundDay.visible = !backgroundDay.visible
        backgroundNight.visible = !backgroundNight.visible

        if (currentPipe === assets.obstacle.pipe.green)
            currentPipe = assets.obstacle.pipe.red
        else
            currentPipe = assets.obstacle.pipe.green
    }

    updateScoreboard()
}

/**
 * Create pipes and gap in the game.
 * @param {object} scene - Game scene.
 */
function makePipes(scene) {
    if (!gameStarted || gameOver) return

    const pipeTopY = Phaser.Math.Between(-120, 120)

    const gap = scene.add.line(288, pipeTopY + 210, 0, 0, 0, 98)
    gapsGroup.add(gap)
    gap.body.allowGravity = false
    gap.visible = false

    const pipeTop = pipesGroup.create(288, pipeTopY, currentPipe.top)
    pipeTop.body.allowGravity = false

    const pipeBottom = pipesGroup.create(288, pipeTopY + 420, currentPipe.bottom)
    pipeBottom.body.allowGravity = false
}

/**
 * Move the bird in the screen.
 */
function moveBird() {
    if (gameOver)
        return

    if (!gameStarted)
        startGame(game.scene.scenes[0]);

    player.setVelocityY(-800);
    player.angle = -15;
    framesMoveUp = 3;
    upButton = false;
}

/**
 * Get a random bird color.
 * @return {string} Bird color asset.
 */
function getRandomBird() {
    switch (Phaser.Math.Between(0, 2)) {
        case 0:
            return assets.bird.red
        case 1:
            return assets.bird.blue
        case 2:
        default:
            return assets.bird.yellow
    }
}

/**
 * Get the animation name from the bird.
 * @param {string} birdColor - Game bird color asset.
 * @return {object} - Bird animation asset.
 */
function getAnimationBird(birdColor) {
    switch (birdColor) {
        case assets.bird.red:
            return assets.animation.bird.red
        case assets.bird.blue:
            return assets.animation.bird.blue
        case assets.bird.yellow:
        default:
            return assets.animation.bird.yellow
    }
}

/**
 * Update the game scoreboard.
 */
function updateScoreboard() {
    scoreboardGroup.clear(true, true)

    const scoreAsString = score.toString()
    if (scoreAsString.length == 1)
        scoreboardGroup.create(assets.scene.width, 30, assets.scoreboard.base + score).setDepth(10)
    else {
        let initialPosition = assets.scene.width - ((score.toString().length * assets.scoreboard.width) / 2)

        for (let i = 0; i < scoreAsString.length; i++) {
            scoreboardGroup.create(initialPosition, 30, assets.scoreboard.base + scoreAsString[i]).setDepth(10)
            initialPosition += assets.scoreboard.width
        }
    }
}

/**
 * Restart the game. 
 * Clean all groups, hide game over objects and stop game physics.
 */
function restartGame() {
    pipesGroup.clear(true, true)
    pipesGroup.clear(true, true)
    gapsGroup.clear(true, true)
    scoreboardGroup.clear(true, true)
    player.destroy()
    gameOverBanner.visible = false
    restartButton.visible = false

    const gameScene = game.scene.scenes[0]
    prepareGame(gameScene)

    gameScene.physics.resume()
}

/**
 * Restart all variable and configurations, show main and recreate the bird.
 * @param {object} scene - Game scene.
 */
function prepareGame(scene) {
    framesMoveUp = 0
    nextPipes = 0
    currentPipe = assets.obstacle.pipe.green
    score = 0
    gameOver = false
    backgroundDay.visible = true
    backgroundNight.visible = false
    messageInitial.visible = true

    birdName = getRandomBird()
    player = scene.physics.add.sprite(60, 265, birdName)
    player.setCollideWorldBounds(true)
    player.anims.play(getAnimationBird(birdName).clapWings, true)
    player.body.allowGravity = false

    scene.physics.add.collider(player, ground, hitBird, null, scene)
    scene.physics.add.collider(player, pipesGroup, hitBird, null, scene)

    scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene)

    ground.anims.play(assets.animation.ground.moving, true)
}

/**
 * Start the game, create pipes and hide the main menu.
 * @param {object} scene - Game scene.
 */
function startGame(scene) {
    gameStarted = true
    messageInitial.visible = false

    const score0 = scoreboardGroup.create(assets.scene.width, 30, assets.scoreboard.number0)
    score0.setDepth(20)

    makePipes(scene)
}

//----------------------------------Voice Commands--------------------------------------

//libreria de Tensor, predice ciertas palabras basicas y busca similitudes
let recognizer;

function predictWord() {
    // Array of words that the recognizer is trained to recognize.
    const words = recognizer.wordLabels();
    recognizer.listen(({ scores }) => {
        // Turn scores into a list of (score,word) pairs.
        scores = Array.from(scores).map((s, i) => ({ score: s, word: words[i] }));
        // Find the most probable word.
        scores.sort((s1, s2) => s2.score - s1.score);
        if (scores[0].word == "up") { //Se establece la palabra "up" para subir
            upButton = true;
        } else {
            upButton = false;
        }
        console.log(scores[0].word);
        console.log(upButton);
    }, { probabilityThreshold: 0.001 });
}

//--------------------------------------------------------------------------------------

async function app() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    predictWord();
}

app();