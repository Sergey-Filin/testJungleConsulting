import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type
} from '@angular/core';
import { filter, takeUntil } from "rxjs";
import { CustomOverlayRef } from "@shared/modules/modal/classes/custom-overlay-ref";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { DestroySubscription } from "@helpers/classes";
import { MODAL_ADDITIONAL_CONFIG } from "@shared/modules/modal/classes";
import { CustomOverlayConfig } from "@shared/modules/modal/interface/custom-overlay-config";
import { OverlayRefStorageService } from "@shared/modules/modal/services/overlay-ref-storage.service";
import { BlockScrollStrategy } from "@angular/cdk/overlay";
import { addPointerEvents, addScroll, removePointerEvents, removeScroll } from "@helpers/functions";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent extends DestroySubscription implements OnInit, OnDestroy {

  contentType: 'template' | 'string' | 'component';
  // content: string | TemplateRef<any> | Type<any> ;
  contentString: string;
  contentTemplate: TemplateRef<any>;
  contentComponent: Type<any> ;
  context;
  showCloseBtn = true;

  constructor(
    private readonly ref: CustomOverlayRef,
    private readonly router: Router,
    @Inject(MODAL_ADDITIONAL_CONFIG) private readonly customOverlayConfig: CustomOverlayConfig,
    private readonly overlayRefStorage: OverlayRefStorageService,
  ) {
    super();
  }

  ngOnInit() {
    // this.content = this.ref.content;
    this.detectContentType();

    const config = this.ref.overlay.getConfig();
    if (config.scrollStrategy instanceof BlockScrollStrategy) {
      removeScroll();
    }
    if (config.disposeOnNavigation) {
      this.disposeOnNavigation();
    }

    const {overlayPointerEvents, animation} = this.customOverlayConfig;
    if (overlayPointerEvents) {
      addPointerEvents();
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.ref.removeLastModalRef();
    const hasOpenedModalWithGlobalPosition = this.overlayRefStorage.hasOpenedModalWithGlobalPosition();
    if (hasOpenedModalWithGlobalPosition) {
      return;
    }
    addScroll();
    const customConfig = this.customOverlayConfig;
    if (customConfig && customConfig.overlayPointerEvents) {
      removePointerEvents();
    }
  }

  close() {
    this.ref.close(this.ref.backdropClickData);
  }

  private detectContentType(): void {
    if (typeof this.ref.content === 'string') {
      this.contentType = 'string';
      this.contentString = this.ref.content;
    } else if (this.ref.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.contentTemplate = this.ref.content;
      this.context = {
        close: this.ref.close.bind(this.ref),
      };
    } else {
      this.contentType = 'component';
      this.contentComponent = this.ref.content;
    }
    const customConfig = this.customOverlayConfig;
    if (customConfig && customConfig.disableCloseBtn) {
      this.showCloseBtn = false;
    }
  }

  private disposeOnNavigation(): void {
    const currentUrl = this.router.url;
    this.router.events.pipe(
      filter((e) => e instanceof RoutesRecognized),
      takeUntil(this.destroyStream$),
    ).subscribe((e: RoutesRecognized) => {
      if (e.urlAfterRedirects !== currentUrl) {
        this.close();
      }
    });
  }
}
