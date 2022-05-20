import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteAutoActiveComponent } from './autocomplete-auto-active.component';

describe('AutocompleteAutoActiveComponent', () => {
  let component: AutocompleteAutoActiveComponent;
  let fixture: ComponentFixture<AutocompleteAutoActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteAutoActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAutoActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
