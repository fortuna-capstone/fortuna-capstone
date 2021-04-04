import 'phaser';
import phaserConfig from '../config/phaserConfig';
import Button from './Button';

export default class TradeBox extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    key1,
    key2,
    key3,
    description,
    text1,
    text2,
    text3,
    decision1,
    decision2,
    callback
  ) {
    super(scene);
    this.scene = scene;
    const width = phaserConfig.width / 2;
    const height = phaserConfig.height / 2;
    const msgBox = this.scene.add.group();

    const box = this.scene.add.sprite(x.x > 400 ? x.x : width, height, key1).setScale(0.6).setDepth(6);

    // create top choice button
    const topButton = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height - 10,
      key2,
      key3,
      text1, 
      () => destroyFunc(decision1),
      '20px'
    ).setScale(0.9);

    // create bottom choice button
    const middleButton = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 40,
      key2,
      key3,
      text2, 
      () => destroyFunc(decision2),
      '20px'
    ).setScale(0.9);

    const bottomButton = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 90,
      key2,
      key3,
      text3, 
      () => destroyFunc('none'),
      '20px'
    ).setScale(0.9);

    // adds text in box
    const text = this.scene.add.text(0, 0, description, {
      fontSize: '20px',
      fill: '#00ff00',
      wordWrap: { width: 220 },
      align: 'center',
    }).setDepth(7);
    Phaser.Display.Align.In.TopCenter(text, box);
    text.y = 210;

    msgBox.add(box);
    msgBox.add(text);

    const destroyFunc = (decision) => {
      if (decision !== 'none') {
        callback(decision)
      }

      msgBox.destroy(true);

      topButton.button.destroy();
      topButton.text.destroy();

      middleButton.button.destroy();
      middleButton.text.destroy();

      bottomButton.button.destroy();
      bottomButton.text.destroy();

      scene.messageBox = null;
    }

  }
}
