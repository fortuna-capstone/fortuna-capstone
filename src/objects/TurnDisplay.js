import 'phaser';
import phaserConfig from '../config/phaserConfig';


export default class TurnDisplay extends Phaser.GameObjects.Container {
  constructor(scene,x,y, key1, description) {
    super(scene);
    this.scene = scene;
    // this.x = x;
    // this.y = y;
    const width = phaserConfig.width/ 8;
    const height = phaserConfig.height / 5;
    const msgBox = this.scene.add.group();

    const box = this.scene.add.sprite(x, y, key1).setScale(0.2);

    const text = this.scene.add.text(x, y, description, {
      fontSize: '18px',
      fill: '#00ff00',
      wordWrap: { width: 220 },
      align: 'center',
    });
    Phaser.Display.Align.In.Center(text, box);
    text.x -= 3;

    msgBox.add(box);
    msgBox.add(text);

  }
}
