import { TestBed } from '@angular/core/testing';

import { CartProvider } from './cart-provider.service';

describe('CartProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartProvider = TestBed.get(CartProvider);
    expect(service).toBeTruthy();
  });
});
