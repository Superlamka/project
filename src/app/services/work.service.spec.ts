import { TestBed } from '@angular/core/testing';
import { WorkService } from './work.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('WorkService', () => {
  let service: WorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
