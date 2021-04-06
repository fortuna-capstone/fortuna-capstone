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

    this.box = this.scene.add.sprite(x, y, key1).setScale(0.2);

    this.text = this.scene.add.text(0, 0, description, {
      fontSize: '18px',
      fill: '#00ff00',
      wordWrap: { width: 220 },
      align: 'center',
    });
    Phaser.Display.Align.In.Center(this.text, this.box);
    this.text.x -= 3;
    this.text.y -= 10;

    msgBox.add(this.box);
    msgBox.add(this.text);

  }
}
