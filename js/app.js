'use strict';
/**---------------------------ENEMY VARIABLE--------------------------------**/
var Enemy = function(x, y, speed) {
    /** Variables applied to each of our instances go here,
    *we've provided one for you to get started
    *The image/sprite for our enemies, this uses
    *a helper we've provided to easily load images**/
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/** Update the enemy's position, required method for game
    Parameter: dt, a time delta between ticks**/
Enemy.prototype.update = function(dt) {
    /**You should multiply any movement by the dt parameter
    which will ensure the game runs at the same speed for all computers.**/
    if (this.x >= 505){
       this.x = -(Math.floor((Math.random() * 5) + 1) * 101);
        this.y = Math.floor((Math.random() * 3) + 1) * 83;
    } else {
        this.x = this.x + (this.speed * dt);
    }
    /**Collision Check**/
    collisionDetection(this);
};

/**Draw the enemy on the screen, required method for game**/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**----------------------------------PLAYER VARIABLE-----------------------------**/
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
    this.points = 0;
};

Player.prototype.update = function() {
    /*If player has reach the water, reset his location to the origin and 
    *increment runs completed counter by one
    */
    if (this.y <= 0) {
        this.points += 1;
        this.y = 404;
    };
    /**check if player runs into left, bottom, or right canvas walls
    prevent player from moving beyond canvas wall boundaries**/
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
};

Player.prototype.reset = function() {
        this.x = 202;
        this.y = 415;
};

/**--------------------DISPLAYING COLLECTIBLE ITEMS---------------------------**/
var Items = function() {
    var img = [
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/Heart.png',
        'images/Key.png'
    ];

    this.points = Math.floor(Math.random() *5);
    this.sprite = img[this.points];
    this.multiplier = 10 * (this.points + 1);

    this.x = 0 + (101 * Math.floor(Math.random() * 5));
    this.y = 63 + (83 * Math.floor(Math.random() * 3));
};

Items.prototype.update = function() {
    ItemCollision();
};

Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**----------------------COLLISION DETECTION---------------**/
var collisionDetection = function(anEnemy) {
    /** check for collision between enemy and player **/
    if (player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        console.log('Collided');
        player.reset();
    }
    /**check for player reaching top of canvas and winning the game**/
    if (player.y + 63 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        console.log('You made it!');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
    }
};

var ItemCollision = function() {
    if (player.y + 131 >= items.y + 90
        && player.x + 25 <= items.x + 88
        && player.y + 73 <= items.y + 135
        && player.x + 76 >= items.x + 11) {
        player.points += items.multiplier;
        items = null;
    }
};

var items = new Items();
var player = new Player(202.5, 383, 80);
var firstbug = new Enemy(0, Math.random() * 184 + 50, Math.floor((Math.random() * 100) + 500));
var secondbug = new Enemy(0, Math.random() * 184 + 50, Math.floor((Math.random() * 100) + 800));
var thirdbug = new Enemy(0, Math.random() * 184 + 50, Math.floor((Math.random() * 100) + 600));
var fourthbug = new Enemy(0, Math.random() * 184 + 50, Math.floor((Math.random() * 200) + 100));
var allEnemies = [firstbug, secondbug, thirdbug, fourthbug];
allEnemies.push();
/**This listens for key presses and sends the keys to your
    Player.handleInput() method. You don't need to modify this.**/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right', 
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


