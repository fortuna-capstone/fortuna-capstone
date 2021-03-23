import 'phaser' 
import Button from '../objects/Button'
import config from '../config/config'

export default class TitleScene extends Phaser.Scene{
    constructor(){
        super('Title')
    }
    preload(){        
        this.load.image('blueButton1', 'assets/blue_button02.png')
        this.load.image('blueButton2', 'assets/blue_button03.png')
    }
    create(){
        this.gameButton = new Button(this, config.width/2, config.height/2-100, 'blueButton1', 'blueButton2', "Play", "Game")
    }
}