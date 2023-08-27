import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { IconRegistryService } from "@shared/modules/icons/services/icon-registry.service";

function iconRegistryServiceFactory(): IconRegistryService {
  return new IconRegistryService();
}

@NgModule({
  declarations: [
    IconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconComponent
  ]
})
export class IconsModule {
  static forRoot(): ModuleWithProviders<IconsModule> {
    return {
      ngModule: IconsModule,
      providers: [
        {
          provide: IconRegistryService,
          useFactory: iconRegistryServiceFactory,
        },
      ],
    };
  }
}
