function Cylinder() {
    this.name = "cone";

    var numTri = 256;
    var angle = (360 / (numTri / 4));



    this.numVertices = numTri * 3;
    this.numTriangles = this.numVertices / 3;
    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.texCoords = [this.numVertices];


    var uVerts = [];
    var vColors = [];
    var fNormals = [];
    var tCoords = [];




    for (var i = 0; i < (numTri / 2); i++) {
        var mod = (i % 2);

//Disk 1(Upper Disk)

        vColors.push(vec4(0.0, 0.0, 0.0, 1.0));
        vColors.push(vec4(mod, -2.0, -1.0, -1.0));
        vColors.push(vec4(mod, 1.0, 1.0, 1.0));

        uVerts.push(vec4(0, 0, 1, 1.0));
        uVerts.push(vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 1, 1.0));
        uVerts.push(vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 1, 1.0));

        tCoords.push(vec2(0.5, 0.5));
        tCoords.push(vec2(0.5 + Math.cos((angle * i) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * i) * (Math.PI / 180)) * 0.5));
        tCoords.push(vec2(0.5 + Math.cos((angle * (i + 1)) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * (i + 1)) * (Math.PI / 180)) * 0.5));


        var v1 = vec4(0, 0, 1, 1);
        var v2 = vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0);
        var v3 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0);

        var s1 = subtract(v1, v2);
        var s2 = subtract(v3, v2);
        var crossed2 = cross(s2, s1);
        crossed2.push(0);

        fNormals.push(vec4(0.0, 0.0, 1.0, 0.0));
        fNormals.push(vec4(0.0, 0.0, 1.0, 0.0));
        fNormals.push(vec4(0.0, 0.0, 1.0, 0.0));

//        fNormals.push(crossed2);
//        fNormals.push(crossed2);
//        fNormals.push(crossed2);


//Disk 2 (Lower Disk)

        vColors.push(vec4(0.0, 0.0, 0.0, 1.0));
        vColors.push(vec4(mod, -2.0, -1.0, -1.0));
        vColors.push(vec4(mod, 1.0, 1.0, 1.0));

        uVerts.push(vec4(0, 0, -1, 1.0));
        uVerts.push(vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), -1, 1.0));
        uVerts.push(vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), -1, 1.0));

        tCoords.push(vec2(0.5, 0.5));
        tCoords.push(vec2(0.5 + Math.cos((angle * i) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * i) * (Math.PI / 180)) * 0.5));
        tCoords.push(vec2(0.5 + Math.cos((angle * (i + 1)) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * (i + 1)) * (Math.PI / 180)) * 0.5));


        var v1 = vec4(0, 0, -1, 1);
        var v2 = vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0);
        var v3 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0);

        var s1 = subtract(v1, v2);
        var s2 = subtract(v3, v2);
        var crossed2 = cross(s1, s2);
        crossed2.push(0);
        
        fNormals.push(vec4(0.0, 0.0, -1.0, 0.0));
        fNormals.push(vec4(0.0, 0.0, -1.0, 0.0));
        fNormals.push(vec4(0.0, 0.0, -1.0, 0.0));

//        fNormals.push(crossed2);
//        fNormals.push(crossed2);
//        fNormals.push(crossed2);

//Cylinder
        vColors.push(vec4(0.0, 0.0, 0.0, 1.0));
        vColors.push(vec4(mod, -2.0, -1.0, -1.0));
        vColors.push(vec4(mod, 1.0, 1.0, 1.0));

        uVerts.push(vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 1, 1.0));
        uVerts.push(vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), -1, 1.0));
        uVerts.push(vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), -1, 1.0));

        tCoords.push(vec2(((angle * i) / 360), 1));
        tCoords.push(vec2(((angle * i) / 360), 0));
        tCoords.push(vec2(((angle * (i + 1)) / 360), 0));
//        tCoords.push(vec2(0.5, 0.5));
//        tCoords.push(vec2(0.5 + Math.cos((angle * i) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * i) * (Math.PI / 180)) * 0.5));
//        tCoords.push(vec2(0.5 + Math.cos((angle * (i + 1)) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * (i + 1)) * (Math.PI / 180)) * 0.5));


        var v1 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), -1, 1.0);
        var v2 = vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0);
        var v3 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0);

        var s1 = subtract(v1, v2);
        var s2 = subtract(v3, v2);
        var crossed2 = cross(s1, s2);
        crossed2.push(0);

        fNormals.push(crossed2);
        fNormals.push(crossed2);
        fNormals.push(crossed2);

        vColors.push(vec4(0.0, 0.0, 0.0, 1.0));
        vColors.push(vec4(mod, -2.0, -1.0, -1.0));
        vColors.push(vec4(mod, 1.0, 1.0, 1.0));

        uVerts.push(vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), -1, 1.0));
        uVerts.push(vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 1, 1.0));
        uVerts.push(vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 1, 1.0));

        tCoords.push(vec2((angle * i) / 360, 0));
        tCoords.push(vec2(((angle * i) / 360), 1));
        tCoords.push(vec2(((angle * (i + 1)) / 360), 1));



        var v1 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), -1, 1.0);
        var v2 = vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0);
        var v3 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0);

        var s1 = subtract(v1, v2);
        var s2 = subtract(v3, v2);
        var crossed2 = cross(s1, s2);
        crossed2.push(0);

        fNormals.push(crossed2);
        fNormals.push(crossed2);
        fNormals.push(crossed2);


    }

//    for (var i = 0; i < 1; i++) {
//        norm - fNormals[i];
    for (var j = 0; j < this.numVertices; j++) {
        var k = i * this.numVertices + j;
        this.vertices[j] = uVerts[j];
        this.colors[j] = vColors[j];
        this.normals[j] = fNormals[j];
        this.texCoords[j] = tCoords[j];

    }
}
//}


