import * as request from 'supertest';
import { APP_URL } from './constants';

describe('IpController (e2e)', () => {
  const app = APP_URL;

  describe('ips/ (GET)', () => {
    it.each([
      {
        query: '',
        errors: {
          ip: 'ip must be an ip address, ip should not be empty',
        },
      },
      {
        query: 'ip=',
        errors: {
          ip: 'ip must be an ip address, ip should not be empty',
        },
      },
      {
        query: 'ip=INVALIUD',
        errors: {
          ip: 'ip must be an ip address',
        },
      },
    ])('422 - should reject when $query', ({ query, errors }) => {
      return request(app)
        .get('/ips')
        .query(query)
        .expect(422)
        .expect((res) => {
          expect(res.body).toEqual({
            status: 422,
            errors,
          });
        });
    });

    it('200 - should return details about given ip', () => {
      return request(app)
        .get('/ips')
        .query({ ip: '8.8.4.4' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchSnapshot({
            timezone: {
              current_time: expect.any(String),
            },
          });
        });
    });
  });
});
