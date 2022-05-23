import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTreeComponent } from './single-tree.component';

describe('SingleTreeComponent', () => {
  let component: SingleTreeComponent;
  let fixture: ComponentFixture<SingleTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
