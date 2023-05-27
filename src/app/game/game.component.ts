import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game: Game = new Game();


  ngOnInit() {
    this.newGame();
  }

  constructor() {

  }

  newGame() {
    this.game;
    console.log(this.game);
  }


  takeCard() {

    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);
    

     setTimeout(() => {
      if (this.currentCard) {
        this.game.playedCards.push(this.currentCard);
        console.log(this.game.playedCards);
      }
        this.pickCardAnimation = false;
      }, 1000);
    }


  }

}
