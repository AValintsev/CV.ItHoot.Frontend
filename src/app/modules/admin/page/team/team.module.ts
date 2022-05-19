import {NgModule} from '@angular/core';
import { TeamPageComponent } from './team-page/team-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {SkillRoutingModule} from "../skill/skill-routing.module";
import {TeamRoutingModule} from "./team-routing.module";
import {AdminCvListRouterModule} from "../cv-list/admin-cv-list-routing.module";


@NgModule({
  imports: [TeamRoutingModule]
})

export class TeamModule{}
