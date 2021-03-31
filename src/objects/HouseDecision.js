import 'phaser';
import phaserConfig from '../config/phaserConfig';

export default class HouseDecision extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    key1,
    key2,
    key3,
    description,
    callback
  ) {
    super(scene);
    this.scene = scene;
    const width = phaserConfig.width / 2;
    const height = phaserConfig.height / 2;
    const msgBox = this.scene.add.group();

    const box = this.scene.add.sprite(x.x > 400 ? x.x : width, height, key1).setScale(0.6).setDepth(6);

    const button1 = this.scene.add
      .sprite(x.x > 400 ? x.x - 25: width, height, key2)
      .setInteractive().setDepth(7).setScale(0.7);
    const button1Text = this.scene.add.text(0, 0, 'Apartment', {
      fontSize: '20px',
      fill: '#fff',
    }).setDepth(8);
    Phaser.Display.Align.In.Center(button1Text, button1);

    const button2 = this.scene.add
      .sprite(x.x > 400 ? x.x + 50: width, height, key2)
      .setInteractive().setDepth(7).setScale(0.7);
    const button2Text = this.scene.add.text(0, 0, 'Fancy House', {
      fontSize: '20px',
      fill: '#fff',
    }).setDepth(8);
    Phaser.Display.Align.In.Center(button2Text, button2);

     // create bottom choice button
    const button3 = this.scene.add
      .sprite(x.x > 400 ? x.x - 25: width, height + 70, key2)
      .setInteractive().setDepth(7).setScale(0.7);
    const button3Text = this.scene.add.text(0, 0, 'Parents House', {
      fontSize: '20px',
      fill: '#fff',
    }).setDepth(8);
    Phaser.Display.Align.In.Center(button3Text, button3);

  
   const button4 = this.scene.add
    .sprite(x.x > 400 ? x.x + 50: width, height + 70, key2)
    .setInteractive().setDepth(7).setScale(0.7);
   const button4Text = this.scene.add.text(0, 0, 'Regular House', {
   fontSize: '20px',
   fill: '#fff',
  }).setDepth(8);
  Phaser.Display.Align.In.Center(button4Text, button4);

  const button5 = this.scene.add
    .sprite(x.x > 400 ? x.x - 25: width, height + 35, key2)
    .setInteractive().setDepth(7).setScale(0.7);
   const button5Text = this.scene.add.text(0, 0, 'Studio', {
   fontSize: '20px',
   fill: '#fff',
  }).setDepth(8);
  Phaser.Display.Align.In.Center(button5Text, button5);

  const button6 = this.scene.add
    .sprite(x.x > 400 ? x.x + 50: width, height + 35, key2)
    .setInteractive().setDepth(7).setScale(0.7);
   const button6Text = this.scene.add.text(0, 0, '60,000', {
   fontSize: '20px',
   fill: '#fff',
  }).setDepth(8);
  Phaser.Display.Align.In.Center(button6Text, button6);

    // adds text in box
    const text = this.scene.add.text(0, 0, description, {
      fontSize: '20px',
      fill: '#000',
      wordWrap: { width: 220 },
      align: 'center',
    }).setDepth(7);
    Phaser.Display.Align.In.TopCenter(text, box);
    text.y = 210;

    msgBox.add(box);
    msgBox.add(button1);
    msgBox.add(button1Text);
    msgBox.add(button2);
    msgBox.add(button2Text);
    msgBox.add(button3);
    msgBox.add(button3Text);
    msgBox.add(button4);
    msgBox.add(button4Text);
    msgBox.add(button5);
    msgBox.add(button5Text);
    msgBox.add(button6);
    msgBox.add(button6Text);
    msgBox.add(text);

    // top button decision
    button1.on('pointerdown', function () {
      callback('Apartment');
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    button1.on('pointerover', function () {
      button1.setTexture(key3);
    });

    button1.on('pointerout', function () {
      button1.setTexture(key2);
    });

    // bottom button decision
    button2.on('pointerdown', function () {
      callback('Fancy House');
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    button2.on('pointerover', function () {
      button2.setTexture(key3);
    });

    button2.on('pointerout', function () {
      button2.setTexture(key2);
    });

     // bottom button decision
     button3.on('pointerdown', function () {
      callback('Parents House');
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    button3.on('pointerover', function () {
      button3.setTexture(key3);
    });

    button3.on('pointerout', function () {
      button3.setTexture(key2);
    });

    // bottom button decision
    button4.on('pointerdown', function () {
      callback('Regular House');
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    button4.on('pointerover', function () {
      button4.setTexture(key3);
    });

    button4.on('pointerout', function () {
      button4.setTexture(key2);
    });

    button5.on('pointerdown', function () {
      callback('Studio');
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    button5.on('pointerover', function () {
      button5.setTexture(key3);
    });

    button5.on('pointerout', function () {
      button5.setTexture(key2);
    });

    button6.on('pointerdown', function () {
      callback(decision2);
      msgBox.destroy(true);
      scene.messageBox = null;
    });

    button6.on('pointerover', function () {
      button6.setTexture(key3);
    });

    button6.on('pointerout', function () {
      button6.setTexture(key2);
    });
  }
}
