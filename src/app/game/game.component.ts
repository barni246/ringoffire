import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore, AngularFirestoreDocument, CollectionReference, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, setDoc, doc, addDoc, docData } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { getDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { getFirestore } from "firebase/firestore";






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

  firestore: Firestore = inject(Firestore);
  item$: Observable<any[]>;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }




  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log('params', params['id']);

      // Es ist ein id aus dem Firebase: 'OcUYdXAJ8m4dT5ocjCjH'; 

      const itemCollection = collection(this.firestore, 'games');
      this.item$ = collectionData(itemCollection);
      this.item$.subscribe((game: any) => {
        console.log('game update', game);

        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });


    });


    // this.firestoreAng.collection('games')
    // .valueChanges()
    // .subscribe((game) => {
    //   console.log('game update AngularFirestore', game);
    // })

    // const coll = collection(this.firestore, 'games'); // Sammlung ansprechen
    //  setDoc(doc(coll),this.game.toJson() );                // hier kann ich in der Datenbank speichern
    // console.log('Game update',this.game.toJson())
    // this.firestoreAng.collection('games').valueChanges().subscribe((game) => {
    //   console.log('Game update', game);
    // })


  }





  async newGame() {
    this.game = new Game();
    // const coll = collection(this.firestore, 'games');
    // console.log('Document written with ID:', coll);
    // let gameInfo = await addDoc(coll,  {
    //   game: this.game.toJson()
    // });
    // console.log('gameInfo.id',gameInfo.id);

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