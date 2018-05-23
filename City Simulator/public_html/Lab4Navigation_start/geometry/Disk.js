function Disk() {
    this.name = "disk";

    var numTri = 16;
    var angle = (360 / numTri);



    this.numVertices = numTri * 3;
    this.numTriangles = this.numVertices / 3;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.texCoords = [this.numVertices];
//    this.texCoords = [this.numVertices];

    //local variables: unique vertices and colors

    // x y z alpha
    //vec4(Math.cos((num*0)*(Math.PI/180), Math.sin((num*0)*(Math.PI/180)), 0, 1.0),

    //for loop can be used instead by pushing into an array

    var uVerts = [];
    var vColors = [];
    var fNormals = [];
    var tCoords = [];


    for (var i = 0; i < numTri; i++) {
        var mod = (i % 2);
        vColors.push(vec4(mod, 1.0, 1.0, 1.0));
        vColors.push(vec4(mod, -2.0, -1.0, -1.0));
        vColors.push(vec4(mod, 1.0, 1.0, 1.0));

        uVerts.push(vec4(0, 0, 0, 1.0));
        uVerts.push(vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0));
        uVerts.push(vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0));

        tCoords.push(vec2(0.5, 0.5));
        tCoords.push(vec2(0.5 + Math.cos((angle * i) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * i) * (Math.PI / 180)) * 0.5));
        tCoords.push(vec2(0.5 + Math.cos((angle * (i + 1)) * (Math.PI / 180)) * 0.5, 0.5 + Math.sin((angle * (i + 1)) * (Math.PI / 180)) * 0.5));

//  Makes disk alternate Lighting
//        
//        var v1 = vec4(0, 0, 0, 1.0);
//        var v2 = vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0);
//        var v3 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0);
//
//        var s1 = subtract(v1, v2);
//        var s2 = subtract(v3, v2);
//        var crossed = cross(s2, s1);
//        crossed.push(0);
//        fNormals.push(crossed);
//        fNormals.push(crossed);
//        fNormals.push(crossed);


        var v4 = vec4(0, 0, -1, 1);
        var v5 = vec4(Math.cos((angle * i) * (Math.PI / 180)), Math.sin((angle * i) * (Math.PI / 180)), 0, 1.0);
        var v6 = vec4(Math.cos((angle * (i + 1)) * (Math.PI / 180)), Math.sin((angle * (i + 1)) * (Math.PI / 180)), 0, 1.0);

        var s3 = subtract(v4, v5);
        var s4 = subtract(v6, v5);
        var crossed2 = cross(s3, s4);
        crossed2.push(0);

        fNormals.push(vec4(0.0, 0.0, 1.0, 0.0));
        fNormals.push(vec4(0.0, 0.0, 1.0, 0.0));
        fNormals.push(vec4(0.0, 0.0, 1.0, 0.0));

        //fNormals.push(crossed2);
        //fNormals.push(crossed2);
        //fNormals.push(crossed2);
    }

//
//    var unique_vertices = [
//        vec4(-1.0, -1.0, 1.0, 3.0),  // v0
//        vec4(1.0, -1.0, 1.0, 1.0),   // v1
//        vec4(-1.0, 1.0, 1.0, 1.0),   // v2
//        vec4(1.0, 1.0, 1.0, 1.0),    // v3
//        vec4(-1.0, -1.0, -1.0, 1.0), // v4
//        vec4(1.0, -1.0, -1.0, 1.0),  // v5
//        vec4(-1.0, 1.0, -1.0, 1.0),  // v6
//        vec4(1.0, 1.0, -1.0, 1.0)    // v7
//        
//        
//    ];
//    
//        var vert_colors = [
//        vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
//        vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
//        vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
//        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
//        vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
//        vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
//        vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
//        vec4(0.0, 1.0, 1.0, 1.0)  // cyan    - v7
//    ];

//    var face_normals = [
//        vec4(0.0, 0.0, 1.0, 0.0),  // front
//        vec4(1.0, 0.0, -1.0, 0.0), // back
//        vec4(-1.0, 0.0, 0.0, 0.0), // left
//        vec4(1.0, 0.0, 0.0, 0.0),  // right
//        vec4(0.0, 1.0, 0.0, 0.0),  // top
//        vec4(0.0, -1.0, 0.0, 0.0)  // bottom
//    ];

/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5            -->x
/////  |/      |/              /
/////  v0------v1              z
//    var face_tex_coords = [
//        vec2(0, 1),
//        vec2(1, 1),
//        vec2(0, 0),
//        vec2(0, 0),
//        vec2(1, 1),
//        vec2(1, 0)
//    ];


    // Local variable:  Indices into the above vertices and colors arrays
    //    Don't need if have for loop
//    var indices = [
//        0, 1, 2, 2, 1, 3, // front
//        5, 4, 7, 7, 4, 6, // back
//        4, 0, 6, 6, 0, 2, // left
//        1, 5, 3, 3, 5, 7, // right
//        2, 3, 6, 6, 3, 7, // top
//        4, 5, 0, 0, 5, 1  // bottom
//    ];


    // These are the actual vertices and colors to be placed in the vertex buffers.

//    for (var i = 0; i < 16; i++) {  // 6 faces
//        norm = fNormals[i];
    for (var j = 0; j < this.numVertices; j++) {   // each face has 6 vertices (2 triangles)
        var k = i * this.numVertices + j;
//            var q = indices[k];
        this.vertices[j] = uVerts[j];
        this.colors[j] = vColors[j];
        this.normals[j] = fNormals[j];
        this.texCoords[j] = tCoords[j];
//            this.texCoords[k] = face_tex_coords[j];
    }
}
//}


