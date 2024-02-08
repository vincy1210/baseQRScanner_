import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class ModalPopupService {
  constructor(private dialog: MatDialog) { }

  openPopup<T>(component: any, data: any): MatDialogRef<any> {
    let direction: 'ltr' | 'rtl' = 'ltr';
    const elements = document.querySelectorAll('.app-container');
    elements.forEach(element => {
      const dataAttribute = element.getAttribute('dir');
      direction = (dataAttribute === 'ltr' || dataAttribute === 'rtl') ? dataAttribute : direction;
    });
    return this.dialog.open(component, {
      width: '70%',
      data: data,
      disableClose: true,
      direction: direction
    });
  }

  closePopup(dialogRef: MatDialogRef<any>) {
    dialogRef.close('closed forcefully');
  }
}