import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Itest} from 'src/app/models/cv-test';

@Component({
    selector: 'app-cv-test',
    templateUrl: './cv-test.component.html',
    styleUrls:[ './cv-test.component.scss']

})

export class CvTestComponent implements OnInit{
    formTest!:FormGroup;
    value:Itest = {id :1,vlue:"еуіе value",aray:[
        {idAray:1,valueAray:'value1'},
        {idAray:2,valueAray:"value2"},
        {idAray:3,valueAray:"value3"},
    ]}

    constructor(private fb: FormBuilder) {}

    ngOnInit(){
        this.formTest = this.fb.group(({
            id:["11"],
            value:["222"],
            testAray:this.fb.array([
                this.fb.group({
                    itemId:["333"],
                    itemValue:["4444"]
                })
            ])
        }))
        this.value.aray.forEach(p => this.addItemArayVithAPI(p.idAray, p.valueAray))
        console.log(this.testAray,"+++++");
    }

    get testAray(){
        return this.formTest.get('testAray') as FormArray
    }

    addItemArayVithAPI(idAray:number, valueAray:string) {
        this.testAray.push(this.fb.group({
            itemId:[idAray],
            itemValue:[valueAray]
        }));
    }

    valueItemById(id:number){
        if(this.testAray.value[id]!= null){
            return  this.testAray.value[id]
        }
        else return null;
    }

    submit(){
        console.log(this.formTest)
    }

}
