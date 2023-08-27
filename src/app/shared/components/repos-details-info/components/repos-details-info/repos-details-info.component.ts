import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CustomOverlayRef, MODAL_DATA } from "@shared/modules/modal/classes";
import { ReposModelI } from "@shared/models";

@Component({
  selector: 'app-repos-details-info',
  templateUrl: './repos-details-info.component.html',
  styleUrls: ['./repos-details-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposDetailsInfoComponent {

  constructor(@Inject(MODAL_DATA) public readonly modalData: ReposModelI) {
  }

}
