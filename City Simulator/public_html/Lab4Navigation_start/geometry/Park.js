//Author: D'Angelo Guiton
function Park() {
    this.name = "park";


    Park.prototype.drawPark = function () {
        stack.multiply(translate(0, 0.01, 0));
        stack.multiply(scalem(1, 0.01, 1));
        stack.push();

        Shapes.park.drawBase();
        stack.pop();
    };

    Park.prototype.drawBase = function () {


        gl.uniform1f(uColorMode, 2);
        stack.push();
        Tpark.activate();
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();
    };
}