import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneMask]',
})
export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event:any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event:any) {
    this.onInputChange(event.target.value, true);
  }
  @HostListener('input', ['$event.target.value'])
  onInput(value: any) {
    this.onInputChange(value, false);
  }
  
  

  onInputChange(event:any, backspace:any) {
    // if(eve)
    let newVal = event?.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (!newVal || newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 7) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,4})/, '$1-$2');
    } else if (newVal.length <= 14) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,4})(\d{0,7})/, '$1-$2-$3');
    }
    //  else if (newVal.length <= 15) {
    // newVal = newVal.replace(/^(\d{0,3})(\d{0,4})(\d{0,7})(\d{0,1})/, '$1-$2-$3-$4');
    // } 
    else if (newVal.length <= 15) {
      newVal = newVal.substring(0, 15);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,4})(\d{0,7})(\d{0,1})/, '$1-$2-$3-$4');
    }
  //  this.ngControl.valueAccessor?.writeValue(newVal);
  this.ngControl.control?.setValue(newVal, { emitEvent: false });
  }
}
