import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuliefererContentComponent } from './zulieferer-content.component';

describe('ZuliefererContentComponent', () => {
  let component: ZuliefererContentComponent;
  let fixture: ComponentFixture<ZuliefererContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZuliefererContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZuliefererContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
