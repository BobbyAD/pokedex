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

describe("get Pokemon by name", () => {
    it("should return OK status", () => {
        const expected = 200
        return request(server)
            .get("/api/pokeapi/name/charizard")
            .then((response) => {
                expect(response.status).toEqual(expected);
            });
    });

    it("should return charizard", () => {
        const expected = { name: "charizard" };
        return request(server)
            .get("/api/pokeapi/name/charizard")
            .then((response) => {
                expect(response.body).toMatchObject(expected);
            });
    });

    it("should return 404", () => {
        const expected = 404;
        return request(server)
            .get("/api/pokeapi/name/asdf")
            .then((response) => {
                expect(response.status).toEqual(expected);
            })
    })
});
