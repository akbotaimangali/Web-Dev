import { TestBed } from '@angular/core/testing';

import { AlbumService } from './albums.service';

describe('AlbumsService', () => {
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});