import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {},
});

const addProductionReport = async (data) => {
  let result;
  await client
    .post("/productionreport", data)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      result = err.response;
    });
  return result;
};

const getProductionReports = async (filter) => {
  let response;
  await client
    .get(`/productionreport/?filter=${filter}`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const getProductionReport = async (id) => {
  let response;
  await client
    .get(`/productionreport/${id}`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const updateProductionReport = async (id, data) => {
  let response;
  // console.log(id, token, data);
  await client
    .put(`/productionreport/${id}`, data)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      response = err.response.data;
    });
  return response;
};

const getProducts = async (filter) => {
  let response;
  await client
    .get(`/product/?filter=${filter}`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const getProductData = async (id) => {
  let response;
  await client
    .get(`/product/${id}`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const updateProductData = async (id, data) => {
  let response;
  // console.log(id, token, data);
  await client
    .put(`/product/${id}`, data)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      response = err.response.data;
    });
  return response;
};

const getMouldChanges = async (filter) => {
  let response;
  await client
    .get(`/mouldchange/?filter=${filter}`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const getMouldChangeData = async (id) => {
  let response;
  await client
    .get(`/mouldchange/${id}`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const addMouldChange = async (data) => {
  let result;
  await client
    .post("/mouldchange", data, {
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      result = err.response;
    });
  return result;
};

const updateMouldChangeData = async (id, data) => {
  let result;
  // console.log(id, token, data);
  await client
    .put(`/mouldchange/${id}`, data)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      result = err.response;
    });
  return result;
};

const getMaterialData = async () => {
  let response;
  await client
    .get(`/material`)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const addProduct = async (data) => {
  let result;
  await client
    .post("/product", data, {
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      result = err.response.data;
    });
  return result;
};

const getUserData = async (id, token) => {
  let response;
  await client
    .get(`/user/${id}`, { Authorization: `Bearer ${token}` })
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });
  return response;
};

const updateUserData = async (id, token, data) => {
  let response;
  console.log(id, token, data);
  await client
    .put(`/user/${id}`, data, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => {
      response = data;
      console.log(response.data.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      response = err.response.data;
    });
  return response;
};

const signUpFunc = async (data) => {
  let status;
  await client
    .post("/user", data, {
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      status = response.data;
    })
    .catch((err) => {
      status = err.response.data;
    });
  return status;
};

const signInFunc = async (data) => {
  let status;
  await client
    .post("/auth/login", data, {
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      status = response.data;
    })
    .catch((err) => {
      status = err.response.data;
    });
  return status;
};

const uploadCsv = async (file) => {
  let status;
  await client
    .post("/summary/upload-csv", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      status = response.data;
    })
    .catch((err) => {
      status = err.response.data;
    });
  return status;
};

export {
  signUpFunc,
  signInFunc,
  getUserData,
  updateUserData,
  uploadCsv,
  addProduct,
  getMaterialData,
  getProductData,
  getProducts,
  updateProductData,
  getMouldChanges,
  getMouldChangeData,
  updateMouldChangeData,
  addMouldChange,
  getProductionReports,
  getProductionReport,
  updateProductionReport,
  addProductionReport
};
