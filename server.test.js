const supertest = require('supertest');
const { app, server } = require('./server');

describe('GET /', () => {
	it('responds with 200', async () => {
		await supertest(app).get('/').expect(200);
	});
});

beforeAll((done) => {
	// Wait for the server to start before running tests
	server.on('listening', () => {
		done();
	});
});

afterAll((done) => {
	// Close the server after all tests are complete
	server.close(done);
});
