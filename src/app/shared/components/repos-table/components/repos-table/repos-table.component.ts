import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReposModelI } from "@shared/models";

@Component({
  selector: 'app-repos-table',
  templateUrl: './repos-table.component.html',
  styleUrls: ['./repos-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposTableComponent {

    @Input() tableData: ReposModelI[];
    @Output() repos: EventEmitter<ReposModelI> = new EventEmitter<ReposModelI>();

    openRepos(item: ReposModelI): void {
        this.repos.emit(item);
    }
}
