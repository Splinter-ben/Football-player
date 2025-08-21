import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPlayer } from './navbar-player';

describe('NavbarPlayer', () => {
  let component: NavbarPlayer;
  let fixture: ComponentFixture<NavbarPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
