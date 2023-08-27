import { ChangeDetectionStrategy, Component } from '@angular/core';
import { debounceTime, Observable } from "rxjs";
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  loading$: Observable<boolean> = this.loaderService.loading$.pipe(
      debounceTime(0),
  );

  constructor(private readonly loaderService: LoaderService) { }

}
