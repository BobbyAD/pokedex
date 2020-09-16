const request = require("supertest");
const app = require("../api/server");

const admin = require("firebase");

admin.initializeApp({
    apiKey: "AIzaSyARjLBNGX1Bnpmstp6DQEHzShrAx_-O728",
    authDomain: "pokedex-289717.firebaseapp.com",
    databaseURL: "https://pokedex-289717.firebaseio.com",
    projectId: "pokedex-289717",
    storageBucket: "pokedex-289717.appspot.com",
    messagingSenderId: "42373598062",
    appId: "1:42373598062:web:bc4e323f74819441488f7f",
});

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
});

describe("Firebase Auth Testing", () => {
    it("Should return Accepted", async () => {
        const login = await admin
            .auth()
            .signInWithEmailAndPassword(
                `${process.env.TEST_EMAIL}`,
                `${process.env.TEST_PASS}`
            );
        const token = await admin.auth().currentUser.getIdToken();

        const expected = { status: "Accepted" };
        const response = await request(server)
            .get("/api/user/user")
            .set({ authorization: `Bearer ${token}` });

        return expect(response.body).toMatchObject(expected);
    });
});
