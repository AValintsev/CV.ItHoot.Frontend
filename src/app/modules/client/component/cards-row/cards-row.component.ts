import { TeamDto } from './../../../../models/team/create-team-dto';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDeleteUserComponent } from '../modal-delete-user/modal-delete-user.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TeamResumeDto } from 'src/app/models/team/create-team-dto';

@Component({
  selector: 'cv-cards-row',
  templateUrl: './cards-row.component.html',
  styleUrls: ['./cards-row.component.scss'],
  animations: [
    trigger('hidden', [
      state('start', style({})),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({
          opacity: 0
        }))
      ])
    ])]
})
export class CardsRowComponent implements OnInit {
  @Input() cards$!: Observable<TeamDto>
  checkArray: number[] = []
  // click = false
  cardId!: number;
  toggle = true;
  teamId!: number
  arr: { id: number, isSelected: boolean }[] = [];
  resumeArray: TeamResumeDto[] = []

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getResumeArray()
  }

  getResumeArray() {
    this.cards$.subscribe({
      next: response => {
        console.log(response)
        this.resumeArray = response.resumes;
        this.teamId = response.id
      },
      error: error => console.log(error),
    })
  }
  deleteCard(id: number, event: Event) {
    event.stopPropagation()
    let dialogRef = this.dialog.open(ModalDeleteUserComponent, {
      height: '150px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe({
      next: response => {
        if (response) {
          // this.click = true
          this.cardId = id
          this.checkArray = this.checkArray.filter(e => e != id)
          this.arr = this.arr.filter(e => e.id != id)
          this.resumeArray = this.resumeArray.filter(e => e.id != id)
          // console.log(this.checkArray)
          // console.log(this.arr)
          // console.log(response)
          // console.log(this.resumeArray)
        }
      },
      error: error => console.log(error),
    })

  }
  calcTransform(i: number, item: number) {
    if (item <= 5) {
      return -60 * i
    } else if (item <= 10) {
      return -75 * i
    } else if (item <= 15) {
      return -85 * i
    } else if (item <= 20) {
      return -91 * i
    } else {
      return -94 * i
    }
  }

  showCard(i:number) {
    const card = this.resumeArray.splice(i,1)
    console.log(card)
   if(card){
     this.resumeArray.unshift(card[0])
   }
    
  }

  //   {
  //   "teamId": 12,
  //     "resumes": [
  //       {
  //         "id": 1,
  //         "isSelected": false
  //       }
  //     ]
  // }
  checkSelect(id: number) {
    return this.checkArray.filter(e => e == id).length
  }
  selectToggler(id: number, select: boolean,index:number, event: Event) {
    event.stopPropagation()
    if (select&&index==0) {  
      if (!this.arr.filter(e => e.id == id).length) {
        this.checkArray.push(id)
        this.arr.push({
          id,
          isSelected: true
        })
      }
    }
    console.log(this.arr)
  }
  // selectToggler(id:number,select:boolean){
  //         const selectedCard = this.arr.find(card=>card.id==id)
  //   if (select){
  //     this.checkArray.push(id)
  //       this.arr = this.arr.filter(card=>card.id!=id)
  //       if (selectedCard){
  //         this.arr.unshift(selectedCard)
  //       }
  //     this.arr = this.arr.map(card=>{

  //       if(card.id == id){
  //         return {id:id,selected:true}
  //       }
  //       return card
  //     })
  //   }else{
  //     this.checkArray = this.checkArray.filter(e=>e!=id)
  //     this.arr = this.arr.filter(card => card.id != id)
  //     if (selectedCard) {
  //       this.arr.push(selectedCard)
  //     }
  //     this.arr = this.arr.map(card => {
  //       if (card.id == id) {
  //         return { id: id, selected: false }
  //       }
  //       return card
  //     })
  //   }

  // }
}