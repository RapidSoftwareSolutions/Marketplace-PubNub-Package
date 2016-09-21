const app     = require('../index');
const assert  = require('chai').assert;
const request = require('supertest-as-promised');

const subscribeKey     = 'sub-c-e2601c94-7f40-11e6-a627-0619f8945a4f',
      publishKey       = 'pub-c-3fe2b358-e2b0-41d8-9bfe-833b6351f70c';
      message          = JSON.stringify({text: 'Hello World'});

describe('PubNub API', () => {
    it('should return a timetoken', function() {
      this.timeout(10000);

      return request(app)
        .post(`/api/${global.PACKAGE_NAME}/publishMessage`)
        .send({args:{subscribeKey, publishKey, message}})
        .expect(200)
        .then((res) => {
           assert.equal(res.body.callback, 'success');
        });
    });
});
