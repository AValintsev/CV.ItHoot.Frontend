import { ICv } from 'src/app/models/cvEditorModels/EditorModels';
import { Component, Input, OnInit } from '@angular/core';
import { CvEditorService } from '../../cv-editor.service';

@Component({
  selector: 'cv-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Input() aboutMy?: string;
  cv!: ICv;

  constructor(private _cvEditorService: CvEditorService) {

  }

  ngOnInit(): void {
    this.cv = this._cvEditorService.getCurrentCv;
  }

  onHtml($event: any) {
    console.log(this.aboutMy)
  }
}
