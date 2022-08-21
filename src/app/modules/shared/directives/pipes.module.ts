import {NgModule} from '@angular/core';
import {DateUtcPipe, DateUtcPipeWithTime} from "../../../helpers/date.pipe";


@NgModule({
  declarations: [DateUtcPipe,DateUtcPipeWithTime],
  exports: [DateUtcPipe,DateUtcPipeWithTime]
})
export class PipesModule { }
