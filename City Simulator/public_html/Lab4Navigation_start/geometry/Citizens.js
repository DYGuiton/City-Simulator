//Author: D'Angelo Guiton
function Citizens(pop, blocs) {
    this.name = "citizens";

    this.population = pop;
    this.bLocations = blocs;
    this.people = [];
    this.generateCitizens();
    //this.drawCitizens();



}

//create the citizens and puts them in an array at an index
Citizens.prototype.generateCitizens = function () {
    for (i = 0; i < this.population; i++) {
        this.people[i] = new Person(this.bLocations, i);
    }
};

//draws the citizens in the canvas based on their x&z coordinates
Citizens.prototype.drawCitizens = function () {
    for (i = 0; i < this.people.length; i++) {
        this.people[i].drawPerson();
    }
};

//increments the citizens stats based on their internal timers
Citizens.prototype.incrementCitizens = function () {
    for (i = 0; i < this.people.length; i++) {
        this.people[i].increment();
        this.people[i].animPerson();
    }
};

//returns a string of the person at index p
Citizens.prototype.personToString = function(p){
    return this.people[p].toString();
};
