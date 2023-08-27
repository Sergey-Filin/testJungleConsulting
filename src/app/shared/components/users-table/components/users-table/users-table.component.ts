import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserI } from "@shared/models";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent {

  @Input() tableData: UserI[];

}
