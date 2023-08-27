import {InjectionToken} from '@angular/core';
import { AppModalConfig } from "@shared/modules/modal/interface/app-modal-config";

export const MODAL_DATA = new InjectionToken('ModalData');
export const MODAL_ADDITIONAL_CONFIG = new InjectionToken('ModalAdditionalConfig');
export const APP_MODAL_CONFIG =  new InjectionToken<AppModalConfig>('SAppModalConfig');
