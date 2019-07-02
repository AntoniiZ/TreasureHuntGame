class Start extends Phaser.Scene{
    constructor(){
        super("start")
    }

    create(){
        this.btn1 = this.add.image(400, 300, "play").setScale(0.2);
        this.btn1.setInteractive();
        this.input.on('gameobjectdown', this.StartGame, this);
    }

    StartGame(){
      this.scene.start("maze");
    }

}
