import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  // currentCard: string | undefined = '';
  currentCard: string = '';
  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log('params', params);

      this.gameId = params['id'];
      
      this.firestore.collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game) => {
          console.log('Game update', game);
        })

    });
    //const coll = collection(this.firestore, 'games'); // Sammlung ansprechen
    // setDoc(doc(coll), {game:""});                // hier kann ich in der Datenbank speichern
}



  newGame() {
    this.game = new Game();
    this.firestore.collection('games').add(this.game.toJson());
  }


  takeCard() {

    if (this.game.players.length == 0) {
      this.openDialog();
    }

    if (!this.pickCardAnimation && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        if (this.currentCard) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1000);
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }

    });
  }
}