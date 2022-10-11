import instance from "./instance";

class CommentHTTP {
  private instance = instance;

  async getCommment() {
    return await this.instance.get("/apis/visitor/comments");
  }

  async createComment(body: any) {
    return await this.instance.post("/apis/visitor/comment", body);
  }
}

const commentAPI = new CommentHTTP();

export default commentAPI;
