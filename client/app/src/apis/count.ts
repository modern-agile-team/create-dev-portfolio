import instance from "./instance";

class CountHTTP {
  private instance = instance;

  async getCount() {
    return await this.instance.patch("/apis/visitor/count");
  }
}

const countAPI = new CountHTTP();

export default countAPI;
