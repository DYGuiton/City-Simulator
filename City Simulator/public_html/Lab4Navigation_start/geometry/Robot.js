function Robot(x, y, z, s) {
    this.name = "robot";


    this.w = 0.5; //width
    this.h = 0.4; //hieght
    this.l = 0.4; //length
    this.hd = 0.4; //head diameter
    this.t = 0.1; //head thickness
    this.wd = 0.2; //wheel diameter
    wheelAngle = 1;
    headTilt = 0;
    headScale = 1;
    faceTrans = 0;
    noseScale = 1;
    this.incAngle;

    this.posX = x;
    posY = y;
    posZ = z;
    scale = s;

    translateX = 0;
    headTrans = 0;

}

Robot.prototype.drawRobot = function () {
    stack.multiply(translate(this.posX, posY, posZ));
    stack.multiply(translate(translateX, 0, 0));
    stack.multiply(scalem(scale, scale, scale));
    stack.push();

    Shapes.robot.drawBody();
    Shapes.robot.drawHead();
    Shapes.robot.drawWheels();
    Shapes.robot.drawEyes();
    Shapes.robot.drawNose();
//    Shapes.robot.move();
};


Robot.prototype.drawBody = function () {
    stack.push();
    stack.multiply(scalem(this.w, this.h, this.l));
    stack.multiply(translate(this.posX, posY, posZ));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Robot.prototype.drawHead = function () {
    stack.push();
    stack.multiply(scalem(this.hd, this.hd, this.t));
    stack.multiply(translate(this.posX, posY + 2, posZ));
    stack.multiply(translate(headTrans, headTrans, headTrans));
    stack.multiply(rotateX(headTilt));
    stack.multiply(scalem(1, 1, headScale))
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Robot.prototype.drawWheels = function () {
    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
//    console.log('posY = ' + posY);
    stack.multiply(translate(this.posX - (this.w * scale), posY - scale + 1, posZ - scale + 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
    stack.multiply(translate(this.posX + (this.w * scale), posY - scale + 1, posZ + scale - 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
    stack.multiply(translate(this.posX - (this.w * scale), posY - scale + 1, posZ + scale - 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
    stack.multiply(translate(this.posX + (this.w * scale), posY - scale + 1, posZ - scale + 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Robot.prototype.drawEyes = function () {
    stack.push();
    stack.multiply(scalem(0.1, 0.1, this.t));
    stack.multiply(translate(this.posX + 2, posY + 9, posZ + this.t + 1));
    stack.multiply(translate(0, faceTrans, -faceTrans / 3));
    stack.multiply(rotateX(headTilt / 2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();

    stack.push();
    stack.multiply(scalem(0.1, 0.1, this.t));
    stack.multiply(translate(this.posX - 2, posY + 9, posZ + this.t + 1));
    stack.multiply(translate(0, faceTrans, -faceTrans / 3));
    stack.multiply(rotateX(headTilt / 2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();
};

Robot.prototype.drawNose = function () {
    stack.push();
    stack.multiply(scalem(0.1, 0.1, 0.2));
    stack.multiply(translate(this.posX, posY + 8, this.t));
    stack.multiply(translate(0, faceTrans, -faceTrans / 3));
    stack.multiply(rotateZ(headTilt / 2));
    stack.multiply(scalem(1, 1, noseScale))
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
}

Robot.prototype.move2 = function () {
    canvas.addEventListener("mousedown", function (event) {
        wheelAngle += 10;
        translateX += 0.001;
    });
};

Robot.prototype.move = function ( ) {
    window.onkeydown = function (event) {
        var c = String.fromCharCode(event.keyCode);
        console.log('c = ' + c);

        switch (c) {
            case "A":
                wheelAngle -= 10;
                translateX -= 0.1;
                break;
            case "D":
                wheelAngle += 10;
                translateX += 0.1;
                break
            case "W":
                if (headTilt < 40) {
                    headTilt += 10;
                    headScale -= 0.1;
                    noseScale -= 0.05;
                    faceTrans += 0.4;
                }
                break;
            case "S":
                if (headTilt > -10) {
                    headTilt -= 10;
                    headScale += 0.1;
                    noseScale += 0.05
                    faceTrans -= 0.4;
                }
                break;

        }
    };

};


