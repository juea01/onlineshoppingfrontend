import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { WebGLRenderer } from 'three';

@Component({
  selector: 'app-footer',
  templateUrl: './3dview.component.html',
  styleUrls: ['./3dview.component.css']
})
export class ThreeDimensionViewComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  // Cube Properties
  @Input() public rotationSpeedX: number = 0.01;
  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;
  @Input() public sky_texture: string = "/assets/sky_texture.jpg";
  @Input() public grass_texture: string = "/assets/grass_texture.jpg";
  @Input() public shop_texture: string = "/assets/texture.jpg";
  @Input() public nanobit_texture: string = "/assets/NanoBit.jpg";
  @Input() public glass_texture: string = "/assets/glass.jpg";

  @Input() public cameraZ: number = 600;
  @Input() public cameraY: number = 1;
  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  //private geometry = new THREE.BoxGeometry(1, 1, 1);
  //private material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});
  //private material = new THREE.MeshPhongMaterial({color: 0x44aa88});
  //private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  //private secondCube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private cubes = [];

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  private makeObjectInstance(geometry, texture, x, y, z){

    //const material = new THREE.MeshPhongMaterial({color});
    const material = new THREE.MeshBasicMaterial({map: this.loader.load(texture)});
    const obj: THREE.Mesh = new THREE.Mesh(geometry, material);
    this.scene.add(obj);

    obj.position.x = x;
    obj.position.y = y;
    obj.position.z = z;

    return obj;
  }

  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);



    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const skyGeometry = new THREE.PlaneGeometry(this.canvas.clientWidth, 7);
    const groundGeometry = new THREE.PlaneGeometry(30, 95);
    this.cubes = [
      //this.makeObjectInstance(geometry, 0x44aa88, 0, 0, -200),
     // this.makeObjectInstance(groundGeometry, 0x8844aa, 0, 0, 0),
     // this.makeObjectInstance(geometry, 0xaa8844, 2, 0, 0)
    ];

    //sky and ground
    let sky = this.makeObjectInstance(skyGeometry, this.sky_texture, 0, 2, -100);
     let ground = this.makeObjectInstance(groundGeometry, this.grass_texture, 0, -4.1, -100);
     ground.rotateX( (Math.PI / 2 )-0.060);  //Math.PI/2 = 90 degree rotation9

  //shops
  this.createShop(2.2, 1.2, 3.5, 0,-2,-50,-0.07);
  this.createShop(2.2, 1.2, 3.5,10,-2,+20,-0.07);
  this.createShop(1.2, 1.2, 3.5,-10,-2,+20,-0.07);



    //lighting
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1.2,-2,4);  //x,y,z
    this.scene.add(light);



   //  const ambientLight = new THREE.AmbientLight(0xF0B27A, 0.6);
  //   this.scene.add(ambientLight);


    //Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.set(0,0,700);
    this.camera.up.set(0,1,0);
    this.camera.lookAt(0,0,0);

  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private createShop(width, height, length, x,y,z,rotation) {

     //shops
  const shopWidth = width;
  const shopHeight = height;
  const shopLength = length;

  const windowWidth = 0.4;
  const windowHeight = 0.3;
  const windowLength = 0.2;
  //const windowGeometry = new THREE.PlaneGeometry(windowWidth, windowHeight);
  const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowLength);
  //const windowMaterial = new THREE.MeshPhongMaterial({color: 0xF2EBE6});
  const windowMaterial = new THREE.MeshBasicMaterial({map: this.loader.load(this.glass_texture)});
  const windowMash = new THREE.Mesh(windowGeometry, windowMaterial);
  const windowMashTwo = new THREE.Mesh(windowGeometry, windowMaterial);

  const doorWidth = 0.4;
  const doorHeight = 0.6;
  const doorGeometry = new THREE.PlaneGeometry(doorWidth, doorHeight);
  const doorMaterial = new THREE.MeshPhongMaterial({color: 0xF2EBE6});
  const doorMash = new THREE.Mesh(doorGeometry, doorMaterial);

  const textWidth = 2;
  const textHeight = 0.4;
  const textGeometry = new THREE.PlaneGeometry(textWidth, textHeight);
  const textMaterial = new THREE.MeshBasicMaterial({map: this.loader.load(this.nanobit_texture)});
  const textMash = new THREE.Mesh(textGeometry, textMaterial);





  // const shop = new THREE.Object3D();
  // this.scene.add(tank);

  const shopGeometry = new THREE.BoxGeometry(shopWidth, shopHeight, shopLength);
  const shopMaterial = new THREE.MeshPhongMaterial({color: 0xF0B27A});
  //const shopMaterial = new THREE.MeshBasicMaterial({map: this.loader.load(this.shop_texture)});
  const shopMesh = new THREE.Mesh(shopGeometry, shopMaterial);
  shopMesh.position.x=x;
  shopMesh.position.y=y;
  shopMesh.position.z=z;
  shopMesh.rotateY( rotation);
  //bhodyMesh.position.y = 1.4;
  //bodyMesh.castShadow = true;
  //tank.add(bodyMesh);

  windowMash.position.x += 0.6;
  // windowMash.position.y = shopHeight+2;
   windowMash.position.z = shopLength +1;
   windowMash.position.y -= 0.15;
   //windowMash.rotateY( (Math.PI/2)/1.1);
 // windowMash.rotateY( (Math.PI/3)+0.5);

 windowMashTwo.position.x -= 0.6;
 windowMashTwo.position.z = shopLength+1;
 windowMashTwo.position.y -= 0.15;

 doorMash.position.z = shopLength +1;
 doorMash.position.y -= 0.25;

 textMash.position.x += 0.1;
 textMash.position.z = shopLength +1;
 textMash.position.y += 0.35;
 //textMash.rotateY( (Math.PI/4));


  this.scene.add(shopMesh);
  shopMesh.add(windowMash);
  shopMesh.add(windowMashTwo);
  shopMesh.add(doorMash);
  shopMesh.add(textMash);

  }

  private animateObject(){

    this.cubes.forEach((obj,index)=>{
     obj.rotation.x  += this.rotationSpeedX;
     // obj.rotation.y  += this.rotationSpeedY;
    });

  }


  private startRenderingLoop() {
    //Renderer
    //Use canvas element in template
    this.renderer = new WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);


    let component: ThreeDimensionViewComponent = this;
    (function render(){
     requestAnimationFrame(render);
      component.animateObject();
      component.renderer.render(component.scene, component.camera);
    }());
  }



}
