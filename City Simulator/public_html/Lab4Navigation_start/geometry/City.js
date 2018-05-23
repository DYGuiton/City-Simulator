//Author: D'Angelo Guiton
function City(s) {
    this.name = "city";
    cityMap = new CityMap(6, 2);


    this.length = cityMap.length;
    this.width = cityMap.width;
    this.height = cityMap.height;
    //this.bLocations = [];


    this.createMap();
    //generates the people to be placed in the city
    citizens = new Citizens(s, this.bLocations);



    //marPos = cityMap.placeArray[1];
}

//draws the city in the canvas
City.prototype.drawCity = function () {
    Shapes.city.drawRoad();
    Shapes.city.drawBuildings();

    //citizens.drawCitizens();
    //Shapes.city.drawSky();
};

//draws the people in the canvas
City.prototype.drawCitizens = function () {
    citizens.drawCitizens();
}

//increments all the citizens stats based on their internal timer
City.prototype.incrementCitizens = function () {
    citizens.incrementCitizens();
};

//creates a current map for the city based on the building locations defined in the city map
City.prototype.createMap = function () {
    this.bLocations = [];
    for (var x = 0; x < this.length; x++) {
        var row = [];
        for (var z = 0; z < this.length; z++) {
            row.push(0.0);
        }
        this.bLocations.push(row);
    }


};

//draws the road lining the middle of the city
City.prototype.drawRoad = function () {
    stack.push();
    stack.multiply(scalem(2, 0.01, this.length));
    stack.multiply((translate(0, this.height, 0)));
    gl.uniform1f(uColorMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    road.activate();
    Shapes.drawPrimitive(Shapes.road);
    stack.pop();
};

//draws all the buildings
City.prototype.drawBuildings = function () {
    stack.multiply(scalem(2, 2, 2));
    Shapes.city.drawMarket();
    Shapes.city.drawOffice();
    Shapes.city.drawFactory();
    Shapes.city.drawPark();
    Shapes.city.drawApartment();
    Shapes.city.drawHospital();

};

//these set functions set the location of each building in the building locations array based on 
//their locations in the citymap
City.prototype.setMarket = function () {
    if (cityMap.rotate[0] === true) {
        this.bLocations[0][1] = -1.5;
    } else {
        this.bLocations[0][1] = 1.5;
    }
    this.bLocations[0][0] = cityMap.positions[0];
    console.log(bLocations[0][0] + " and " + bLocations[0][1]);
};

City.prototype.setOffice = function () {
    if (cityMap.rotate[1] === true) {
        this.bLocations[1][1] = -1.5;
    } else {
        this.bLocations[1][1] = 1.5;
    }
    this.bLocations[1][0] = cityMap.positions[0];
};

City.prototype.setFactory = function () {
    if (cityMap.rotate[2] === true) {
        this.bLocations[2][1] = -1.5;
    } else {
        this.bLocations[2][1] = 1.5;
    }
    this.bLocations[2][0] = cityMap.positions[0];
};

City.prototype.setPark = function () {
    if (cityMap.rotate[3] === true) {
        this.bLocations[3][1] = -1.5;
    } else {
        this.bLocations[3][1] = 1.5;
    }
    this.bLocations[3][0] = cityMap.positions[0];
};

City.prototype.setApartment = function () {
    if (cityMap.rotate[4] === true) {
        this.bLocations[4][1] = -1.5;
    } else {
        this.bLocations[4][1] = 1.5;
    }
    this.bLocations[4][0] = cityMap.positions[0];
};

City.prototype.setHospital = function () {
    if (cityMap.rotate[5] === true) {
        this.bLocations[5][1] = -1.5;
    } else {
        this.bLocations[5][1] = 1.5;
    }
    this.bLocations[5][0] = cityMap.positions[0];
};


//these draw functions draw the building based on their locations in the cityMap
City.prototype.drawMarket = function () {

    stack.push();
    if (cityMap.rotate[0] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[0]));
        stack.multiply(rotateY(180));
        this.bLocations[0][1] = -1.5;
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[0]));
        this.bLocations[0][1] = 1.5;
    }

    this.bLocations[0][0] = cityMap.positions[0];
    mar = new Market();
    mar.drawMarket();
    stack.pop();

    stack.push();
    if (cityMap.rotate[0] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[0] + 1));
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[0] + 1));
    }

    g1 = new Ground();
    g1.drawGround();
    stack.pop();
};

City.prototype.drawOffice = function () {
    stack.push();
    if (cityMap.rotate[1] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[1]));
        stack.multiply(rotateY(180));
        this.bLocations[1][1] = -1.5;
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[1]));
        this.bLocations[1][1] = 1.5;
    }

    this.bLocations[1][0] = cityMap.positions[1];
    off = new Office();
    off.drawOffice();
    stack.pop();

    stack.push();
    if (cityMap.rotate[1] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[1] + 1));
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[1] + 1));
    }
    g1 = new Ground();
    g1.drawGround();
    stack.pop();
};

City.prototype.drawFactory = function () {
    stack.push();
    if (cityMap.rotate[2] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[2]));
        stack.multiply(rotateY(180));
        this.bLocations[2][1] = -1.5;
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[2]));
        this.bLocations[2][1] = 1.5;
    }

    this.bLocations[2][0] = cityMap.positions[2];
    fac = new Factory();
    fac.drawFactory();
    stack.pop();

    stack.push();
    if (cityMap.rotate[2] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[2] + 1));
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[2] + 1));
    }
    g1 = new Ground();
    g1.drawGround();
    stack.pop();
};

City.prototype.drawPark = function () {
    stack.push();
    if (cityMap.rotate[3] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[3]));
        stack.multiply(rotateY(180));
        this.bLocations[3][1] = -1.5;
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[3]));
        this.bLocations[3][1] = 1.5;
    }

    this.bLocations[3][0] = cityMap.positions[3];
    park = new Park();
    park.drawPark();
    stack.pop();

    stack.push();
    if (cityMap.rotate[3] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[3] + 1));
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[3] + 1));
    }
    g1 = new Ground();
    g1.drawGround();
    stack.pop();
};

City.prototype.drawApartment = function () {
    stack.push();
    if (cityMap.rotate[4] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[4]));
        stack.multiply(rotateY(180));
        this.bLocations[4][1] = -1.5;
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[4]));
        this.bLocations[4][1] = 1.5;
    }

    this.bLocations[4][0] = cityMap.positions[4];
    apr = new Apartment();
    apr.drawApartment();
    stack.pop();

    stack.push();
    if (cityMap.rotate[4] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[4] + 1));
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[4] + 1));
    }
    g1 = new Ground();
    g1.drawGround();
    stack.pop();
};

City.prototype.drawHospital = function () {
    stack.push();
    if (cityMap.rotate[5] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[5]));
        stack.multiply(rotateY(180));
        this.bLocations[5][1] = -1.5;
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[5]));
        this.bLocations[5][1] = 1.5;
    }

    this.bLocations[5][0] = cityMap.positions[5];
    hos = new Hospital();
    hos.drawHospital();
    stack.pop();

    stack.push();
    if (cityMap.rotate[5] === true) {
        stack.multiply(translate(-1.5, 0, cityMap.positions[5] + 1));
    } else {
        stack.multiply(translate(1.5, 0, cityMap.positions[5] + 1));
    }
    g1 = new Ground();
    g1.drawGround();
    stack.pop();
};


//returns a string of the person in the citizens array in the citizens class
City.prototype.personToString = function (p) {
    return citizens.personToString(p);
};

//    City.prototype.drawSky = function () {
//        stack.push();
//        sky = new Skybox();
//        sky.drawSkybox();
//    };
//

