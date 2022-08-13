import axios from "axios";

export const GETALLDOGS = "GET_ALL_DOGS";
export const GETDETAIL = "GET_DETAIL_DOG";
export const CREATEDOG = "CREATE_DOG";
export const GETTEMPS = "GET_TEMPS";
export const GETDOG = "GET_DOG";
export const ORDERAZZ = "ORDER_AZ";
export const ORDERZAA = "ORDER_ZA";
export const ORDERBYTHEHEAVY = "ORDER_BY_THE_HEAVY";
export const ORDERBYTHELIGHT = "ORDER_BY_THE_LIGHT";
export const FILTERBYTEMPS = "FILTER_BY_TEMPS";

export function getDogs(dispatch) {
  return function (dispatch) {
    try {
      return axios.get("http://localhost:3001/dogs").then((resp) => {
        dispatch({ type: GETALLDOGS, payload: resp.data });
      });
    } catch (e) {
      console.log(e);
      return dispatch({ type: GETALLDOGS, payload: "Error" });
    }
  };
}

export function getDetail(id) {
  return function (dispatch) {
    try {
      return axios.get("http://localhost:3001/dogs/" + id).then((resp) => {
        dispatch({ type: GETDETAIL, payload: resp.data });
      });
    } catch (e) {
      console.log(e);
      return dispatch({ type: GETDETAIL, payload: "Error" });
    }
  };
}

export function addDog(dog) {
  return {
    type: CREATEDOG,
    payload: dog,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    const resp = await axios.get("http://localhost:3001/temperament");
    dispatch({ type: GETTEMPS, payload: resp.data });
  };
}

export function searchDog(name) {
  // console.log("funcion search");
  return async function (dispatch) {
    const resp = await axios.get("http://localhost:3001/dogs?name=" + name);
    dispatch({ type: GETDOG, payload: resp.data });
  };
}

export function orderAZ() {
  return async function (dispatch) {
    return await axios.get("http://localhost:3001/dogs").then((resp) => {
      const orderByAZ = resp.data.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDERAZZ,
        payload: orderByAZ,
      });
    });
  };
}

export function orderZA() {
  return async function (dispatch) {
    const resp = await axios.get("http://localhost:3001/dogs");
    const orderByZA = resp.data.sort((b, a) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    dispatch({
      type: ORDERZAA,
      payload: orderByZA,
    });
  };
}

// export function filter(array) {
//     return {
//         type: 'FILTER',
//         payload: array
//     }
// }

export function filterBy(value) {
  if (value === "DB") {
    return {
      type: "DB",
    };
  } else if (value === "API") {
    return {
      type: "API",
    };
  } else if (value === "ALL") {
    return {
      type: "ALL",
    };
  }
}

export function getHeaviest() {
  return async function (dispatch) {
    return await axios.get("http://localhost:3001/dogs").then((dog) => {
      const orderHeaviest = dog.data.sort((b, a) => {
        if (typeof dog.data.id === "string") {
          if (a.weight > b.weight) return 1;
          if (a.weight < b.weight) return -1;
          return 0;
        } else {
          if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
          if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
          return 0;
        }
      });
      dispatch({
        type: ORDERBYTHEHEAVY,
        payload: orderHeaviest,
      });
    });
  };
}

export function getLightiest() {
  return async function (dispatch) {
    return await axios.get("http://localhost:3001/dogs").then((dog) => {
      const orderLightiest = dog.data.sort((a, b) => {
        if (typeof dog.data.id === "string") {
          if (a.weight > b.weight) return 1;
          if (a.weight < b.weight) return -1;
          return 0;
        } else {
          if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
          if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
          return 0;
        }
      });
      dispatch({
        type: ORDERBYTHELIGHT,
        payload: orderLightiest,
      });
    });
  };
}

export function filter(array) {
  return {
    type: FILTERBYTEMPS,
    payload: array,
  };
}
