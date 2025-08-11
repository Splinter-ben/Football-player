import { TestBed } from '@angular/core/testing';
import { Players } from '../components/players/players';

describe('Players', () => {
  let service: Players;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Players);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
