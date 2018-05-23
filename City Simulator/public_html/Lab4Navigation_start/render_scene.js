//Author: Dakota Madden Fong 'Angelo Guiton
var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal;     // shader variable attrib location for normals 
var vTexCoord;
var uColor;       // shader uniform variable location for color
var uTexture;
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var uColorMode;
var camera = new Camera();
var stack = new MatrixStack();
var lighting = new Lighting();

var cityMap;
var lightAngleY = 5;
var lightAngleX = 5;
var program;
var nPeople;
var nPerson = 0;
var fps;

//cityMap = new CityMap(10, 2);


//Images
//
//Image Textures---------------------------------------------Image Textures//
var officetex;
var factorytex;
var markettex;
var tenttex;
var poletex;
var greentex;
var Tapartment;
var Tpark;
var Thospital;
var roofbw;
var rooftex;
var imageTexture;
var road;
var skytex;
var grasstex;

//Image Textures---------------------------------------------Image Textures//

//Image Graphics---------------------------------------------Image Graphics//
var officegx;
var factorygx;
var marketgx;
var apartmentgx;
var hospitalgx;


//Image Graphics---------------------------------------------Image Graphics//
//Procedural Textures
var checkerboard;
var greyscale;



window.onload = function init()
{
    //set Event Handlers
    //setKeyEventHandler();
    setMouseEventHandler();

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.309, 0.505, 0.74, 1.0);

    gl.enable(gl.DEPTH_TEST);


    //  Load shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    shaderSetup();

    initWindowListeners(); // setup button controls


    Shapes.initShapes();  // create the primitive and other shapes       

    lighting.setUp();

    checkerboard = new Checkerboard();
    greyscale = new Greyscale();
    imageTexture = new ImageTexture("../textures/test.jpg");
    road = new ImageTexture("../textures/Road.jpg");
    tenttex = new ImageTexture("../textures/tent.jpg");
    poletex = new ImageTexture("../textures/pole.jpg");
    greentex = new ImageTexture("../textures/green.jpg");
    officetex = new ImageTexture("../textures/office.jpg");
    factorytex = new ImageTexture("../textures/factory.jpg");
    markettex = new ImageTexture("../textures/market.jpg");
    skytex = new ImageTexture("../textures/Sky.jpg");

    skytex = new ImageTexture("../textures/sky.jpg")
    grasstex = new ImageTexture("../textures/grassy.jpg")

    rooftex = new ImageTexture("../textures/roofing.jpg");
    roofbw = new ImageTexture("../textures/roofingBW.jpg");
    Tapartment = new ImageTexture("../textures/Apartment.jpg");
    Tpark = new ImageTexture("../textures/park.jpg");
    Tsidewalk = new ImageTexture("../textures/Sidewalk.jpg");
    Thospital = new ImageTexture("../textures/Hospital.jpg");

    officegx = new ImageTexture("../textures/Work Graphic.jpg");
    factorygx = new ImageTexture("../textures/Factory Graphic.png");
    marketgx = new ImageTexture("../textures/Market Graphic.jpg");
    apartmentgx = new ImageTexture("../textures/House Graphic.png");
    hospitalgx = new ImageTexture("../textures/Hospital Graphic.png");

    //cityGenerator = new CityGenerator(10);


    startAnimating(30);//30 frames per second
    render();
};


//City Size options
function initWindowListeners() {
    //event listeners for buttons   
    document.getElementById("1Button").onclick = function () {
        Shapes.city = new City(1);
        nPeople = 0;
    };
    document.getElementById("5Button").onclick = function () {
        Shapes.city = new City(5);
        nPeople = 4;
    };
    document.getElementById("25Button").onclick = function () {
        Shapes.city = new City(25);
        nPeople = 24;
    };
    document.getElementById("50Button").onclick = function () {
        Shapes.city = new City(50);
        nPeople = 49;
    };
    document.getElementById("viewButton").onclick = function () {
        if (nPerson === nPeople) {
            nPerson = 0;
        } else {
            nPerson++;
        }
        document.getElementById("personState").innerHTML = Shapes.city.personToString(nPerson);
    };
    
    //Speed Choice options
    document.getElementById("speedChoice").onclick = function (event) {
        var x = document.getElementById("speedChoice").selectedIndex;
        switch (x) {   // cube=0, cylinder=1, cone=2, disk=3
            case 0:
                startAnimating(10);
                break;
            case 1:
                startAnimating(24);
                break;
            case 2:
                startAnimating(30);
                break;
            case 3:
                startAnimating(60);
                break;
            case 4:
                startAnimating(1000);
                break;
        }
    };
};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    vNormal = gl.getAttribLocation(program, "vNormal");
    vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    // colors but we keep it in for possible use later.

    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uTexture = gl.getUniformLocation(program, "uTexture");
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
    uColorMode = gl.getUniformLocation(program, "uColorMode");
    
}

var spos = true;
//var xdir = true;
var sro = 0.05;
//var zco = 0;
//
//var zbar = 10;
//var xbar = 3;


var stop = false;
var frameCount = 0;
var $results = ("#results");
var fpsInterval, startTime, now, then, elapsed;

//initializes the timer variables and starts the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

//by calculating the elapsed time since the last loop
//animate draws only if your specified fps interval has been passed!
function animate() {

    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);

        //put draw code here

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var projMat = camera.calcProjectionMat();   // Projection matrix  
        gl.uniformMatrix4fv(uProjection, false, flatten(projMat));

        var viewMat = camera.calcViewMat();   // View matrix

        stack.clear();
        stack.multiply(viewMat);

        stack.push();
        var rotatex = rotateX(lightAngleX);
        var rotatey = rotateY(lightAngleY);
        var rotatexy = mult(rotatey, rotatex);

        var rotatexy = mult(rotatex, rotatey);

        var rotate = mult(rotatexy, lighting.light_position);

        //viewMat * (LightAngleY*lightPosition)
        var lpos = mult(viewMat, rotate);
        gl.uniform4fv(uLight_position, lpos);

        stack.multiply(rotateY(lightAngleY));
        stack.multiply(rotateX(lightAngleX));
        stack.multiply(translate(lighting.light_position[0], lighting.light_position[1], lighting.light_position[2]));
        stack.multiply(scalem(0.1, 0.1, 0.1));
        gl.uniform1f(uColorMode, 2);
        //console.log(uColorMode);
        imageTexture.activate();
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();

        if (spos) {
            sro = sro + 0.01;
            rotatex = rotatex + sro;
        }

        document.getElementById("personState").innerHTML = Shapes.city.personToString(nPerson);


        stack.push();
        //City = Shapes.city;
        Shapes.city.drawCity();
        Shapes.city.drawCitizens();
        Shapes.city.incrementCitizens();
        stack.pop();

        stack.push();
        gl.uniform1f(uColorMode, 2);
        gl.uniform4fv(uColor, vec4(0.113, 0.682, 0.886,1));
        skytex.activate();
        stack.multiply(scalem(50,50,50));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.sphere);
        stack.pop();
        
        stack.push();
    gl.uniform1f(uColorMode, 2);
    grasstex.activate();
    stack.multiply(scalem(50,50,50));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();
    }
}



//render is called to update the view when transformations are performed on the camera
function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));

    var viewMat = camera.calcViewMat();   // View matrix

    stack.clear();
    stack.multiply(viewMat);

    stack.push();
    var rotatex = rotateX(lightAngleX);
    var rotatey = rotateY(lightAngleY);
    var rotatexy = mult(rotatey, rotatex);

    var rotatexy = mult(rotatex, rotatey);

    var rotate = mult(rotatexy, lighting.light_position);

    //viewMat * (LightAngleY*lightPosition)
    var lpos = mult(viewMat, rotate);
    gl.uniform4fv(uLight_position, lpos);

    stack.multiply(rotateY(lightAngleY));
    stack.multiply(rotateX(lightAngleX));
    stack.multiply(translate(lighting.light_position[0], lighting.light_position[1], lighting.light_position[2]));
    stack.multiply(scalem(0.1, 0.1, 0.1));
    gl.uniform1f(uColorMode, 2);
    //console.log(uColorMode);
    imageTexture.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();



    stack.push();
    //City = Shapes.city;
    Shapes.city.drawCity();
    Shapes.city.drawCitizens();
    stack.pop();

    stack.push();
    gl.uniform1f(uColorMode, 2);
    skytex.activate();
    stack.multiply(scalem(50,50,50));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.sphere);
    stack.pop();
    
    stack.push();
    gl.uniform1f(uColorMode, 2);
    grasstex.activate();
    stack.multiply(scalem(50,50,50));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();



}

