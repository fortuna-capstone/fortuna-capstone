import 'phaser';

export default class Spinner extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, text) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setScrollFactor(0);
    this.text = this.scene.add.text(0, 0, text, {
      fontSize: '32px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.text, this.button);
 this.spin = false
    this.add(this.button);
    this.add(this.text);
    console.log(this.button.anims)
     this.button.anims.create({
        key: 'spin',
        frames: this.button.anims.generateFrameNumbers('spinner', { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
     this.button.anims.create({
        key: 'pause',
        frames: [ { key: 'spinner', frame: 0 } ],
        frameRate: 20
    });
    console.log(this.button.anims)
    this.button.on(
      'pointerdown',
      function () {
        const number = Phaser.Math.Between(1, 8);
        this.scene.socket.roll = number;
      }.bind(this)
    );

    this.button.on(
      'pointerover',
      function () {
        this.spin = true
      }.bind(this)
    );

    this.button.on(
      'pointerout',
      function () {
        this.spin = false
      }.bind(this)
    ); 
    this.scene.add.existing(this);
   
  }
  update(){
    if(this.spin === true){
      this.button.anims.play('spin', true);
    } else {
      this.button.anims.play('pause', true)
    }

  }
  
}
