import { axiosClient } from ".";

const supplierAPI = {
  async getListSupplier() {
    const response = await axiosClient.get("/supplier");
    return response;
  },
};

export default supplierAPI;
