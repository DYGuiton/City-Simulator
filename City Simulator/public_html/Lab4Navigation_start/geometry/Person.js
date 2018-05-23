//Author: D'Angelo Guiton
function Person(blocs, i) {
    this.name = "Person# " + i;

    //stats
    this.hunger = this.genRandomStat(50);
    this.wealth = this.genWealth();
    this.sanity = this.genRandomStat(50);
    this.sleep = 25;
    this.health = 100;//100;
    this.age = 20;//this.genRandomStat(21);
    this.timer = 0;//creates the internal clock to be incremented every frame
    this.job = this.genJob();
    this.travelz = false;
    this.bLocations = blocs;

    //booleans to determine current actions
    this.eating = false;
    this.healing = false;
    this.working = false;
    this.laboring = false;
    this.relaxing = false;
    this.sleeping = false;
    this.dead = false;

    //useless boolean created for the useless leave building function
    this.initialWalk = false;

    //placement of person within the city
    this.xco = 0;
    this.zco = 0;
}

//draw the person without fulfilling needs
Person.prototype.drawPerson = function () {
    if (!this.dead) {
        gl.uniform1f(uColorMode, 0);
        //this.setCourse();
        stack.push();
        stack.multiply(translate(this.xco, 0.06, this.zco));
        stack.multiply(scalem(0.1, 0.1, 0.1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        //console.log("xco =" + this.xco);
        //console.log("zco =" + this.zco);
        stack.pop();
    } else {
        gl.uniform1f(uColorMode, 2);
        gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
        stack.push();
        stack.multiply(translate(this.xco + 0.25, 0.06, this.zco));
        stack.multiply(scalem(0.05, 0.05, 0.05));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        //console.log("xco =" + this.xco);
        //console.log("zco =" + this.zco);
        stack.pop();
    }
};

//draws the person and calls fulfillNeeds to fulfill needs
Person.prototype.animPerson = function () {
    if (!this.dead) {
        gl.uniform1f(uColorMode, 0);
        this.fulfillNeeds();
        stack.push();
        stack.multiply(translate(this.xco, 0.06, this.zco));
        stack.multiply(scalem(0.1, 0.1, 0.1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        //console.log("xco =" + this.xco);
        //console.log("zco =" + this.zco);
        stack.pop();
    } else {
        this.travelz = false;
        this.travel(3);
        gl.uniform1f(uColorMode, 2);
        gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
        stack.push();
        stack.multiply(translate(this.xco + 0.25, 0.06, this.zco));
        stack.multiply(scalem(0.05, 0.05, 0.05));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        //console.log("xco =" + this.xco);
        //console.log("zco =" + this.zco);
        stack.pop();
    }
    console.log(this.toString());
};

Person.prototype.checkAge = function () {
    if (this.age === 80) {
        this.dead = true;
    }
};

//calls on the object to decide next locations
Person.prototype.fulfillNeeds = function () {
    if (this.healing === true && this.health < 100) {
        this.travelz = false;
        this.travel(5);
    } else if (this.sleeping === true && this.sleep < 100) {
        this.travel(4);
    } else if (this.eating === true && this.hunger < 100) {
        this.travelz = false;
        this.travel(0);
    } else if (this.relaxing === true && this.sanity < 50) {
        this.travelz = false;
        this.travel(3);
    } else {
        this.setCourse();
    }
};

//changes coord. based on needs
Person.prototype.travel = function (n) {

    //if we haven't completed travel along the z dir, travel along z. else x

    //console.log("Travel to: (" + this.bLocations[n][0] + this.bLocations[n][1] + ")");
    //console.log(n);
    if (this.travelz === false) {

        if (this.bLocations[n][0] > 0) {
            if (this.zco < this.bLocations[n][0]) {
                this.zco = this.zco + 0.1;
            } else {
                this.travelz = true;
            }
        }
        if (this.bLocations[n][0] < 0) {
            if (this.zco > this.bLocations[n][0]) {
                this.zco = this.zco - 0.1;
            } else {
                this.travelz = true;
            }
        }
    }

    if (this.travelz === true) {
        if (this.bLocations[n][1] > 0) {
            if (this.xco < this.bLocations[n][1]) {
                this.xco = this.xco + 0.1;
            }
        }
        if (this.bLocations[n][1] < 0) {
            if (this.xco > this.bLocations[n][1]) {
                this.xco = this.xco - 0.1;
            }
        }
    }

};

//decides where to travel to
Person.prototype.setCourse = function () {
    //this.bLocations = bLocations;
    //console.log("need = " + this.decideNeed());
    switch (this.decideNeed()) {
        case 0:
            //travel to hospital
            this.travelz = false;
            this.travel(5);
            break;
        case 1:
            //travel to apartment
            this.travelz = false;
            this.travel(4);
            break;
        case 2:
            //travel to park
            this.travelz = false;
            this.travel(3);
            break;
        case 3:
            //travel to market
            this.travelz = false;
            this.travel(0);
            break;
        default:
            //travel to job 
            this.travelz = false;
            if (this.job === 1) {
                //this.travelz = false;
                this.travel(1);
            } else {
                //this.travelz = false;
                this.travel(2);
            }
    }
};

//decides current need to then send to the setCourse
Person.prototype.decideNeed = function () {
    //heirarchy of needs - 0.Health 1.Sleep 2.Sanity 3.Hunger 4.Wealth
    if (this.health < 10) {
        return 0;
    } else if (this.sleep < 10) {
        return 1;
    } else if (this.sanity < 10) {
        return 2;
    } else if (this.hunger < 25) {
        return 3;
    } else {
        return 4;
    }
};

//increments variables based on the internal timer created at the objects construction
Person.prototype.increment = function () {
    this.timer++;
    this.checkAge();
    this.checkModifiers();
    this.incHunger();
    //console.log("Hunger = " + this.hunger + ", ");
    this.incWealth();
    //console.log("Wealth = " + this.wealth);
    this.incSanity();
    //console.log("Sanity = " + this.sanity);
    this.incSleep();
    //console.log("Sleep = " + this.sleep);
    this.incHealth();
    //console.log("Health = " + this.health);
    //console.log("Hunger = " + this.hunger + ", Wealth = " + this.wealth + ", Sanity = " + this.sanity + ", Health = " + this.health);
    this.incAge();
};


//checks if currently in building and performing an action(eating, sleeping, etc.)
Person.prototype.checkModifiers = function () {
    //console.log("xco = " + this.xco.toFixed(2) + ", bLocX = " + this.bLocations[0][1]);
    //console.log("zco = " + this.zco.toFixed(2) + ", bLocY = " + this.bLocations[0][0]);

    //+ converts string to int and toFixed rounds a number and converts to string
    if (+this.xco.toFixed(2) === this.bLocations[0][1] && +this.zco.toFixed(2) === this.bLocations[0][0]) {
        this.eating = true;
    } else {
        this.eating = false;
    }

    if (+this.xco.toFixed(2) === this.bLocations[5][1] && +this.zco.toFixed(2) === this.bLocations[5][0]) {
        this.healing = true;
    } else {
        this.healing = false;
    }

    if (+this.xco.toFixed(2) === this.bLocations[1][1] && +this.zco.toFixed(2) === this.bLocations[1][0]) {
        this.working = true;
    } else {
        this.working = false;
    }
    if (+this.xco.toFixed(2) === this.bLocations[2][1] && +this.zco.toFixed(2) === this.bLocations[2][0]) {
        this.laboring = true;
    } else {
        this.laboring = false;
    }
    if (+this.xco.toFixed(2) === this.bLocations[3][1] && +this.zco.toFixed(2) === this.bLocations[3][0] && !this.dead) {
        this.relaxing = true;
    } else {
        this.relaxing = false;
    }
    if (+this.xco.toFixed(2) === this.bLocations[4][1] && +this.zco.toFixed(2) === this.bLocations[4][0]) {
        this.sleeping = true;
    } else {
        this.sleeping = false;
    }


};

Person.prototype.incHunger = function () {
    if (this.hunger === 0) {
        this.dead = true;
    }
    if (this.eating === false) {
        if (this.timer % 10 === 1) {
            if (this.hunger > 0) {
                this.hunger = this.hunger - 1;
            }
        }
    } else {
        if (this.timer % 2 === 1) {
            if (this.hunger < 100) {
                this.hunger = this.hunger + 1;
            } else {
                this.eating = false;
            }
        }
    }
};


Person.prototype.incSleep = function () {
    if (this.sleeping === false) {
        if (this.timer % 20 === 1) {
            if (this.sleep > 0) {
                this.sleep = this.sleep - 1;
            }
        }
    } else {
        if (this.timer % 7 === 1) {
            if (this.sleep < 100) {
                this.sleep = this.sleep + 1;
                if (this.health < 100) {
                    this.health = this.health + 1;
                }
                if (this.hunger < 100) {
                    this.hunger = this.hunger + 1;
                }
                if (this.sanity < 100) {
                    this.sanity = this.sanity + 1;
                }
            } else {
                this.sleeping = false;
            }

//            if (this.timer %20 ===1){
//                this.health = this.health+1;
//            }
        }
    }

};

Person.prototype.incHealth = function () {
    if (this.health === 0) {
        this.dead = true;
    }
    if (this.healing === false) {
        if (this.timer % 20 === 1) {
            if (this.health > 0) {
                this.health = this.health - 1;
            }
        }
    } else {
        if (this.timer % 5 === 1) {
            if (this.health < 100) {
                this.health = this.health + 1;
            } else {
                this.healing = false;
            }
        }
    }
};

Person.prototype.incAge = function () {
    this.checkAge();
    if (this.dead === false) {
        if (this.timer % 365 === 1) {
            this.age = this.age+1;
        }
    }
};

Person.prototype.incWealth = function () {
    modifier = Math.round(this.wealth / 100);
    if (this.working === false && this.laboring === false) {
        if (this.timer % 20 === 1) {
            if (this.wealth > 0) {
                this.wealth = this.wealth - 1;
            }
        }
    } else {
        //console.log("equation = " + this.timer % (20 + modifier) === 1);
        if (this.timer % (10 + modifier) === 1) {
            if (this.wealth < 1000000000) {
                this.wealth = this.wealth + 1;
            } else {
                this.working = false;
                this.laboring = false;
            }
        }
    }
};

Person.prototype.incSanity = function () {
    if (this.working === true || this.laboring === true) {
        this.relaxing = false;
        if (this.timer % 30 === 1) {
            if (this.sanity > 0) {
                this.sanity = this.sanity - 1;
            }
        }
    } else {
        if (this.relaxing === true) {
            if (this.timer % 3 === 1) {
                if (this.sanity < 100) {
                    this.sanity = this.sanity + 1;
                } else {
                    this.relaxing = false;
                }
            }
        }
    }
};

//Person.prototype.incWealth = function(){
//    if(this.xco )
//}


Person.prototype.genRandomStat = function (s) {
    var min = s;
    var max = 100;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

Person.prototype.genWealth = function () {
    var min = 0;
    var max = 1000;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

//generates 0 or 1 to coinciding with the factory or office building as the objects job
Person.prototype.genJob = function () {
    var min = 0;
    var max = 2;
    return Math.floor(Math.random() * (max - min));
};

//unexecuted function. Was inteded to have the person walk back to the street before deciding next location
Person.prototype.leaveBuilding = function () {
    if (this.xco.toFixed(2) > 0.9) {
        this.xco = this.xco - 0.1;
        if (this.xco.toFixed(2) === 0.9) {
            this.fulfilledNeed = false;
        }
    } else if (this.xco.toFixed(2) < -0.9) {
        this.xco = this.xco + 0.1;
        if (this.xco.toFixed(2) === -0.9) {
            this.inBuilding = false;
        }
    }
};

Person.prototype.toString = function () {
//        this.hunger = this.genRandomStat(50);
//    this.wealth = this.genWealth();
//    this.sanity = this.genRandomStat(50);
//    this.sleep = 100;
//    this.health = 100;//100;
    var toString = "Hello, my name is: " + this.name + "\n"
            + "I am " + this.age + " years old\n"
            + "My Current Position is: (" + this.xco.toFixed(2) + "," + this.zco.toFixed(2) + ")\n"
            + "Currently I am " + this.actionToString() + "\n"
            + "My Current Stats are as follows:\n"
            + "Health: " + this.health + "\n"
            + "Wealth: " + this.wealth + "\n"
            + "Sanity: " + this.sanity + "\n"
            + "Sleep: " + this.sleep + "\n"
            + "Hunger: " + this.hunger + "\n";
    return toString;

};

//just souts out the current action for the toString later
Person.prototype.actionToString = function () {
//    //    this.eating = false;
//    this.healing = false;
//    this.working = false;
//    this.laboring = false;
//    this.relaxing = false;
//    this.sleeping = false;
//    this.dead = false;
    if (this.eating) {
        return "eating";
    } else if (this.healing) {
        return "healing";
    } else if (this.working) {
        return "working";
    } else if (this.laboring) {
        return "laboring";
    } else if (this.relaxing) {
        return "relaxing";
    } else if (this.sleeping) {
        return "sleeping";
    } else if (this.dead) {
        return "dead";
    } else {
        return "On the move";
    }
};
//    
//    Person.prototype.getBuildingLocation = function(){
//        




