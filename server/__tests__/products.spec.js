const { products, bag, wishlist } = require('../graphql/Query/query');
const {
  addToBag,
  removeFromBag,
  addToWishlist,
  removeFromWishlist
} = require('../graphql/Mutation/mutation');

let req = {};
const pubsub = {
  publish: null,
};

beforeEach(() => {
  req = {
    session: {
      bag: {},
      wishlist: {}
    }
  }
  pubsub.publish = jest.fn();
});

describe('Products', () => {
  test('should return all products', () => {
    const p = products(null, {}, { req });
    expect(p.length).toBe(60);
  });

  test('should return 10 products from index 10', () => {
    const p = products(null, { offset: 10, limit: 10 }, { req });
    expect(p.length).toBe(10);
    expect(p[0].id).toBe("11");
    expect(p[9].id).toBe("20");
  });

  test('should return bag products', () => {
    req.session.bag = {
      '10': 1,
      '20': 1
    }
    const p = bag(null, { }, { req });
    expect(p.length).toBe(2);
    expect(p[0].id).toBe('10');
    expect(p[0].isInBag).toBeTruthy();
    expect(p[1].id).toBe('20');
    expect(p[1].isInBag).toBeTruthy();
  });

  test('should return wishlist products', () => {
    req.session.wishlist = {
      '2': 1,
      '3': 1
    }
    const p = wishlist(null, {}, { req });
    expect(p.length).toBe(2);
    expect(p[0].id).toBe('2');
    expect(p[0].isInWishlist).toBeTruthy();
    expect(p[1].id).toBe('3');
    expect(p[1].isInWishlist).toBeTruthy();
  });

  test('should save product "10" in bag and emit', () => {
    const p = addToBag(null, { id: '10' }, { req, pubsub })
    expect(req.session.bag['10']).toBe(1);
    expect(p.length).toBe(1);
    expect(p[0].id).toBe("10");
    expect(p[0].isInBag).toBeTruthy();
    expect(pubsub.publish.mock.calls.length).toBe(1);
  })

  test('should remove product "10" from bag and emit', () => {
    req.session.bag = {
      '10': 1
    };
    const p = removeFromBag(null, { id: '10' }, { req, pubsub })
    expect(req.session.bag['10']).toBeUndefined();
    expect(p.length).toBe(0);
    expect(pubsub.publish.mock.calls.length).toBe(1);
  })

  test('should save product "10" in wishlist and emit', () => {
    const p = addToWishlist(null, { id: '10' }, { req, pubsub })
    expect(req.session.wishlist['10']).toBe(1);
    expect(p.length).toBe(1);
    expect(p[0].id).toBe("10");
    expect(p[0].isInWishlist).toBeTruthy();
    expect(pubsub.publish.mock.calls.length).toBe(1);
  })

  test('should remove product "10" from wishlist and emit', () => {
    req.session.wishlist = {
      '10': 1
    };
    const p = removeFromWishlist(null, { id: '10' }, { req, pubsub })
    expect(req.session.wishlist['10']).toBeUndefined();
    expect(p.length).toBe(0);
    expect(pubsub.publish.mock.calls.length).toBe(1);
  })
});
