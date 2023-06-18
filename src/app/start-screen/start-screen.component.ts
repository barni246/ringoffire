import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

constructor(private firestore: AngularFirestore,
  private router: Router) {

}

@Input() redBorder: boolean = false;

  newGame() {
    this.redBorder = true;
    let game = new Game();
    this.firestore.collection('games')
    .add(game.toJson())
    .then((gameInfo: any) => {
      console.log('gameInfo',gameInfo.id);
      
       this.router.navigateByUrl('/game/' + gameInfo.id);
    });
   
  }


 
}
