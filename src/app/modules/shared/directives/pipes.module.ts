import {NgModule} from '@angular/core';
import {DateUtcPipe} from "../../../helpers/date.pipe";


@NgModule({
  declarations: [DateUtcPipe],
  exports: [DateUtcPipe]
})
export class PipesModule { }
