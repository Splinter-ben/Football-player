import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editplayer } from './editplayer';

describe('Editplayer', () => {
  let component: Editplayer;
  let fixture: ComponentFixture<Editplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editplayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
