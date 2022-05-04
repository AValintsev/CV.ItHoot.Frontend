import { Observable } from 'rxjs';
import { ICv } from '../../../../shared/models/cvEditorModels/EditorModels';
import { Component, OnInit } from '@angular/core';
import { CvEditorService } from '../../cv-editor.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  filleData$!: Observable<string>;
  selectedFile!: File;

  cv!: ICv;

  constructor(private cvEditorService : CvEditorService) {

  }

  ngOnInit(): void {

    this.filleData$ = this.cvEditorService.filleData$ ;

    this.cvEditorService.cv$
      .subscribe(cv => this.cv = cv);
  }

  onCLick(){
    console.log(this.cv);
  }


  onFileSelected($event: any){
    var mimeType = $event.target.files[0].type

    if (mimeType.match(/image\/*/) == null) {
			// this.msg = "Only images are supported";
			return;
		}

    var reader = new FileReader();
		reader.readAsDataURL($event.target.files[0]);

    reader.onload = (_event) => {
      this.cvEditorService.uploadFile(<string>reader.result)
		}
  }
}
