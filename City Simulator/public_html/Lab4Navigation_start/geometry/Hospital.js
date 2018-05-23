//Author: D'Angelo Guiton
function Hospital() {
    this.name = "hospital";

}

Hospital.prototype.drawHospital = function () {
    gl.uniform1f(uColorMode, 2);
    stack.push();
    stack.multiply(translate(0, 1, 0));
    Thospital.activate();
    stack.multiply(scalem(1, 2, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    hospitalgx.activate();
    stack.multiply(translate(-0.48, 0, 0));
    stack.multiply(scalem(0.1, 0.3, 0.3));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};