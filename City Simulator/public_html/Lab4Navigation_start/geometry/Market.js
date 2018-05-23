//Author: D'Angelo Guiton
function Market() {
    this.name = "market";
}

Market.prototype.drawMarket = function () {
    gl.uniform1f(uColorMode, 2);
    markettex.activate();
    stack.push();
    stack.multiply(scalem(1, 0.5, 1));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

//    poletex.activate();
//    stack.push();
//    stack.multiply(translate(0,0.5,0));
//    stack.push();
//    stack.multiply(translate(0.45,0.15,0.45));
//    stack.multiply(scalem(0.1,0.7,0.1));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    Shapes.drawPrimitive(Shapes.cube);
//    stack.pop();
//    stack.push();
//    stack.multiply(translate(-0.45,0.15,0.45));
//    stack.multiply(scalem(0.1,0.7,0.1));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    Shapes.drawPrimitive(Shapes.cube);
//    stack.pop();
//    stack.push();
//    stack.multiply(translate(0.45,0.15,-0.45));
//    stack.multiply(scalem(0.1,0.7,0.1));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    Shapes.drawPrimitive(Shapes.cube);
//    stack.pop();
//    stack.push();
//    stack.multiply(translate(-0.45,0.15,-0.45));
//    stack.multiply(scalem(0.1,0.7,0.1));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    Shapes.drawPrimitive(Shapes.cube);
//    stack.pop();
//    stack.pop();


//    tenttex.activate();
//    stack.push();
//    stack.multiply(translate(0,0.5,0));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    Shapes.drawPrimitive(Shapes.pyramid);
//    stack.pop();

    rooftex.activate();
    stack.push();
    stack.multiply(translate(0, 0.5, 0));
    stack.multiply(scalem(1.05, 1.05, 1.05));
    roof = Shapes.roof;
    roof.drawRoof(1);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    stack.pop();


    stack.push();
    marketgx.activate();
    stack.multiply(translate(-0.48, 0, 0));
    stack.multiply(scalem(0.1, 0.3, 0.3));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};
