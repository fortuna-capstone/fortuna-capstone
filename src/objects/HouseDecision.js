import 'phaser';
import phaserConfig from '../config/phaserConfig';
import Button from './Button';

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

    const splitLevel = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height,
      key2,
      key3,
      'Split-Level: $40,000',
      () => destroyFunc('Split-Level'),
      '20px'
    ).setScale(0.5)

    const mobileHome = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 10,
      key2,
      key3,
      'Mobile Home: $60,000',
      () => destroyFunc('Mobile Home'),
      '20px'
    ).setScale(0.5)

    const logCabin = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 20,
      key2,
      key3,
      'Log Cabin: $80,000',
      () => destroyFunc('Log Cabin'),
      '20px'
    ).setScale(0.5)

    const cozyCondo = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 30,
      key2,
      key3,
      'Cozy Condo: $100,000',
      () => destroyFunc('Cozy Condo'),
      '20px'
    ).setScale(0.5)

    const dutchColonial = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 40,
      key2,
      key3,
      'Dutch Colonial: $120,000',
      () => destroyFunc('Dutch Colonial'),
      '20px'
    ).setScale(0.5)

    const beachHouse = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 50,
      key2,
      key3,
      'Beach House: $140,000',
      () => destroyFunc('Beach House'),
      '20px'
    ).setScale(0.5)

    const farmhouse = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 60,
      key2,
      key3,
      'Farmhouse: $160,000',
      () => destroyFunc('Farmhouse'),
      '20px'
    ).setScale(0.5)

    const tudor = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 70,
      key2,
      key3,
      'Tudor: $180,000',
      () => destroyFunc('Tudor'),
      '20px'
    ).setScale(0.5)

    const victorian = new Button(
      scene,
      x.x > 400 ? x.x : width,
      height + 80,
      key2,
      key3,
      'Victorian: $200,000',
      () => destroyFunc('Victorian'),
      '20px'
    ).setScale(0.5)

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
    }
  }
}
