//Author: D'Angelo Guiton
function Roof() {
    this.name = "roof";


    Roof.prototype.drawRoof = function (h) {
        //stack.multiply(translate(0, h-h*0.005, 0));
        //stack.multiply(scalem(1, 0.05, 1));
        stack.push();
        Shapes.roof.drawBase(h);
        Shapes.roof.drawTop(h);
        stack.pop();
    };

    Roof.prototype.drawTop = function (h) {
        gl.uniform1f(uColorMode, 2);
        stack.push();
        stack.multiply(translate(0, 0.05, 0));
        stack.multiply(scalem(1, 0.05, 1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();
    };

    Roof.prototype.drawBase = function (h) {
//        stack.multiply(translate(0, h, 0));
        gl.uniform1f(uColorMode, 2);
        stack.push();

        //stack.multiply(translate(0, h / 4 + 0.05, 0));
        stack.multiply(scalem(0.5, 0.05, 0.5));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.frustum);
        stack.pop();

    };
}


    