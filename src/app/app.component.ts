import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'memory-game';
  isStart: boolean = false;
  gameIcons: any[] = [];
  firstCard: any;
  firstCardIndex: any;
  moves : number = 0;

  ngOnInit(): void {
    this.shuffleArray();
  }
  newGame() {
    console.log('New Game');
    this.shuffleArray();
    this.isStart = !this.isStart;
  }
  changeView(j: any) {
    this.gameIcons[j].match = !this.gameIcons[j].match;
    if (!this.firstCard) {
      this.firstCard = this.gameIcons[j];
      this.firstCardIndex = j;
    }
    else {
      setTimeout(() => {
        if (this.firstCard.id !== this.gameIcons[j].id) {
        this.gameIcons[this.firstCardIndex].match = false;
        this.gameIcons[j].match = false;
      }
      this.firstCard = null;
      this.moves+=1;
      this.checkIsCompleted();
    },500);
    }
  }
  shuffleArray() {
    this.gameIcons = [];
    this.moves = 0;
    this.firstCard = null;
    for (let i = 1; i < 9; i++)
      this.gameIcons.push({ id: i, match: false }, { id: i, match: false });
    this.gameIcons.sort(() => 0.5 - Math.random());
  }

  checkIsCompleted(){
    if (this.gameIcons.filter((card)=>card.match).length===16){
      alert('You Won!!!');
      this.shuffleArray();
    }
  }
}
