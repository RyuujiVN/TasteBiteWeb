import { instance } from "~/api";


const filter = async (params) => {
  return await instance.get("/product/filter", {
    params: params
  });
}

const getDetail = async (slug) => {
  return await instance.get(`/product/detail/${slug}`);
}

const productService = {
  filter,
  getDetail
}

export default productService