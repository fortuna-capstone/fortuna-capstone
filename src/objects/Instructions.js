// import Button from Button

// export default class Instructions extends Phaser.GameObjects.Container {
//   constructor(scene,
//     x,
//     y,
//     key1,
//     key2,
//     key3,
//     description,
//     text1,
//     decision1,
//     callback) {
//     super(scene)
//     this.scene = scene;
//     const width = phaserConfig.width / 2;
//     const height = phaserConfig.height / 2;
//     const msgBox = this.scene.add.group();

//     //creates button
//     const okButton = new Button(
//       scene,
//       x.x > 400 ? x.x : width,
//       height,
//       key2,
//       key3,
//       text1,
//       () => destroyFunc(decision1),
//       '20px'
//     );

//     // adds text in box
//     const text = this.scene.add.text(0, 0, description, {
//       fontSize: '20px',
//       fill: '#000',
//       wordWrap: { width: 220 },
//       align: 'center',
//     }).setDepth(7);
//     Phaser.Display.Align.In.TopCenter(text, box);
//     text.y = 210;

//     msgBox.add(box);
//     msgBox.add(text);

//     const destroyFunc = (decision) => {
//       callback(decision)

//       msgBox.destroy(true);

//       okButton.button.destroy();

//       okButton.text.destroy();

//       scene.messageBox = null;
//     }
//   }

// }
