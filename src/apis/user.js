import axios from "axios";

class UserApi {
  async getAllCategories() {
    const res = await axios.get(`https://dummyjson.com/products/categories`);
    return res.data;
  }

  async getAllProduct() {
    const res = await axios.get(`https://dummyjson.com/products`);
    return res.data;
  }

  async paginativeProducts(params) {
    const res = await axios.get(`https://dummyjson.com/products`, {
      params,
    });
    return res.data;
  }

  async getCartsUserById(id) {
    const res = await axios.get(`https://dummyjson.com/carts/user/${id}`);
    return res.data;
  }

  async addNewCart(params) {
    const headers = { "Content-Type": "application/json" };
    const res = await axios.post(`https://dummyjson.com/carts/add`, {
      params,
      headers,
    });
    return res.data;
  }
  async laravelPaginateProducts(params) {
    const userToken = sessionStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    };
    const res = await axios.get(`http://localhost:8081/api/admin/products`, {
      params,
      headers,
    });
    return res.data;
  }
  async checkoutLaravel(productID, data) {
    const userToken = sessionStorage.getItem("token");
    const headers = userToken ? { Authorization: "Bearer " + userToken } : {};
    // post với put dugnf cia snayf
    const res = await axios.put(
      `http://localhost:8081/api/admin/orders/state/${productID}`,
      data,
      { headers }
    );
    return res.data;
  }
}

const userApi = new UserApi();
export default userApi;
