import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[specialIsAlphaNumeric]'
})
export class SpecialCharacterDirective {

  regexStr = /\d/;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event:KeyboardEvent) {
    return new RegExp(this.regexStr).test(event.key)
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event:Event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[\D]/g, '');
      event.preventDefault();
    }, 100)
  }

}