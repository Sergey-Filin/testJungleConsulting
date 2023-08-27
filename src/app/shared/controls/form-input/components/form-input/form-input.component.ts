import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges, Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlStatus } from "@shared/controls/form-errors/form-errors";

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements OnChanges, ControlValueAccessor {
  value: any;
  status = false;

  @Input() label = '';
  @Input() hint = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() type = 'text';
  @Input() autocomplete: string | null = null;
  @Input() needEye = true;

  @ViewChild('formInput', {static: true}) formInput: ElementRef;

  private onChangeFn = (value: any) => {
  };
  private onTouchedFn = () => {
  };

  constructor(
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const typeChanges = changes && changes['type'];
    if (typeChanges) {
      this.setInputValue('type', this.type);
    }
  }

  onChangeStatus(event: ControlStatus): void {
    if (this.status !== !!event) {
      this.status = !!event;
    }
  }

  onChangeValue(event: any): void {
    const value = event.target && event.target.value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  writeValue(value: string): void {
    this.value = value || '';
    this.setInputValue('value', this.value);
  }

  onTouched(): void {
    this.onTouchedFn();
  }

  onChange(value): void {
    this.onChangeFn(value);
  }

  private setInputValue(key: keyof HTMLInputElement, value: string | number): void {
    const input = this.formInput.nativeElement;
    if (!input) {
      return;
    }
    input[key] = value.toString();
  }
}
