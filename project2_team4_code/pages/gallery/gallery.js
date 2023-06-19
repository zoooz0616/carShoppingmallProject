import * as THREE from 'https://cdn.skypack.dev/three@0.141.0';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#canvas')
const scene = new THREE.Scene();
const modelsGroup = new THREE.Group();
const offModelsGroup = new THREE.Group();
const rotateModelsGroup = new THREE.Group();
const loader = new GLTFLoader();

scene.background = new THREE.Color('black');

const audio = new Audio('mus/ooo.mp3');
const boss = new Audio('mus/Boss.mp3');

// 카메라 초기 세팅 원근법 적용 카메라
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -0.06771666913410496;
camera.position.y = 1.237100160170268;
camera.position.z = 8.96478439413133;
const renderer = new THREE.WebGLRenderer({
    canvas : canvas,
    antialias : true,
    alpha : true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 1.2;// 마우스로 카메라를 회전시킬 속도입니다.
controls.zoomSpeed = 1.4;// 마우스 휠로 카메라를 줌 시키는 속도 입니다.

controls.addEventListener('end', () => {
    console.log('Camera Position:', camera.position.x, camera.position.y, camera.position.z);
});

var keyboard = {};
// 키보드 이벤트 리스너 등록
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

rotateModelsGroup.position.set(3, 0, 0);

renderer.domElement.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(rotateModelsGroup.children, true);
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const clickedObjectIndex = clickedObject.parent;
        console.log('Clicked object index:', clickedObjectIndex.name); //3d 객체를 특정할 수 있다.
    }
}

const lightOnGlbFiles = [
    {path: 'img/toyota_supra_mk5_a90.glb', x: -19.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/porsche_911_turbo_996_2000_by_alex.ka..glb', x: -16.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/maserati_ghibli_hybrid.glb', x: -14, y: 0, z: 3.45, yaw: 0},
    {path: 'img/jiotto_caspita_f1_road_car_1989_by_alex.ka..glb', x: -11, y: 0, z: 3.45, yaw: 0},
    {path: 'img/lamborghini_centenario_lp-770_interior_sdc.glb', x: -8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/jiottoLightOn.glb', x: -4.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/lightTest.glb', x: -1.58, y: 0, z: 3.45, yaw: 0},
    {path: 'img/puple.glb', x: 1.58, y: 0, z: 3.45, yaw: 0},
    {path: 'img/lamborghini_centenario_roadster_sdc.glb', x: 4.6, y: 0, z: 3.45, yaw: 0},
];

const lightOffGlbFiles = [
    {path: 'img/toyota_supra_mk5_a90.glb', x: -19.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/porsche_911_turbo_996_2000_by_alex.ka..glb', x: -16.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/maserati_ghibli_hybrid.glb', x: -14, y: 0, z: 3.45, yaw: 0},
    {path: 'img/jiotto_caspita_f1_road_car_1989_by_alex.ka..glb', x: -11, y: 0, z: 3.45, yaw: 0},
    {path: 'img/lamborghini_centenario_lp-770_interior_sdc.glb', x: -8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/jiotto_caspita_roadster_1989_by_alex.ka..glb', x: -4.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/ferrariHeadBlack.glb', x: -1.58, y: 0, z: 3.45, yaw: 0},
    {path: 'img/ferrariHeadBlack.glb', x: 1.58, y: 0, z: 3.45, yaw: 0},
    {path: 'img/lamboLightOff.glb', x: 4.6, y: 0, z: 3.45, yaw: 0},
];

const rotateGlbFiles = [ // rotate
    {path: 'img/toyota_supra_mk5_a90.glb', x: -19.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/porsche_911_turbo_996_2000_by_alex.ka..glb', x: -16.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/maserati_ghibli_hybrid.glb', x: -14, y: 0, z: 3.45, yaw: 0},
    {path: 'img/jiotto_caspita_f1_road_car_1989_by_alex.ka..glb', x: -11, y: 0, z: 3.45, yaw: 0},
    {path: 'img/lamborghini_centenario_lp-770_interior_sdc.glb', x: -8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/jiotto_caspita_roadster_1989_by_alex.ka..glb', x: -4.8, y: 0, z: 3.45, yaw: 0},
    {path: 'img/ferrari.glb', x: -1.58, y: 0, z: 3.45, yaw: 0},
    {path: 'img/feraPuple.glb', x: 1.58, y: 0, z: 3.45, yaw: 0}, // 헤드 블랙
    {path: 'img/lamboLightOff.glb', x: 4.6, y: 0, z: 3.45, yaw: 0},
];

// 불빛
// 전역 light on
function wholeLightOn() {
    let light = new THREE.DirectionalLight(0xffffff, 10);
    scene.add(light);
}

// 전역 light off
function wholeLightOff() {
    scene.remove(light);
}
var light0 = null;
var light1 = null;
var light2 = null;
var light3 = null;
var light4 = null;

//보라 on
function purpleLightOn() {
    light0 = new THREE.PointLight(0x8b00ff, 1, 8);
    light0.position.set(-7.2, 3, -3.45);
    scene.add(light0);

    light1 = new THREE.PointLight(0x8b00ff, 1, 8);
    light1.position.set(-3.2, 3, -3.45);
    scene.add(light1);

    light2 = new THREE.PointLight(0x8b00ff, 1, 8);
    light2.position.set(-1.1, 3, -3.45);
    scene.add(light2);

    light3 = new THREE.PointLight(0x8b00ff, 1, 8);
    light3.position.set(0, 3, -3.45);
    scene.add(light3);

    light4 = new THREE.PointLight(0x8b00ff, 1, 8);
    light4.position.set(2, 3, -1.45);
    scene.add(light4);
}

//보라off
function purpleLightOff() {
    scene.remove(light0,light1, light2, light3, light4);
}

//floor set
function floorSet() {
    var planeGeometry = new THREE.PlaneGeometry(1000, 1000); // 바닥의 가로, 세로 크기 설정
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0x111111, roughness: 0.01, metalness: 0.9});
    // var planeMaterial = new THREE.MeshBasicMaterial({color: 0x111111}); // 바닥의 색상 설정
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); // 바닥의 Mesh 생성
    planeMesh.rotation.x = -Math.PI / 2; // 바닥을 수평으로 배치하기 위해 x축 회전
    scene.add(planeMesh); // 바닥을 Scene에 추가
    // 광원 생성
    const floorLight = new THREE.PointLight(0xffffff, 1);
    floorLight.position.set(2, 5, 2);
    scene.add(floorLight);
}

//floor remove
function floorRemove() {
    scene.remove(planeMesh);
}

// 헤드라이트 꺼지고 회전하지 않는 객체그룹 load
const lightOffGroupPromises = lightOffGlbFiles.map(glbFile => {
    return new Promise((resolve, reject) => {
        loader.load(
            glbFile.path,
            gltf => {
                const loModelGroup = new THREE.Group();
                const offModel = gltf.scene;
                loModelGroup.position.set(glbFile.x, 0, glbFile.z);
                loModelGroup.rotation.y = glbFile.yaw;
                loModelGroup.userData.originalScale = loModelGroup.scale.clone();
                loModelGroup.add(offModel);
                offModelsGroup.add(loModelGroup);
                resolve();
            },
            undefined,
            error => {
                reject(error);
            }
        );
    });
});
function lightOffShow() {
    Promise.all(lightOffGroupPromises)
        .then(() => {
            scene.add(offModelsGroup);
            console.log('off All models loaded!');
        })
        .catch(error => {
            console.error('off Error loading models:', error);
        });
}

function removeLightOffModelsGroup() {
    scene.remove(offModelsGroup);
    console.log('remove light off');
}

function addLightOffModelsGroup() {
    scene.add(offModelsGroup);
}


//헤드라이트 꺼지고 회전하는 객체그룹 load
const rotateGroupPromises = rotateGlbFiles.map(glbFile => {
    return new Promise((resolve, reject) => {
        loader.load(
            glbFile.path,
            gltf => {
                const rotateModelGroup = new THREE.Group();
                const rotateModel = gltf.scene;
                rotateModelGroup.position.set(glbFile.x, 0, glbFile.z);
                rotateModelGroup.rotation.y = glbFile.yaw;
                rotateModelGroup.userData.originalScale = rotateModelGroup.scale.clone();
                rotateModelGroup.add(rotateModel);
                rotateModelsGroup.add(rotateModelGroup);
                resolve();
            },
            undefined,
            error => {
                reject(error);
            }
        );
    });
});
function rotateShow() {
    Promise.all(rotateGroupPromises)
        .then(() => {
            scene.add(rotateModelsGroup);
            console.log('rotate All models loaded!');
        })
        .catch(error => {
            console.error('rotate Error loading models:', error);
        });
}
// rotate 모델은 삭제할 일이 없음


//헤드라이트 켜진 모델그룹 load
const groupPromises = lightOnGlbFiles.map(glbFile => {
    return new Promise((resolve, reject) => {
        loader.load(
            glbFile.path,
            gltf => {
                const modelGroup = new THREE.Group();
                const onModel = gltf.scene;
                modelGroup.position.set(glbFile.x, 0, glbFile.z);
                modelGroup.rotation.y = glbFile.yaw;
                modelGroup.userData.originalScale = modelGroup.scale.clone();
                modelGroup.add(onModel);
                modelsGroup.add(modelGroup);
                resolve();
            },
            undefined,
            error => {
                reject(error);
            }
        );
    });
});
function lightOnShow() {
    Promise.all(groupPromises)
        .then(() => {
            scene.add(modelsGroup);
            console.log('on All models loaded!');
        })
        .catch(error => {
            console.error('on Error loading models:', error);
        });
}

function removeLightOnModelsGroup() {
    scene.remove(modelsGroup);
    console.log('remove light on');
}

function addLightOnModelsGroup() {
    scene.add(modelsGroup);
}

//실행부
lightOffShow();
setTimeout(() => audio.play(), 4000);
setTimeout(() => removeLightOffModelsGroup(), 5000);
setTimeout(() => lightOnShow(), 5000);
setTimeout(() => purpleLightOn(), 5000);
setTimeout(() => removeLightOnModelsGroup(), 10355);
setTimeout(() => wholeLightOn(), 10355);
setTimeout(() => floorSet(), 10355);
setTimeout(() => rotateShow(), 10355);
setTimeout(() => purpleLightOff(), 10855);
setTimeout(() => boss.play(), 10855);

function rotateGroup(offModelsGroup, speed) {
    offModelsGroup.rotation.y -= speed;
}
function allAnimate() {
    requestAnimationFrame(allAnimate);
// 1900
    setTimeout(() =>  rotateGroup( rotateModelsGroup, 0.0007), 10900);
   // 회전 시작이 부자연스러움 ;;;
    renderer.render(scene, camera);
    // 키보드 입력에 따라 카메라 움직임 처리
    if (keyboard['ArrowUp']) { // 아니  마우스로 카메라 움직이면 뭐 키가 다 바뀜?
        camera.position.z -= 0.1;
    }
    if (keyboard['ArrowDown']) {
        camera.position.z += 0.1;
    }
    if (keyboard['ArrowLeft']) {
        camera.position.x -= 0.1;
    }
    if (keyboard['ArrowRight']) {
        camera.position.x += 0.1;
    }
    if (camera.position.y < 1) {
        camera.position.y = 1;
    }
}
// 키보드 키 다운 이벤트 핸들러
function handleKeyDown(event) {
    keyboard[event.key] = true;
}
// 키보드 키 업 이벤트 핸들러
function handleKeyUp(event) {
    keyboard[event.key] = false;
}
allAnimate();
// 스크롤 감지

let preScrollTop = 0;

window.addEventListener('scroll',() => {
    let ScrollTop = window.scrollY;

    if(ScrollTop > 0){
        document.querySelector('.main_header_background').style.backgroundColor = 'black';
        document.querySelector('.main_header_background').style.opacity = '.7';
    } else {
        document.querySelector('.main_header_background').style.backgroundColor = 'transparent';
    }
});

const user = JSON.parse(window.localStorage.getItem('user'));
if(user !== null && user !== undefined) {
    document.querySelector('.main_list_not_user_logo').style.display = 'none';
    document.querySelector('.main_list_drop_down_login').style.display = 'none';
    document.querySelector('.main_list_drop_down_signup').style.display = 'none';
} else {
    document.querySelector('.main_list_user_logo').style.display = 'none';
    document.querySelector('.main_list_drop_down_myCar').style.display = 'none';
    document.querySelector('.main_list_drop_down_logout').style.display = 'none';
}
