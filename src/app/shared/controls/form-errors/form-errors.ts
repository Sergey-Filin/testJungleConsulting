import {InjectionToken} from '@angular/core';

export enum ControlStatus {
    valid,
    invalid
}

export class CustomFormError {
  constructor(public readonly key: string, public readonly value?: string | null) {
  }
}

export type CustomFormErrorFn = (
  value?: { [key: string]: string | number } | string | number | null
) => CustomFormError;

export interface CustomFormErrors {
  [key: string]: CustomFormErrorFn;
}

export const defaultErrors: CustomFormErrors = {
  server: (message) => new CustomFormError(`${message}`),
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  factory: () => defaultErrors,
});
