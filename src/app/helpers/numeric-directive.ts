import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: "[numeric]"
})
export class NumericDirective {
  @Input() separator:string = ',';
  @Input() maxlength :number=2;
  @Input() allowNegative: boolean = false;

  private readonly regex: RegExp;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home',  'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
    if(this.allowNegative){
      this.specialKeys.push('-')
    }
    const pattern =    "^\\s*((\\d+(\\"+ this.separator +"\\d{0," +
    this.maxlength +
      "})?)|((\\d*(\\"+ this.separator +"\\d{1," +
      this.maxlength+
      "}))))\\s*$";
    this.regex = new RegExp(pattern);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? this.separator : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
