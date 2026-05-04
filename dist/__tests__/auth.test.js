import request from "supertest";
import server from "../app.js";
import prisma from "../libs/prisma.js";
// Barcha testlardan oldin bir marta ishga tushadi
beforeAll(async () => {
    await prisma.member.deleteMany({
        where: { memberPhone: "01021455662" },
    });
    await request(server).post("/auth/signup").send({
        memberNick: "damirtest",
        memberPhone: "01021455662",
        memberPassword: "damir2020",
    });
});
// Barcha testlar tugagach tozalash
afterAll(async () => {
    await prisma.member.deleteMany({
        where: {
            memberPhone: {
                in: ["01021455662", "998901234567"],
            },
        },
    });
    await prisma.$disconnect();
});
describe("Auth API", () => {
    it("signup — qisqa nick bilan 400 kelishi kerak", async () => {
        const res = await request(server).post("/auth/signup").send({
            memberNick: "a",
            memberPhone: "123",
            memberPassword: "123",
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Validation error");
    });
    it("signup — to'g'ri ma'lumot bilan 200 kelishi kerak", async () => {
        const res = await request(server).post("/auth/signup").send({
            memberNick: "alibek", // ✅ boshqa nick
            memberPhone: "998901234567", // ✅ boshqa phone
            memberPassword: "damir2020",
        });
        expect(res.status).toBe(200);
    });
});
describe("Login API", () => {
    it("login - qisqa password va phone bolsa 400 kelishi kerak", async () => {
        const res = await request(server).post("/auth/login").send({
            memberPhone: "123",
            memberPassword: "123",
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Validation error");
    });
    it("login - togri malumot bilan 200 kelishi kerak", async () => {
        const res = await request(server).post("/auth/login").send({
            memberPhone: "01021455662",
            memberPassword: "damir2020",
        });
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=auth.test.js.map