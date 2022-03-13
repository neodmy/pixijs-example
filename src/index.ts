import Manager from './Manager/Manager';
import LoaderScene from './scenes/LoaderScene';

Manager.initialize(640, 480, 0x6495ed);
const loaderScene: LoaderScene = new LoaderScene();
Manager.changeScene(loaderScene);
