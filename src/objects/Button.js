import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, callback, fontSize, scale = 1) {
    super(scene);
    this.scene = scene;


    this.button = this.scene.add.sprite(x, y, key1).setInteractive().setDepth(7).setScale(scale);
    this.text = this.scene.add.text(0, 0, text, { fontSize: fontSize ? fontSize : '32px', fill: '#fff' }).setDepth(8);
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.button.on('pointerdown', function () {
      callback();
    }.bind(this));

    this.button.on('pointerover', function () {
      this.button.setTexture(key2);
    }.bind(this));

    this.button.on('pointerout', function () {
      this.button.setTexture(key1);
    }.bind(this));
  }
}