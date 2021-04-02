import 'phaser';

export default class PlayerInfo extends Phaser.GameObjects.Container {
  constructor(scene, player, x, y, image) {
    super(scene);
    this.scene = scene;
    console.log(image)
    this.box = this.scene.add.sprite(x,y, image)
    this.text = this.scene.add.text(x, y, '', {
      fill: '00ff00'
    });
    this.box.setScrollFactor(0).setScale(5).setDepth(10)
    this.text.setScrollFactor(0).setDepth(7);
    Phaser.Display.Align.In.Center(this.text, this.box);
    this.add(this.box)
  }
}
