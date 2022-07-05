import { Component } from '@angular/core';
import { UserHeaderBtnService } from 'src/app/services/user-header-btn.service';

Component({
    providers:[UserHeaderBtnService]
});

export abstract class HeaderBtnComponent {
  constructor(private userHeaderBtnService: UserHeaderBtnService) {}
  public setHeaderBtn(params: string[]) {
    this.userHeaderBtnService.setBTNs(params);
  }
}
