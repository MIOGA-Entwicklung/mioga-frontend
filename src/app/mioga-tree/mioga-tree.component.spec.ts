import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiogaTreeComponent } from './mioga-tree.component';

describe('MiogaTreeComponent', () => {
  let component: MiogaTreeComponent;
  let fixture: ComponentFixture<MiogaTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiogaTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiogaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
