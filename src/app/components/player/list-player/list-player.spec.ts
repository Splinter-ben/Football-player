import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlayer } from './list-player';

describe('ListPlayer', () => {
  let component: ListPlayer;
  let fixture: ComponentFixture<ListPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
