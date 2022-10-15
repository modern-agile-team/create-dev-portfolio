const {
  REACT_APP_NODE_ENV, //
  REACT_APP_SERVER_HOST_ADDRESS, //
  REACT_APP_SERVER_PORT, //
} = process.env;

export class HTTP {
  private domain: string = "";

  constructor(domain: string) {
    this.domain = domain;
  }

  async get(api: string) {
    return await fetch(`${this.domain}${api}`).then((res) => res.json());
  }

  async post(api: string, data: any) {
    return await fetch(`${this.domain}${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  async put(api: string, data: any) {
    return await fetch(`${this.domain}${api}`, {
      method: "PUT",
      ...data,
    }).then((res) => res.json());
  }

  async delete(api: string, data: any) {
    return await fetch(`${this.domain}${api}`, {
      method: "DELETE",
      ...data,
    }).then((res) => res.json());
  }

  async patch(api: string) {
    return await fetch(`${this.domain}${api}`, {
      method: "PATCH",
    }).then((res) => res.json());
  }
}

const instance = new HTTP(
  `http://${
    REACT_APP_NODE_ENV === "production"
      ? REACT_APP_SERVER_HOST_ADDRESS
      : "localhost"
  }:${REACT_APP_SERVER_PORT}`
);

export default instance;
