import * as request from 'supertest';

export const APP_URL = `http://localhost:${process.env.APP_PORT}`;

describe('IpController (e2e)', () => {
  describe('/ips/ (GET)', () => {
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
      return request(APP_URL)
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
      return request(APP_URL)
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

  describe('/ips/ (DELETE)', () => {
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
      return request(APP_URL)
        .delete('/ips')
        .query(query)
        .expect(422)
        .expect((res) => {
          expect(res.body).toEqual({
            status: 422,
            errors,
          });
        });
    });

    it('204 - should delete details when previously stored', async () => {
      const { ip } = await request(APP_URL)
        .get('/ips')
        .query({ ip: '8.8.4.4' })
        .expect(200)
        .then(({ body }) => body);

      await request(APP_URL).delete('/ips').query({ ip }).expect(204);
    });
  });
});
