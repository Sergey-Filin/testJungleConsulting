import { Injectable } from '@angular/core';
import { IconI } from "@shared/modules/icons/models/icon.model";

@Injectable()
export class IconRegistryService {

  private readonly registry = new Map<string, string>();

  constructor() {}

  registryIcons(icons: IconI[]): void {
    icons.forEach((icon) => this.registry.set(icon.name, icon.data));
  }

  getIcon(iconName: string): string | undefined {
    const registry = this.registry;
    if (!registry.has(iconName)) {
      console.warn(`Icon "${iconName}" not found. Please add to icon registry`);
    }
    return registry.get(iconName);
  }

}
