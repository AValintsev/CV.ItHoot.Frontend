import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cv-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  toggle = true
  constructor() { }

  ngOnInit(): void {
  }

}
