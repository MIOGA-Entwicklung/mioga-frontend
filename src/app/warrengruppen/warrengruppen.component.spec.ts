import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrengruppenComponent } from './warrengruppen.component';

describe('WarrengruppenComponent', () => {
  let component: WarrengruppenComponent;
  let fixture: ComponentFixture<WarrengruppenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrengruppenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrengruppenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
