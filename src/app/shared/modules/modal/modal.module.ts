import {Overlay, OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {Injector, NgModule, NgZone} from '@angular/core';
import {CustomOverlayRef} from './classes/custom-overlay-ref';
import {OverlayComponent} from './components/overlay/overlay.component';
import {OverlayRefStorageService} from './services/overlay-ref-storage.service';
import {OverlayService} from './services/overlay.service';
import { AppModalConfig } from "@shared/modules/modal/interface/app-modal-config";
import { APP_MODAL_CONFIG, MODAL_DATA } from "@shared/modules/modal/classes";

export const overlayServiceFactory = (
  overlay: Overlay,
  injector: Injector,
  config: AppModalConfig,
  zone: NgZone,
  overlayRefStorageService: OverlayRefStorageService,
): OverlayService => new OverlayService(overlay, injector, config, zone, overlayRefStorageService);

@NgModule({
  declarations: [
    OverlayComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    { provide: MODAL_DATA, useValue: {} },
    { provide: APP_MODAL_CONFIG, useValue: {} },
    { provide: CustomOverlayRef, useValue: {} },
    {
      provide: OverlayService,
      useFactory: overlayServiceFactory,
      deps: [Overlay, Injector, APP_MODAL_CONFIG, NgZone, OverlayRefStorageService],
    },
  ],
})
export class ModalModule {
}
