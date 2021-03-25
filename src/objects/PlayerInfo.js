import 'phaser';

export default class PlayerInfo extends Phaser.GameObjects.Container {
  constructor(scene, player) {
    super(scene);
    this.scene = scene;
    this.scene.add.text(100, 100, 'TESTING PLAYER INFO', { fill: '#000000' });
  }
}
