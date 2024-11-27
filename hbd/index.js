function Letter(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;

    this.dx = -ctx.measureText(char).width / 2;
    this.dy = +ctx.chartSize / 2;

    this.fireworkDu = this.y - hh;

    var hue = (x / calc.totalWidth) * 360;

    this.color = "hsl(hue, 80%, 50%)".replace("hue", hue);
    this.lightColor = "hsl(hue, 80%, light%)".replace("hue", hue);
    this.alphaColor = "hsla(hue, 80%, 50%, alp)".replace("hue", hue);

    this.reset();
}

Letter.prototype.reset = function() {
    this.phase = "firework";
    this.tick = 0;
    this.spawned = false;

    this.x += Math.random() * 20 - 10;
    this.y += Math.random() * 20 - 10;

    this.vx = Math.random() * 5 - 2.5;
    this.vy = Math.random() * 7 - 3.5;

    this.letters = [];

    this.light = Math.random() * 0.5 + 0.5;
    this.target = null;
}