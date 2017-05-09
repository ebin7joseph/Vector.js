var width, height, fps;
function init(w,h,f)	{
	width = w;
	height = h;
	fps = f;
}
var world = {
    canvas : document.createElement("canvas"),
    start : function()	{
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(update, fps);
        },
    clear : function() {
		this.frameNo += 1;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function sound(path)	{
	this.audio = document.createElement("audio"),
	this.audio.src = path;
	this.audio.setAttribute("preload","auto");
	this.audio.style.display = "none";
	document.body.appendChild(this.audio);
	this.play = function()	{
		this.audio.play();
	}
	this.pause = function()	{
		this.audio.pause();
	}
}

function image(width, height, path, x, y) {
    this.image = new Image();
    this.image.src = path;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.0;
	this.mass = 0.0
    this.gravitySpeed = 0;
    this.bounce = 0.0;
    this.update = function() {
		var ctx = world.context;
		this.newPos();
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }
	this.setGravity = function(g)	{
		this.gravity = g;
	}
	this.setMass = function(m)	{
		this.mass = m;
	}
	this.setBounce = function(b)	{
		this.bounce = - b;
	}
    this.newPos = function() {
        if(this.mass != 0.0){
			this.gravitySpeed += (this.gravity/this.mass);
		}
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.collideWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function sprite(swidth, sheight, sx, sy, width, height, path, x, y, totalframe, scale, delay) {
    this.image = new Image();
    this.image.src = path;
	this.swidth = swidth;
	this.sheight = sheight;
	this.offset = 0;
	this.delay = delay;
	this.scale = scale;
	this.totalframe = totalframe;
	this.sx = sx;
	this.sy = sy;
	this.index = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.0;
	this.mass = 0.0
    this.gravitySpeed = 0;
    this.bounce = 0.0;
    this.update = function() {
		var ctx = world.context;
		this.newPos();
		this.offset = this.index % this.totalframe + 1;
        ctx.drawImage(this.image,
		this.sx + this.offset * this.width,
		0,
		this.swidth,
		this.sheight,
        this.x,
        this.y,
        this.width * this.scale,
		this.height * this.scale);
		if(world.frameNo%this.delay == 0)	{
			this.index += 1;
		}
    }
	this.setGravity = function(g)	{
		this.gravity = g;
	}
	this.setMass = function(m)	{
		this.mass = m;
	}
	this.setBounce = function(b)	{
		this.bounce = - b;
	}
    this.newPos = function() {
        if(this.mass != 0.0){
			this.gravitySpeed += (this.gravity/this.mass);
		}
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.collideWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function text(string, fontsize, font, color, x, y) {
    this.fontsize = fontsize;
    this.font = font;
	this.string =string;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.0;
	this.mass = 0.0
    this.gravitySpeed = 0;
    this.bounce = 0.0;
    this.update = function() {
		var ctx = world.context;
		this.newPos();
        ctx.font = this.fontsize + " " + this.font;
        ctx.fillStyle = color;
        ctx.fillText(this.string, this.x, this.y);
    }
	this.setGravity = function(g)	{
		this.gravity = g;
	}
	this.setMass = function(m)	{
		this.mass = m;
	}
    this.newPos = function() {
		if(this.mass != 0.0){
			this.gravitySpeed += (this.gravity/this.mass);
		}
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.collideWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function filledBox(width, height, color, x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.0;
	this.mass = 0.0
    this.gravitySpeed = 0;
    this.bounce = 0.0;
    this.update = function() {
		var ctx = world.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
    }
	this.setGravity = function(g)	{
		this.gravity = g;
	}
	this.setMass = function(m)	{
		this.mass = m;
	}
    this.newPos = function() {
		if(this.mass != 0.0){
			this.gravitySpeed += (this.gravity/this.mass);
		}
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.collideWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}