import 'phaser';

export default class PlayerInfo extends Phaser.GameObjects.Container {
  constructor(scene, player) {
    super(scene);
    this.scene = scene;
    this.text = this.scene.add.text(100, 500, '', {
      fill: '#000000',
    });
  }
}
