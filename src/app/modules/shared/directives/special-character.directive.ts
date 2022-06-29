import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[specialIsAlphaNumeric]'
})
export class SpecialCharacterDirective {

  regexStr = /\d/;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event:KeyboardEvent) {
    if((/^0+/g).test(this.el.nativeElement.value)){
      this.validateFields(event);
    }
    return new RegExp(this.regexStr).test(event.key)
  }
  @HostListener('input', ['$event']) onInput(event:KeyboardEvent) {
    if (+(event.target as HTMLInputElement).value<0){
      this.el.nativeElement.value = 0
    }
    return new RegExp(this.regexStr).test(event.key)
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event:Event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/^(0){0,}/g, '').replace(/\D/g,'');
      event.preventDefault();
    }, 100)
  }
}