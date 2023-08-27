import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposDetailsInfoComponent } from './components/repos-details-info/repos-details-info.component';
import { IconsModule } from "@shared/modules/icons/icons.module";
import { IconRegistryService } from "@shared/modules/icons/services/icon-registry.service";
import { arrowIcon, crossIcon } from "@shared/modules/icons/icons";

@NgModule({
  declarations: [
    ReposDetailsInfoComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
  ]
})
export class ReposDetailsInfoModule {
  constructor(private readonly iconRegistryService: IconRegistryService) {
    this.iconRegistryService.registryIcons([crossIcon, arrowIcon]);
  }
}
