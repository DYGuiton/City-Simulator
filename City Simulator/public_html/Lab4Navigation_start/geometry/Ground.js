//Author: D'Angelo Guiton
function Ground() {
    this.name = "apartment";


    Ground.prototype.drawGround = function () {
        stack.multiply(scalem(1, 0.01, 1));
        gl.uniform1f(uColorMode, 2);
        stack.push();
        Tsidewalk.activate();
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();

    }
}


