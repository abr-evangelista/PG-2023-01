import * as THREE from 'three'; //carrega a biblioteca

import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const FOV1 = 80, PROPORCAO_TELA = window.innerWidth/window.innerHeight; //Valores para camera

//Abaixo, temos a definicao de duas cameras, de acordo com a especificacao do projeto. A relacao entre as cameras 1 e 2 esta explicada no
// readme do projeto.
const cena = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(FOV1, PROPORCAO_TELA, 0.1, 1000);
camera1.position.setZ(9);

const camera2 = new THREE.PerspectiveCamera(FOV1, PROPORCAO_TELA, 0.1, 1000);
camera2.position.setZ(9);
camera2.rotateZ(Math.PI / 4);

//definicao da iluminacao do ambiente abaixo.
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

//adicao de iluminacao para cena principal
cena.add(keyLight);
cena.add(fillLight);
cena.add(backLight);

//abaixo, o canvas do renderer é criado e inserido no body da página html 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ambos os modelos utilizados no projeto (um modelo para cada membro, como pedido na especificacao) serao carregados
// abaixo pelo mesmo tipo de loader, para arquivos gltf.
const loader = new GLTFLoader();
let anjo, tardis;

// aqui referenciamos os shaders criados no arquivo html para a criacao de um rawshadermaterial, feito de
// forma manual.
const material = new THREE.RawShaderMaterial( {

	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

} );


// Carregando objeto do anjo
loader.load('./orthodox_angel_statue_scan/scene.gltf', (obj) => {
  anjo = obj;

  // referenciamos o modelo do anjo para poder acessar os seus materiais e substituir pelo criado manualmente.
  // isso eh feito pela funcao traverse, que roda todos os mesh do modelo.
  const model = obj.scene;
  model.traverse((o) => {
    if (o.isMesh) o.material = material; // material criado manualmente
  });

  obj.scene.position.y = -2;
  obj.scene.position.x = -0.05;
  obj.scene.position.z = 0;
  obj.scene.scale.set(1.5,1.5,1.5);

  cena.add(obj.scene);
});

// Carregando objeto da TARDIS. O shader eh aplicado apenas no objeto do anjo (a especificacao pede apenas por um objeto modificado,
// entao preferimos manter a TARDIS original como referencia de movimento na cena).
loader.load('./tardis/scene.gltf', (obj) => {
  tardis = obj;
  obj.scene.position.x = -28;
  obj.scene.position.z = -15;
  obj.scene.rotation.y = -1;

  obj.scene.scale.set(2,3,2);

  cena.add(obj.scene);
});



// Animação de movimento do anjo descrita abaixo. lore-accurate
let andar, id_animacao;

//  Movimentacao descrita sem as limitacoes de visualizacao.
const animate = () => {
  
  if(anjo){
    if(anjo.scene.position.z >= 8){
      console.log();
      
      renderer.render(cena, camera2);
    }
    else{
      anjo.scene.position.z += 1.2 * andar;
      renderer.render(cena, camera1);

    }
  }
    
  id_animacao = requestAnimationFrame(animate); 
}

animate();

// Abaixo eh definida a limitacao de visualizacao. Se a pagina estiver escondida, o anjo se move em direcao ao visualizador.
document.addEventListener("visibilitychange", () => {
  if(document.hidden){
    andar = 1; 
    animate(); 
  } 
  else{
    andar = 0; 
  }
  
});