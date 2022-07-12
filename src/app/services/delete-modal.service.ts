import {takeUntil} from 'rxjs/operators';
import {Injectable, OnDestroy, Optional} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalDeleteComponent} from '../modules/shared/modals/modal-delete-user/modal-delete-user.component';
import {Subject} from 'rxjs';

@Injectable({
    providedIn:'root',

})

export class DeleteModalService implements OnDestroy {
    private destroy$ = new Subject<boolean>();
    constructor(
       @Optional() private dialog: MatDialog,


    ){}

    matModal(title:string){
        let dialog = this.dialog.open(ModalDeleteComponent, {
            panelClass: 'delete-modal',
            data:{title:title}
          });
         return dialog.afterClosed().pipe(
            takeUntil(this.destroy$)
          )
    }
    ngOnDestroy() {
        this.destroy$.next(true)
        this.destroy$.unsubscribe()
      }
}
