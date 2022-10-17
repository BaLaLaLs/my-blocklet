const request = require("supertest");
const app = require("../index");
describe("GET /api/txs", () => {
  it("传入正确hash参数", async () => {
    const res = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90");
    expect(res.body.code).toEqual(200);
    expect(res.body.message).toEqual("OK");
    expect(res.body.result).toBeInstanceOf(Array);
  }, 1000 * 10);
  it("不传入hash参数", async () => {
    const res = await request(app)
      .get("/api/txs");
    expect(res.body.code).toEqual(500);
    expect(res.body.message).toEqual("请输入正确的hash地址");
    expect(res.body.result).toBeNull();
  }, 1000 * 10);
  it("错误的hash参数", async () => {
    const res = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945");
    expect(res.body.code).toEqual(500);
    expect(res.body.message).toEqual("No transactions found");
    expect(res.body.result).toBeNull();
  }, 1000 * 10);
  it("分页", async () => {
    const res1 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&page=1");
    expect(res1.body.code).toEqual(200);
    expect(res1.body.message).toEqual("OK");
    expect(res1.body.result).toBeInstanceOf(Array);
    const data1 = res1.body.result;

    const res2 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&page=2");
    expect(res2.body.code).toEqual(200);
    expect(res2.body.message).toEqual("OK");
    expect(res2.body.result).toBeInstanceOf(Array);
    const data2 = res2.body.result;

    expect(data1.sort()).toEqual(expect.not.arrayContaining(data2.sort()));

  }, 1000 * 10);
  it("错误的分页", async () => {
    const res1 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&page=as1");
    expect(res1.body.code).toEqual(500);
    expect(res1.body.message).toEqual("请输入正确的页码");

  }, 1000 * 10);
  it("返回条数限定", async () => {
    const res1 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&offset=1");
    expect(res1.body.code).toEqual(200);
    expect(res1.body.message).toEqual("OK");
    expect(res1.body.result.length).toEqual(1);

    const res2 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&offset=2");
    expect(res2.body.code).toEqual(200);
    expect(res2.body.message).toEqual("OK");
    expect(res2.body.result.length).toEqual(2);
  }, 1000 * 10);
  it("排序", async () => {
    const res1 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&sort=asc");
    expect(res1.body.code).toEqual(200);
    expect(res1.body.message).toEqual("OK");
    expect(res1.body.result).toBeInstanceOf(Array);
    const data1 = res1.body.result;

    const res2 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&sort=desc");
    expect(res2.body.code).toEqual(200);
    expect(res2.body.message).toEqual("OK");
    expect(res2.body.result).toBeInstanceOf(Array);
    const data2 = res2.body.result;
    expect(data1.sort()).toEqual(expect.not.arrayContaining(data2.sort()));

  }, 1000 * 10);
  it("错误的排序", async () => {
    const res1 = await request(app)
      .get("/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&sort=asd");
    expect(res1.body.code).toEqual(500);
    expect(res1.body.message).toEqual("sort 只支持asc和desc");
  }, 1000 * 10);
});
