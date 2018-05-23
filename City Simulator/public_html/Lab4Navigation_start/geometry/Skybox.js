//Author: Dakota  Madden-Fong
function Skybox(){
    this.name = "skybox";
}

Skybox.prototype.drawSkybox = function () {
    gl.uniform1f(uColorMode, 2);
    stack.push();
    skytex.activate();
    stack.multiply(translate(0,-0.03,0));
    stack.multiply(scalem(200,500,200));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.disk);
    stack.push();
    skytex.activate();
    stack.multiply(translate(0,0,-0.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
    stack.pop();
}