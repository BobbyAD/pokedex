const request = require("supertest");
const app = require("../api/server");


// fix for jest not closing
beforeEach((done) => {
    server = app.listen(4000, (err) => {
        if (err) {
            return done(err);
        }
        agent = request.agent(server);
        done();
    });
});

afterEach((done) => {
    return server && server.close(done);
})

describe("Firebase Auth Testing", () => {
    
})