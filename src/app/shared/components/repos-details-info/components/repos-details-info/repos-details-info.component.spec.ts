import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposDetailsInfoComponent } from './repos-details-info.component';

describe('ReposDetailsInfoComponent', () => {
  let component: ReposDetailsInfoComponent;
  let fixture: ComponentFixture<ReposDetailsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposDetailsInfoComponent]
    });
    fixture = TestBed.createComponent(ReposDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
