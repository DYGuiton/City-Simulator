function Pyramid() {

    this.name = "pyramid";

    this.numVertices = 18;
    this.numTriangles = this.numVertices / 3;

    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

    var scale = 1;
    var scaleh = scale/2;
    
    this.vertices.push(vec4(-scaleh,0,-scaleh,1));
    this.vertices.push(vec4(scaleh,0,-scaleh,1));
    this.vertices.push(vec4(scaleh,0,scaleh,1));
    
    this.texCoords.push(vec2(0,0));
    this.texCoords.push(vec2(1,0));
    this.texCoords.push(vec2(1,1));
    
    this.normals.push(vec4(0,-1,0,0));
    this.normals.push(vec4(0,-1,0,0));
    this.normals.push(vec4(0,-1,0,0));
    
    this.vertices.push(vec4(-scaleh,0,-scaleh,1));
    this.vertices.push(vec4(-scaleh,0,scaleh,1));
    this.vertices.push(vec4(scaleh,0,scaleh,1));
    
    this.texCoords.push(vec2(0,0));
    this.texCoords.push(vec2(0,1));
    this.texCoords.push(vec2(1,1));
    
    this.normals.push(vec4(0,-1,0,0));
    this.normals.push(vec4(0,-1,0,0));
    this.normals.push(vec4(0,-1,0,0));
    
    
    
    
    
    
    
    
    
    normalized = 0.707107;
    
    
    
    this.vertices.push(vec4(scaleh,0,scaleh,1));
    this.vertices.push(vec4(-scaleh,0,scaleh,1));
    this.vertices.push(vec4(0,scaleh,0,1));
    
    this.texCoords.push(vec2(1,1));
    this.texCoords.push(vec2(0,1));
    this.texCoords.push(vec2(0.5,0.5));
    
    this.normals.push(vec4(0,normalized,normalized,0));
    this.normals.push(vec4(0,normalized,normalized,0));
    this.normals.push(vec4(0,normalized,normalized,0));
    
    this.vertices.push(vec4(scaleh,0,scaleh,1));
    this.vertices.push(vec4(scaleh,0,-scaleh,1));
    this.vertices.push(vec4(0,scaleh,0,1));
    
    this.texCoords.push(vec2(1,1));
    this.texCoords.push(vec2(1,0));
    this.texCoords.push(vec2(0.5,0.5));
    
    this.normals.push(vec4(normalized,normalized,0,0));
    this.normals.push(vec4(normalized,normalized,0,0));
    this.normals.push(vec4(normalized,normalized,0,0));
    
    this.vertices.push(vec4(-scaleh,0,-scaleh,1));
    this.vertices.push(vec4(-scaleh,0,scaleh));
    this.vertices.push(vec4(0,scaleh,0,1));
    
    this.texCoords.push(vec2(0,0));
    this.texCoords.push(vec2(0,1));
    this.texCoords.push(vec2(0.5,0.5));
    
    this.normals.push(vec4(-normalized,normalized,0,0));
    this.normals.push(vec4(-normalized,normalized,0,0));
    this.normals.push(vec4(-normalized,normalized,0,0));
    
    this.vertices.push(vec4(-scaleh,0,-scaleh,1));
    this.vertices.push(vec4(scaleh,0,-scaleh,1));
    this.vertices.push(vec4(0,scaleh,0,1));
    
    this.texCoords.push(vec2(0,0));
    this.texCoords.push(vec2(1,0));
    this.texCoords.push(vec2(0.5,0.5));
    
    this.normals.push(vec4(0,normalized,-normalized,0));
    this.normals.push(vec4(0,normalized,-normalized,0));
    this.normals.push(vec4(0,normalized,-normalized,0));
    
    while (this.colors.length < this.vertices.length){
        this.colors.push(vec4(1,1,1,1));
    }
    
}