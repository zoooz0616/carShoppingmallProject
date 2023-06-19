import * as THREE from 'https://cdn.skypack.dev/three@0.141.0';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webg2')
const scene = new THREE.Scene()

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
scene.add(light)

// scene.background = new THREE.Color('white')

// const backgroundLoader = new RGBELoader()
// backgroundLoader.load('assets/parking4k.hdr',function(texture){
//     texture.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = texture
// })

const sizes = {
    width : canvas.clientWidth ,
    height : canvas.clientHeight
}

const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.set(0,1.4,7)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas : canvas,
    antialias : true,
    alpha : true
})


const controls = new OrbitControls(camera,renderer.domElement)
controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
controls.panSpeed = 0.8; // 패닝 속도 입니다. 기본값(Float)은 1입니다.

// 3D 이미지 화면에 띄우기
const loader = new GLTFLoader();
loader.load('assets/toyota.glb', function(glb){
    console.log(glb)
    const root = glb.scene
    root.scale.set(1.7,1.7,1.7)
    scene.add(root)
    function animate() {
        requestAnimationFrame(animate)
        // glb.scene.rotation.y -= 0.01
        renderer.render(scene, camera)
        controls.update()
    }
    animate()
})

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setClearColor(0x000000, 0)
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
