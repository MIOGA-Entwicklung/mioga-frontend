import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuliefererComponent } from './zulieferer.component';

describe('ZuliefererComponent', () => {
  let component: ZuliefererComponent;
  let fixture: ComponentFixture<ZuliefererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZuliefererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZuliefererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
