import 'phaser';
import phaserConfig from '../config/phaserConfig';
import Button from './Button';

export default class HouseDecision extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, description, callback) {
    super(scene);
    this.scene = scene;
    const width = phaserConfig.width / 2;
    const height = phaserConfig.height / 2;
    const msgBox = this.scene.add.group();
    console.log('SCENE', scene);
    let options = scene.dataArrays.houseArray;
    let splitLevel;
    let mobileHome;
    let logCabin;
    let cozyCondo;
    let dutchColonial;
    let beachHouse;
    let farmhouse;
    let tudor;
    let victorian;

    const box = this.scene.add
      .sprite(x.x > 400 ? x.x : width, height, key1)
      .setScale(0.6)
      .setDepth(6);

    if (options.includes('Split-Level')) {
      splitLevel = new Button(
        scene,
        x.x > 400 ? x.x - 75 : width,
        height - 50,
        key2,
        key3,
        'Split-Level: $40,000',
        () => destroyFunc('Split-Level'),
        '12px',
        0.8
      );
    }
    if (options.includes('Mobile Home')) {
      mobileHome = new Button(
        scene,
        x.x > 400 ? x.x + 75 : width,
        height - 50,
        key2,
        key3,
        'Mobile Home: $60,000',
        () => destroyFunc('Mobile Home'),
        '12px',
        0.8
      );
    }

    if (options.includes('Log Cabin')) {
      logCabin = new Button(
        scene,
        x.x > 400 ? x.x - 75 : width,
        height - 10,
        key2,
        key3,
        'Log Cabin: $80,000',
        () => destroyFunc('Log Cabin'),
        '12px',
        0.8
      );
    }

    if (options.includes('Cozy Condo')) {
      cozyCondo = new Button(
        scene,
        x.x > 400 ? x.x + 75 : width,
        height - 10,
        key2,
        key3,
        'Cozy Condo: $100,000',
        () => destroyFunc('Cozy Condo'),
        '12px',
        0.8
      );
    }

    if (options.includes('Dutch Colonial')) {
      dutchColonial = new Button(
        scene,
        x.x > 400 ? x.x - 75 : width,
        height + 30,
        key2,
        key3,
        'Colonial: $120,000',
        () => destroyFunc('Dutch Colonial'),
        '12px',
        0.8
      );
    }

    if (options.includes('Beach House')) {
      beachHouse = new Button(
        scene,
        x.x > 400 ? x.x + 75 : width,
        height + 30,
        key2,
        key3,
        'Beach House: $140,000',
        () => destroyFunc('Beach House'),
        '12px',
        0.8
      );
    }

    if (options.includes('Farmhouse')) {
      farmhouse = new Button(
        scene,
        x.x > 400 ? x.x - 75 : width,
        height + 70,
        key2,
        key3,
        'Farmhouse: $160,000',
        () => destroyFunc('Farmhouse'),
        '12px',
        0.8
      );
    }

    if (options.includes('Tudor')) {
      tudor = new Button(
        scene,
        x.x > 400 ? x.x + 75 : width,
        height + 70,
        key2,
        key3,
        'Tudor: $180,000',
        () => destroyFunc('Tudor'),
        '12px',
        0.8
      );
    }

    if (options.includes('Victorian')) {
      victorian = new Button(
        scene,
        x.x > 400 ? x.x : width,
        height + 110,
        key2,
        key3,
        'Victorian: $200,000',
        () => destroyFunc('Victorian'),
        '12px',
        0.8
      );
    }

    // adds text in box
    const text = this.scene.add
      .text(0, 0, description, {
        fontSize: '20px',
        fill: '#000',
        wordWrap: { width: 220 },
        align: 'center',
      })
      .setDepth(7);
    Phaser.Display.Align.In.TopCenter(text, box);
    text.y = 180;

    msgBox.add(box);
    msgBox.add(text);

    const destroyFunc = (name) => {
      callback(name);

      msgBox.destroy(true);

      splitLevel.button.destroy();
      splitLevel.text.destroy();

      mobileHome.button.destroy();
      mobileHome.text.destroy();

      logCabin.button.destroy();
      logCabin.text.destroy();

      cozyCondo.button.destroy();
      cozyCondo.text.destroy();

      dutchColonial.button.destroy();
      dutchColonial.text.destroy();

      beachHouse.button.destroy();
      beachHouse.text.destroy();

      farmhouse.button.destroy();
      farmhouse.text.destroy();

      tudor.button.destroy();
      tudor.text.destroy();

      victorian.button.destroy();
      victorian.text.destroy();

      scene.messageBox = null;
    };
  }
}
