import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game/:id', component: GameComponent}
];

@NgModule({
<<<<<<< HEAD
  imports: [RouterModule.forRoot(routes)],  // , RouterModule.forRoot(routes, {useHash: true})
=======
  imports: [RouterModule.forRoot(routes)], //, RouterModule.forRoot(routes, {useHash: true})
>>>>>>> e4ddf217f3a65c38677be28fa27e79d445fe35d8
  exports: [RouterModule]
})
export class AppRoutingModule { }
