/*+--------------------------------------------------------------------------------------+
  |    2nd Laboratory Delivery - Computer Graphics 2020 - Instituto Superior Técnico     |
  +--------------------------------------------------------------------------------------+
  |                          David Miranda nº 93697 Group 10                             |
  |                         João Salgueiro nº 93725 Group 10                             |
  +--------------------------------------------------------------------------------------+*/

var scene, camera, renderer, helper, cameraTop, activeCamera, cameraSide;
var geometry, material, materialGreen,materialBrown, materialWhite, retangle, group, materialBlack;
var stick1, stick2, stick3, stick4, stick5, stick6;
var ball1, ball2, ball3, ball4, ball5, ball6, balltest;
var ViewSize = 50;
var raio = 0.5;
var alturaMesa = 2.2;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
var clock = new THREE.Clock();
var speed = 5; //units a second
var delta = 0; //starts time at 0
var cue1,cue2,cue3,cue4,cue5,cue6,group; //groups
var pivotPoint1,pivotPoint2,pivotPoint3,pivotPoint4,pivotPoint5,pivotPoint6;
var vectorBalls = [];
var vectorPivots = [];
var vectorSticks = [];
var vectorHoles = [];
var testVec;
var testVec2 = new THREE.Vector3(0,1.5,-9);
var pass = 0;
var vecNo = new THREE.Vector3(120,120,120);
var ang = 0;
var numberOfRandomBalls = 15;
var vecRotation = new THREE.Vector3(0,0,raio);
var vecRotation2 = new THREE.Vector3(0,0,-raio);
var randomPositions = [];
var line1 = [], line2 = [], line3 = [], line4 = [];
var test;

function createRenderer()
{
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);              
    document.body.appendChild(renderer.domElement);

}
function createCamera()
{
    camera = new THREE.OrthographicCamera(-aspect*ViewSize / 2, aspect*ViewSize / 2, ViewSize / 2, -ViewSize / 2, - 1000, 1000);
    camera.rotation.x = -Math.PI / 2;
    camera.position.set(0,5,0);
    activeCamera = camera;
    scene.add(camera);
}
function createCameraTop()
{
    cameraTop = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 1000 );
    cameraTop.position.set(30,30,25);
    cameraTop.rotation.x = -Math.PI / 4;
    cameraTop.rotation.y = +Math.PI / 4;
    cameraTop.rotation.z = +Math.PI / 4;
    scene.add(cameraTop);
}
function createCameraSide()
{
    cameraSide = new THREE.OrthographicCamera(-aspect*ViewSize / 2, aspect*ViewSize / 2, ViewSize / 2, -ViewSize / 2, - 1000, 1000);
    cameraSide.rotation.y = Math.PI / 2;
    cameraSide.position.set(0,5,0);
    scene.add(cameraSide);
}
function initRandom(){
    randomPositions[0] = line1;
    randomPositions[1] = line2;
    randomPositions[2] = line3;
    randomPositions[3] = line4;


    for(i = 0; i < 4; i++){
        for(j = 0; j < 7; j++){
            randomPositions[i][j] = 0;
        }
    }

}
function createRandom(){
    var num = 0, r;
    test = 0;
    while(test != numberOfRandomBalls){
        for(i=0; i < 4; i++){
            for(j = 0; j < 7; j++){
                r = Math.floor(Math.random() * 11);
                if(r < 5 && randomPositions[i][j] == 0 && test <= numberOfRandomBalls){
                    randomPositions[i][j] = 1;
                    test++;
                    if(test == numberOfRandomBalls){
                        return;
                    }
                }
            }
        }
    }
}
function defineBall(){
    geometry = new THREE.SphereGeometry(raio,32,32);
}
function defineRetangleSmall()
{
    geometry= new THREE.BoxGeometry(15,alturaMesa,0.3);
}
function defineRetangleBig()
{
    geometry = new THREE.BoxGeometry(0.3,alturaMesa,30);
}
function defineBottomTable()
{
    geometry = new THREE.BoxGeometry(15,1,30);
}
function defineStick()
{
    geometry = new THREE.CylinderGeometry(0.25,0.125,10,64);
}
function createHole(xCord,yCord,zCord,rotation,r){
    hole = new THREE.Mesh(geometry, materialBlack);
    hole.position.x = xCord;
    hole.position.y = yCord;
    hole.position.z = zCord;

    hole.rotation.y += rotation;
    hole.userData = {raio : r};

    vectorHoles.push(hole);
    group.add(hole);
}

function createRetangle(xCord, yCord, zCord,type) //deitado = 1 : tube lies down (45º Rotation)
{
    if(type == 1)
    {
        retangle = new THREE.Mesh(geometry, materialBrown);
    }
    else if(type == 2)
    {
        retangle = new THREE.Mesh(geometry, materialBrown);
    }
    else if(type == 3)
    {
        retangle = new THREE.Mesh(geometry, materialGreen);
    }
    retangle.position.x = xCord;
    retangle.position.y = yCord;
    retangle.position.z = zCord;
    group.add(retangle);
}
function defineLegs()
{
    geometry = new THREE.CylinderGeometry(2,2,15,64);
}
function defineHole1()
{
    geometry = new THREE.CylinderGeometry(2,2,1.1,64,0,false,0,1.6);
}
function defineHole2()
{
    geometry = new THREE.CylinderGeometry(1.5,1.5,1.1,64,0,false,0,3.2);
}
function createLegs(xCord,yCord,zCord)
{
    leg =  new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,10,64), materialBrown);
    leg.position.x = xCord;
    leg.position.y = yCord;
    leg.position.z = zCord;

    group.add(leg);
}
function createStick(xCord, yCord, zCord, type) //deitado = 1 : tube lies down (45º Rotation)
{
    stick = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x003297}));
    stick.position.x = xCord;
    stick.position.y = yCord;
    stick.position.z = zCord;
    if (type == 0){
        stick.rotation.z = -Math.PI / 2.5;
    }
    else if (type == 1)
    {
        stick.rotation.x = Math.PI / 2.5;
    }
    else if (type == 2)
    {
        stick.rotation.z = Math.PI / 2.5;
    }
    else if (type == 3)
    {
        stick.rotation.x = -Math.PI / 2.5;
    }

    vectorSticks.push(stick);
}

function createBall(xCord, yCord, zCord){
    ball = new THREE.Mesh(geometry, materialWhite);

    ball.position.x = xCord;
    ball.position.y = yCord;
    ball.position.z = zCord;
    ball.userData = {momentum: 0, collision: -1 ,direction: new THREE.Vector3(0,0,0), falling : false};

    vectorBalls.push(ball);
    scene.add(ball);

    return ball;
}
function initTable(){
    defineLegs();
    createLegs(7,-4.5,14.5);
    createLegs(7,-4.5,-14.5);
    createLegs(-7,-4.5,-14.5);
    createLegs(-7,-4.5,14.5);

    defineHole1();
    createHole(-7.5,0.5,-15, 0,2);
    createHole(-7.5,0.5, 15, Math.PI /2,2);
    createHole(7.5,0.5, 15, Math.PI ,2);
    createHole(7.5,0.5, -15, - 5 * (Math.PI/2) ,2);

    defineHole2();
    createHole(-7.5,0.5,0, 0,1.5);
    createHole(7.5,0.5,0, Math.PI,1.5);

    defineRetangleSmall();
    createRetangle(0,1.1,-15,1);
    createRetangle(0,1.1,15,1);

    defineRetangleBig();
    createRetangle(-7.5,1.1,0,2);
    createRetangle(7.5,1.1,0,2);

    defineBottomTable();
    createRetangle(0,0.5,0,3);
    scene.add(group);
}
function initPivots(num)
{
    while( num > 0)
    {
        pivotPoint = new THREE.Object3D();
        pivotPoint.userData = {selected: 0, onShootPosition: true};
        vectorPivots.push(pivotPoint)
        num--;
    }
}
function unitePivotStick()
{
    vectorPivots[0].add(vectorSticks[0]);
    vectorPivots[0].position.set(6,alturaMesa,-7.5);
    vectorPivots[1].add(vectorSticks[1]);
    vectorPivots[1].position.set(-6,alturaMesa,-7.5);
    vectorPivots[2].add(vectorSticks[2]);
    vectorPivots[2].position.set(6,alturaMesa,7.5);
    vectorPivots[3].add(vectorSticks[3]);
    vectorPivots[3].position.set(-6,alturaMesa,7.5);
    vectorPivots[4].add(vectorSticks[4]);
    vectorPivots[4].position.set(0,alturaMesa,12);
    vectorPivots[5].add(vectorSticks[5]);
    vectorPivots[5].position.set(0,alturaMesa,-12); 
}
function initCues(){
    defineStick();
    initPivots();
    initPivots(6);

    createStick(5.5,1.5,0,0);
    createStick(-5.5,1.5,0,2);
    createStick(5.5,1.5,0,0);
    createStick(-5.5,1.5,0,2);
    createStick(0,1.6,7.5,1);
    createStick(0,1.6,-7.5,3);

    unitePivotStick();
   
    // Pivot points
    //cue1.add(pivotPoint1);
    scene.add(vectorPivots[0]);
    scene.add(vectorPivots[1]);
    scene.add(vectorPivots[2]);
    scene.add(vectorPivots[3]);
    scene.add(vectorPivots[4]);
    scene.add(vectorPivots[5]);
    
    /*scene.add(stick2);
    scene.add(stick3);
    scene.add(stick4);
    scene.add(stick5);
    scene.add(stick6);*/
}
function createRandomBalls(){
    var x = -3, z = -6;

    for(i = 0; i < 4; i++){
        z = -6;
        for(j = 0; j < 7; j++){
            if(randomPositions[i][j] == 1){
                createBall(x, 1 + raio, z);
            }
            z += 2;
        }
        x += 2;
    }
}

function initBalls(){
    defineBall();
    createBall(6,1 + raio,-7.5);//Ball0
    createBall(-6,1 + raio,-7.5);//Ball1
    createBall(6,1 + raio,7.5);//Ball2
    createBall(-6,1 + raio,7.5);//Ball3
    createBall(0,1 + raio,14);//Ball4
    createBall(0,1 + raio,-14);//Ball5

    createRandomBalls();

    /*scene.add(ball1);
    scene.add(ball2);
    scene.add(ball3);
    scene.add(ball4);
    scene.add(ball5);
    scene.add(ball6);*/
}

function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        activeCamera.aspect = window.innerWidth / window.innerHeight;
        activeCamera.updateProjectionMatrix();
    }
}

function onKeyDown(e) { //KeyPressed
    
    switch (e.keyCode) {
    case 32://SPACE
        shootBalls();
        break;
    case 49://1
        activeCamera = camera;
        break;
    case 50://2
        activeCamera = cameraTop;
        break;
    case 51://3
        activeCamera = cameraSide;
        break;
    case 52: //4
        vectorPivots[0].userData.selected ^= 1;//XOR operation
        break;
    case 53: //5
        vectorPivots[1].userData.selected ^= 1;//XOR operation
        break;
    case 54: //6
        vectorPivots[2].userData.selected ^= 1;//XOR operation
        break;
    case 55: //7
        vectorPivots[3].userData.selected ^= 1;//XOR operation
        break;
    case 56: //8
        vectorPivots[4].userData.selected ^= 1;//XOR operation
        break;
    case 57: //9
        vectorPivots[5].userData.selected ^= 1;//XOR operation
        break;
    //---------------------------------------------------------
   case 37: // Left key
        if(ang >= -60 && ang <= 60){
            for(i = 0; i < 6; i++){
                if(vectorPivots[i].userData.selected == 1){
                    if(ang < Math.PI/3){
                        vectorPivots[i].rotation.y += (2*Math.PI/3) * delta;
                        ang += (2*Math.PI/3) * delta;
                    }
                }
            }
        }
        break;
    case 39: // Left key
        if(ang >= -60 && ang <= 60){
            for(i = 0; i < 6; i++){
                if(vectorPivots[i].userData.selected == 1){
                    if(ang >= -Math.PI/3){
                        vectorPivots[i].rotation.y -= (2*Math.PI/3) * delta;
                        ang -= (2*Math.PI/3) * delta;
                    }
                }
            }
        }
        break
    //---------------------------------------------------------
    case 69:  //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;

    case 81://Q
        pivotPoint1.rotation.y += 0.05;
        break;
    
    }
}

/*function onKeyUp(e) { 
    switch (e.keyCode) {
    }
}*/
function createScene()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080); //light blue
    scene.add(new THREE.AxisHelper(50));  //Axis with 50 length
}

function shootBalls(){/Determina as bolas/
    var i, dir = new THREE.Vector3();
    for(i = 0; i < 6; i++)
    {
        if(vectorPivots[i].userData.selected == 1)
        {
            centerBall = getCenterPoint(vectorBalls[i]);
            //window.alert("Center BOLA:" + i + "->"+ "x" + centerBall.getComponent(0)+ "y" + centerBall.getComponent(1)+ "Z" + centerBall.getComponent(2));
            centerCue = getCenterPointStick(vectorSticks[i]);
            centerCue.setY(1.5);/*Ficar da mesma altura da bola de snooker*/

            vectorBalls[i].userData.direction.copy(dir.subVectors(centerBall,centerCue).normalize());
            dir.subVectors(centerBall,centerCue).normalize()
            //window.alert("direction bola:" + i + "->"+ "x" + dir.getComponent(0)+ "y" + dir.getComponent(1)+ "Z" + dir.getComponent(2));
            shootBall(i);
        }
        //window.alert("new ball");
    }
    //window.alert("BOLA:" + 0 + "->"+ "x" + vectorBalls[0].userData.direction.getComponent(0)+ "y" + vectorBalls[0].userData.direction.getComponent(1)+ "Z" + vectorBalls[0].userData.direction.getComponent(2));
    //window.alert("BOLA:" + 5 + "->"+ "x" + vectorBalls[5].userData.direction.getComponent(0)+ "y" + vectorBalls[5].userData.direction.getComponent(1)+ "Z" + vectorBalls[5].userData.direction.getComponent(2));
}
function shootBall(num){/*bolas vao de 0-5 || Tacos n voltam para tras*/
    if(vectorPivots[num].userData.onShootPosition == true){
        vectorPivots[num].userData.onShootPosition = false;
        vectorBalls[num].userData.momentum = 100 * delta;
    }
    vectorPivots[num].userData.selected = 0;
    /*vectorPivots[num].position.z -= 0.5;*/
}

function getCenterPointStick(mesh) {/*Funcao so funciona depois de se fazer render IDKW*/
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
    mesh.localToWorld( middle );
    return middle;
}
function getCenterPoint(mesh) {/*Funcao so funciona depois de se fazer render IDKW*/
    
    return new THREE.Vector3(mesh.position.x,1+raio, mesh.position.z);
}
function checkBallCollision(collisionCenter, center)/*raio sera o raio da bolas standart*/
{

    return (collisionCenter.distanceToSquared(center) <= (raio*raio*4)) && (collisionCenter.equals(center) == false);
}
/*function translateOnAxisSphere(ball,vec, distance)
{
    ball.position.x += vec.getComponent(0)*distance;
    ball.position.y += vec.getComponent(1)*distance;
    ball.position.z += vec.getComponent(2)*distance;
}*/
function correctBallPosition(ball, collisionBall)
{
    var collisionCenter;
    var center, vecTrans;
    var vecTrans;
    var vecNull = new THREE.Vector3(0,0,0);
    vecTrans = ball.userData.direction;
    if(vecTrans.equals(vecNull))
    {
        vecTrans = collisionBall.userData.direction.negate();/*Dar um vetor de movimento para a bola*/
    }
    collisionCenter = getCenterPoint(collisionBall);
    //window.alert("x" + vecTrans.getComponent(0) + "z" + vecTrans.getComponent(2));
    center = getCenterPoint(ball);
    center.addScaledVector(vecTrans,-0.1);
    ball.translateOnAxis(vecTrans,-0.1);
    while(checkBallCollision(collisionCenter, center) == true)
    {
        center.addScaledVector(vecTrans,-0.1);
        ball.translateOnAxis(vecTrans,-0.1);
    }
    center.addScaledVector(vecTrans,0.1);//Para voltar a estar em contacto com a colllision ball
    ball.translateOnAxis(vecTrans,0.1);
    //window.alert("x" + collisionCenter.getComponent(0)+ "y" + collisionCenter.getComponent(1)+ "Z" + collisionCenter.getComponent(2));
    //window.alert("x" + center.getComponent(0)+ "y" + center.getComponent(1)+ "Z" + center.getComponent(2));
    return center;
}

function checkPointColision(ball, collisionBall)
{
    var rad = 0.0174533;/*Precisao de 1 grau*/
    var startAngle = 0;
    var i,e;
    var x1,x2,z1,z2,cx,cy, cx2,cy2;
    var bufferVec,realVec;
    var ballPoints = [];
    var collisionBallPoints = [];
    var candidates = [];
    var collisionCenter;
    var center;
    
    center = correctBallPosition(ball,collisionBall);/*A bola foi a que colidiu*/
    //window.alert("tenho real center");
    collisionCenter = getCenterPoint(collisionBall);
    cx = center.getComponent(0);
    cy = center.getComponent(2);
    //window.alert(cy+0.5);
    cx2 = collisionCenter.getComponent(0);
    cy2 = collisionCenter.getComponent(2);

    for(i = 0; i < 360; i++)/* Criar todos os pontos das duas esferas no plano y = 1 + raio (zona de intersecao)*/
    {
        x1 = Math.round((cx + raio*Math.cos(startAngle + rad))*100) / 100;
        z1 = Math.round((cy + raio*Math.sin(startAngle + rad))*100) / 100;
        //x1 = cx + raio*Math.cos(startAngle + rad);
        //z1 = cy + raio*Math.sin(startAngle + rad);
        bufferVec = new THREE.Vector3(x1, 1 + raio,z1);
        ballPoints.push(bufferVec);


        x2 = Math.round((cx2 + raio*Math.cos(startAngle + rad))* 100) /100;
        z2 = Math.round((cy2 + raio*Math.sin(startAngle + rad))*100) /100;
        //x2 = cx2 + raio*Math.cos(startAngle + rad);
        //z2 = cy2 + raio*Math.sin(startAngle + rad);
        bufferVec = new THREE.Vector3(x2, 1 + raio,z2);
        collisionBallPoints.push(bufferVec);
        startAngle += rad;
    }
    for(i = 0; i < 360; i++)
    {
        for(e = 0; e < 360; e++)
        {
            /*window.alert("YO Z:" + collisionBallPoints[e].getComponent(2));*/
            if(ballPoints[i].equals(collisionBallPoints[e]))
            {
                candidates.push(ballPoints[i]);
                
            }
        }
    }
    realVec = calculateRealVec(candidates);
    return realVec;
}
function calculateRealVec(candidates)
{
    var x = 0,z = 0,i;
    var length = candidates.length;/*Fazer media*/
    for(i = 0; i < length; i++)
    {
        x += candidates[i].getComponent(0);
        z += candidates[i].getComponent(2);
    }
    //window.alert("YOYOYO"+"x"+x/length+"z"+z/length);
    return new THREE.Vector3(x/length,1 + raio, z/length);

}
/*function updateCollisionBallStats(collisionBall, point,momentum)
{
    var dir = new THREE.Vector3();
    var center = getCenterPoint(collisionBall);
    dir.subVectors(center,point).normalize();
    collisionBall.userData.direction = dir;
    collisionBall.userData.momentum = 0.6;
}*/
//COLISION WITH WALL (REFLECTS VECTOR)
function reflectsVector(vector, wallNum){
    if(wallNum == 1){ // Z axis Wall
        vector.setComponent(0, -vector.getComponent(0));
    }
    if(wallNum == 2){ //X axis Wall
       vector.setComponent(2, -vector.getComponent(2));
    }
    return vector;
}
function updateBallStats(ball, point,momentum)
{
    var dir = new THREE.Vector3();
    var center = getCenterPoint(ball);
    
    dir.subVectors(center,point).normalize();
    //window.alert("X" + dir.getComponent(0)+ "Y" + dir.getComponent(1)+ "Z" + dir.getComponent(2));
    ball.userData.direction = dir;
    ball.userData.momentum = momentum /2;
}

function colideWall(ball){
    center = getCenterPoint(ball);

    if(center.getComponent(0) - raio <= -7.15){
        ball.position.x = -7.15 + raio;
        ball.userData.direction.copy(reflectsVector(ball.userData.direction, 1));
        //window.alert();
    }
    if(center.getComponent(0) + raio >= 7.65){
        ball.position.x = 7.65 - raio;;
        ball.userData.direction.copy(reflectsVector(ball.userData.direction, 1));
        //window.alert();
    }
    if(center.getComponent(2) + raio >= 15.15){
        ball.position.z = 15.15 - raio;
        ball.userData.direction.copy(reflectsVector(ball.userData.direction, 2));
        //window.alert();
    }
    if(center.getComponent(2) - raio <= -14.85){
        ball.userData.direction.copy(reflectsVector(ball.userData.direction, 2));
        ball.position.z = -14.85 + raio;
        //window.alert();
    }
}

function fallIntoHole(ball){
    for(i = 0 ; i < 6; i++){
        if(checkBallCollision(getCenterPoint(vectorHoles[i]), getCenterPoint(ball).addScaledVector(ball.userData.direction, raio)) && ball.userData.falling == false){
            ball.userData.direction.copy(new THREE.Vector3(0,-1,0));
            ball.userData.falling = true;
        }

    }
}

function colideBall(ball)
{
    var i, collisionCenter, center,collisionPoint,mom;
    center = getCenterPoint(ball);

    fallIntoHole(ball);
    center = getCenterPoint(ball);
    colideWall(ball);
    center = getCenterPoint(ball);

    for(i = 0; i < 21; i++)
    {
        collisionCenter = getCenterPoint(vectorBalls[i]);
        if(checkBallCollision(collisionCenter, center))
        {
            /*window.alert(center.getComponent(0)+"z"+ center.getComponent(2));
            window.alert(collisionCenter.getComponent(0)+"z"+ collisionCenter.getComponent(2));
            window.alert(i + "PUTAS"+collisionCenter.equals(center)+":"+(collisionCenter.distanceTo(center) <= (raio*2)));*/

            if(ball.userData.collision == -1){
                //window.alert("ye");
                ball.userData.collision = i;
                vectorBalls[i].userData.collision = i;
                collisionPoint = checkPointColision(ball,vectorBalls[i]);
                //window.alert("tenho collisionPoint");
                if(ball.userData.momentum > vectorBalls[i].userData.momentum){
                    mom =  ball.userData.momentum;
                }
                else{
                    mom = vectorBalls[i].userData.momentum;
                }
                updateBallStats(vectorBalls[i], collisionPoint,mom);//update collision ball
                updateBallStats(ball, collisionPoint,mom);
                //window.alert("saiu");
                return ;
            }
        }
    }

    return vecNo;/*Nao ha colisao*/
}
function init() {
    materialWhite = new THREE.MeshBasicMaterial({color: 0xffffff});
    materialBrown = new THREE.MeshBasicMaterial({color: 0x35281E});
    materialGreen = new THREE.MeshBasicMaterial({color: 0x0a6c03});
    materialBlack = new THREE.MeshBasicMaterial({color: 0x000000});
    group = new THREE.Group();

    initRandom();
    createRandom();

    //window.alert(test);

    createScene();
    createRenderer();
    createCamera();
    createCameraTop();
    createCameraSide();

    initCues();
    initTable();
    initBalls();


    renderer.render(scene,activeCamera);/*Tirar depois!!!!!*/

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}
function changeCuesColor()
{
    for(i = 0; i < 6; i++)
    {
        if (vectorPivots[i].userData.selected == 1){
            vectorSticks[i].material.color.setHex(0x8b0000);
        }
        else
        {
            vectorSticks[i].material.color.setHex(0x003297);
        }
    }
}
function updateBallPosition(ball)
{ 

    //MISSING ROTATION
    ball.position.x += ball.userData.momentum*ball.userData.direction.getComponent(0);
    ball.position.z += ball.userData.momentum*ball.userData.direction.getComponent(2);
    if(ball.userData.falling){
        ball.position.y += ball.userData.momentum*ball.userData.direction.getComponent(1);
        //window.alert(ball.userData.direction.getComponent(1));
        //window.alert(ball.userData.momentum);
    }
    else{
        ball.position.y = 1 + raio;
    }
}
function updateBallAnimation(ball)
{
    updateBallPosition(ball);
    ball.rotation.z += (2+ball.userData.momentum) / raio;
    ball.rotation.x += (2+ball.userData.momentum) / raio; /*roda em funcao do raio da bola*/
    if(ball.userData.falling == false){
        ball.userData.momentum = ball.userData.momentum/1.03;
    }
}
function updateWhiteBalls()
{
    var i;
    for(i = 0; i < 21; i++)
    {
        updateBallAnimation(vectorBalls[i]);
    }
}
function updateBalls(){  /*Tem de dizer que o onShootPosition passa para 0*/
    updateWhiteBalls();
}
function resetCollisionFlag(){ 
    var i;
    for(i = 0; i < 21; i++)
    {
        vectorBalls[i].userData.collision = -1;
    }

}
function update()
{
    var vec,i;
    // Update nos Selected Cues
    changeCuesColor();
    //updateSticks();
    for(i = 0; i < 21; i++){
        colideBall(vectorBalls[i]);
    }
    updateBalls();
    resetCollisionFlag();

    /*vectorBalls[5].position.z += 2 * momentum[5];
    momentum[5] = momentum[5]/1.10;
    vec = colideBall(vectorBalls[5]);
    if(vec.equals(vecNo) == false)
    {
        window.alert("YEEEEEEE");
    }*/
} 

function animate() {
    delta = clock.getDelta(); //obtains current time
    update();
    renderer.render(scene,activeCamera);
    requestAnimationFrame(animate);
}
