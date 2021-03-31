import 'phaser';

export default class PlayerInfo extends Phaser.GameObjects.Container {
  constructor(scene, player, x, y) {
    super(scene);
    this.scene = scene;
    this.text = this.scene.add.text(x, y, '', {
      fill: '#000000'
    });
    this.text.setScrollFactor(0);
  }
}
