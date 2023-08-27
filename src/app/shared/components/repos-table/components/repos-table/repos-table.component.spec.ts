import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposTableComponent } from './repos-table.component';

describe('ReposTableComponent', () => {
  let component: ReposTableComponent;
  let fixture: ComponentFixture<ReposTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposTableComponent]
    });
    fixture = TestBed.createComponent(ReposTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
