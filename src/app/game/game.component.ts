import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
 // currentCard: string | undefined = '';
  currentCard: string  = '';
  game: Game;


  ngOnInit() {
    this.newGame();
  }

  constructor(public dialog: MatDialog) {

  }

  newGame() {
    this.game  = new Game();
    console.log(this.game);
  }


  takeCard() {

    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      setTimeout(() => {
       // if (this.currentCard) {
          this.game.playedCards.push(this.currentCard);
      //  }
        this.pickCardAnimation = false;
      }, 1000);
    }
  }



openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name: string )=> {
    this.game.players.push(name);
  });
}
}