import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ModalDeleteUserComponent } from '../modal-delete-user/modal-delete-user.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  checkArray:number[]=[]
  click=false
  cardNumber!:number;
  toggle = true
  arr = [
    {id:1, selected:false},
    {id:2, selected:false},
    {id:3, selected:false},
    {id:4, selected:false},
    {id:5, selected:false},
    {id:6, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
    {id:7, selected:false},
  ]
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.arr, this.cardNumber)
  }
  deleteCard(i: number) {

    let dialogRef = this.dialog.open(ModalDeleteUserComponent, {
      height: '150px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe({
      next: response => {
          if (response) {
            this.click = true
            this.cardNumber = i
            this.arr = this.arr.filter(e=>e.id!=i)
            // console.log(this.arr,response,this.cardNumber,i)
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
  selectToggler(id:number,select:boolean){
          const selectedCard = this.arr.find(card=>card.id==id)
    if (select){
      this.checkArray.push(id)
        this.arr = this.arr.filter(card=>card.id!=id)
        if (selectedCard){
          this.arr.unshift(selectedCard)
        }
      this.arr = this.arr.map(card=>{
      
        if(card.id == id){
          return {id:id,selected:true}
        }
        return card
      })
    }else{
      this.checkArray = this.checkArray.filter(e=>e!=id)
      this.arr = this.arr.filter(card => card.id != id)
      if (selectedCard) {
        this.arr.push(selectedCard)
      }
      this.arr = this.arr.map(card => {
        if (card.id == id) {
          return { id: id, selected: false }
        }
        return card
      })
    }
    
  }
}