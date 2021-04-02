import 'phaser';

export default class Spinner extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, text) {
    super(scene);
    this.scene = scene;


    this.button = this.scene.add.sprite(x, y, key1).setScrollFactor(0).setDepth(10)
    this.text = this.scene.add.text(0, 0, text, { fontSize:'32px', fill: '#000' }).setDepth(8);
    Phaser.Display.Align.In.Center(this.text, this.button);
    console.log(scene)
    this.button.anims.create({
        key: 'spin',
        frames: this.button.anims.generateFrameNumbers('spinner', { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    this.button.anims.create({
        key: 'pause',
        frames: [ { key: 'spinner', frame: 1 } ],
        frameRate: 20
    });
    this.add(this.button);
    this.add(this.text);
    this.button.on('pointerdown',
        function () {
            const number = Phaser.Math.Between(1, 8);
            this.scene.socket.roll = number;
    }.bind(this));

    this.button.on('pointerover', function () {
      scene.anims.play('spin', true)
    }.bind(this));

    this.button.on('pointerout', function () {
      this.button.anims.play('pause')
    }.bind(this));
  }
}