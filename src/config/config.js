import 'phaser';
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  backgroundColor: '#dddddd',
  plugins: {
    scene: [{
      key: 'rexBoard',
      plugin: BoardPlugin,
      mapping: 'rexBoard'
    },
  ]
}
};
