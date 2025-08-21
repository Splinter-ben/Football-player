import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPlayer } from './item-player';

describe('ItemPlayer', () => {
  let component: ItemPlayer;
  let fixture: ComponentFixture<ItemPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
