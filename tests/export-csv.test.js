const request = require('supertest');
const app = require('../app');

describe('Export Analytics as CSV', () => {
  it('should export analytics data as a CSV file', async () => {
    const res = await request(app).get('/export/csv');
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toContain('text/csv');
    expect(res.text).toContain('GameName');
    expect(res.text).toContain('SessionCount');
    expect(res.text).toContain('LastPlayed');
  });
});
