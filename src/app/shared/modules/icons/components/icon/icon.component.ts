import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional
} from '@angular/core';
import { Icon, IconColor, iconColorList } from "@shared/modules/icons/models/icon.model";
import { IconRegistryService } from "@shared/modules/icons/services/icon-registry.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {

  private svgIcon: SVGElement;
  private iconName: Icon;
  private iconColor: IconColor;
  private strokeColor: IconColor;
  private pathColor: IconColor;
  private iconWidth: string | number;
  private iconHeight: string | number;
  private mouseover: boolean;

  @Input()
  set name(iconName: Icon | undefined) {
    if (!iconName || iconName === this.iconName) {
      return;
    }
    this.iconName = iconName;
    if (this.svgIcon) {
      this.elementRef.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.iconRegistryService.getIcon(iconName);
    if (!svgData) {
      return;
    }
    this.svgIcon = this.svgElementFromString(svgData);
    if (this.iconColor) {
      this.svgIcon.style.fill = this.findColor(this.iconColor);
    }
    if (this.strokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.strokeColor);
    }
    if (this.iconWidth) {
      this.svgIcon.setAttribute('width', `${this.iconWidth}px`);
    }
    if (this.iconHeight) {
      this.svgIcon.setAttribute('height', `${this.iconHeight}px`);
    }
    this.elementRef.nativeElement.appendChild(this.svgIcon);
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly iconRegistryService: IconRegistryService,
    @Optional() @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }


  private findColor(color: IconColor): string {
    const selectedColor = iconColorList.find((item) => item.name === color);
    if (!selectedColor) {
      return '#ffffff';
    }
    return selectedColor.color;
  }
}
