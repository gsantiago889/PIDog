import {
  GETALLDOGS,
  GETDETAIL,
  CREATEDOG,
  GETTEMPS,
  GETDOG,
  ORDERAZZ,
  ORDERZAA,
  ORDERBYTHEHEAVY,
  ORDERBYTHELIGHT,
  FILTERBYTEMPS,
} from "../actions";

const initialState = {
  allDogs: [],
  dogDetail: [],
  createdDog: [],
  allTemps: [],
  filter: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GETALLDOGS:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GETDETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case CREATEDOG:
      return {
        ...state,
        createdDog: action.payload,
      };
    case GETTEMPS:
      //console.log("reducer", action.payload);
      return {
        ...state,
        allTemps: action.payload,
      };
    case GETDOG:
      //console.log("reducer", action.payload);
      return {
        ...state,
        allDogs: action.payload,
      };
    case ORDERAZZ:
      return {
        ...state,
        allDogs: action.payload,
      };
    case ORDERZAA:
      return {
        ...state,
        allDogs: action.payload,
      };
    case "DB":
      return {
        ...state,
        allDogs: state.allDogs.filter((b) => b.id.length > 3).sort(),
      };
    case "API":
      return {
        ...state,
        allDogs: state.allDogs.filter((b) => b.id > 200).sort(),
      };
    case "ALL":
      return {
        ...state,
        allDogs: state.allDogs,
      };
    case ORDERBYTHEHEAVY:
      return {
        ...state,
        allDogs: action.payload,
      };
    case ORDERBYTHELIGHT:
      return {
        ...state,
        allDogs: action.payload,
      };
    case FILTERBYTEMPS:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
