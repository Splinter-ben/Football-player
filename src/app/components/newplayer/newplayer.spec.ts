import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newplayer } from './newplayer';

describe('Newplayer', () => {
  let component: Newplayer;
  let fixture: ComponentFixture<Newplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newplayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
