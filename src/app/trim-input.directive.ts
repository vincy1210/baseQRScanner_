import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appTrimInput]'
})
export class TrimInputDirective {
  constructor(private el: ElementRef) {}
  @HostListener("input", ["$event"])
  onInput(event: Event): void {

    console.log('calling appTrimInput'+ event)
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/^\s*$/, ""); // space
    value = value.replace(/=/g, ""); // =
    // value = value.replace(/\./g, ''); // .
    value = value.replace(/</g, ""); // <
    value = value.replace(/>/g, ""); // >
    value = value.replace(/\(/g, ""); // (
    value = value.replace(/\)/g, ""); // )
    this.el.nativeElement.value = value;
    // this.el.nativeElement.dispatchEvent(new Event("input"));
  }
}