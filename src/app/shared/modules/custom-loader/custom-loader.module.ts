import {CommonModule} from '@angular/common';
import {Injector, NgModule, Optional, SkipSelf} from '@angular/core';
import {LoaderComponent} from './components/loader/loader.component';
import {
  LoaderServiceInjector,
  setLoaderServiceInjector
} from "@shared/modules/custom-loader/models/loader-service.injector";

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
  ],
  exports: [LoaderComponent],
})
export class CustomLoaderModule {

  constructor(
      private readonly injector: Injector,
      @Optional() @SkipSelf() private parentModule: CustomLoaderModule,
  ) {
    this.setLoaderInjector();
  }

  private setLoaderInjector(): void {
    if (!this.parentModule && !LoaderServiceInjector) {
      setLoaderServiceInjector(this.injector);
    }
  }
}
