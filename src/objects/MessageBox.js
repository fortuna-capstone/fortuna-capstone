import 'phaser';
import phaserConfig from '../config/phaserConfig';
import Button from './Button';

export default class MessageBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, description, callback) {
    super(scene);
    this.scene = scene;
    const width = phaserConfig.width / 2;
    const height = phaserConfig.height / 2;
    const msgBox = this.scene.add.group();

    const box = this.scene.add.sprite(x.x > 400 ? x.x : width, height, key1).setScale(0.5);

    // create button
    const button = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 50,
      key2,
      key3,
      'Okay',
      () => {
        callback();

        msgBox.destroy(true);
        button.button.destroy();
        button.text.destroy();

        scene.messageBox = null;
      },
      '30px'
    )

    const text = this.scene.add.text(0, 0, description, {
      fontSize: '20px',
      fill: '#000',
      wordWrap: { width: 220 },
      align: 'center',
    });
    Phaser.Display.Align.In.TopCenter(text, box);
    text.y = 210;

    msgBox.add(box);
    msgBox.add(text);

  }
}
