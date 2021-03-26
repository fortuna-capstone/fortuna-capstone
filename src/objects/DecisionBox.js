import 'phaser';
import config from '../config/config'

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, description, text1, text2, decision1, decision2, callback) {
    super(scene);
    this.scene = scene;
    const width = config.width / 2;
    const height = config.height / 2;
    const msgBox = this.scene.add.group();

    const box = this.scene.add.sprite(width, height, key1).setScale(0.6);

    // create top choice button
    const topButton = this.scene.add.sprite(width, height, key2).setInteractive();
    const topButtonText = this.scene.add.text(0, 0, text1, {fontSize: '20px', fill: '#fff'});
    Phaser.Display.Align.In.Center(topButtonText, topButton);

    // create bottom choice button
    const bottomButton = this.scene.add.sprite(width, height + 75, key2).setInteractive();
    const bottomButtonText = this.scene.add.text(0, 0, text2, {fontSize: '20px', fill: '#fff'});
    Phaser.Display.Align.In.Center(bottomButtonText, bottomButton);

    // adds text in box
    const text = this.scene.add.text(0, 0, description, {fontSize: '20px', fill: '#000', wordWrap: {width: 220}, align: 'center'})
    Phaser.Display.Align.In.TopCenter(text, box);
    text.y = 210;

    msgBox.add(box);
    msgBox.add(topButton);
    msgBox.add(topButtonText);
    msgBox.add(bottomButton);
    msgBox.add(bottomButtonText);
    msgBox.add(text);
    console.log(msgBox)

    // top button decision
    topButton.on('pointerdown', function () {
      callback(decision1);
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    topButton.on('pointerover', function () {
      topButton.setTexture(key3);
    });

    topButton.on('pointerout', function () {
      topButton.setTexture(key2);
    });

    // bottom button decision
    bottomButton.on('pointerdown', function () {
      callback(decision2);
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    bottomButton.on('pointerover', function () {
      bottomButton.setTexture(key3);
    });

    bottomButton.on('pointerout', function () {
      bottomButton.setTexture(key2);
    });

  }
}