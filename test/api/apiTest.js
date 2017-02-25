const request = require('request');
const config = require('./apiConfig.json');
const METHODS = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'];
let {baseUrl} = config;

baseUrl = (baseUrl || '').replace(/\/$/, '');

let uMethod;
let expectation;
for (let api in config) {
  if (config.hasOwnProperty(api)) {
    describe(api, () => {

      for (let method in config[api]) {
        if (config[api].hasOwnProperty(method)) {

          uMethod = method.toUpperCase();

          if (!METHODS.indexOf(uMethod)) {
            continue;
          }

          expectation = Object.assign({
            status: 200
          }, config[api][method].expect);

          it(`Testing method '${method}'`, done => {

            request({
              method: uMethod,
              headers: Object.assign({}, config[api][method].headers),
              url: `${baseUrl}${api}`
            }, (error, response, body) => {

              if (error) {
                fail(error);
                return done();
              }

              expect(response.statusCode === expectation.status);

              if (expectation.body || expectation.data) {
                try {
                  body = JSON.parse(body);
                } catch (e) {
                  fail(e);
                  return done();
                }
                expect(body)
                  .toEqual(jasmine
                    .objectContainging(expectation.body || expectation.data));
              }

              done();

            });
          });

        }
      }

    });
  }
}
