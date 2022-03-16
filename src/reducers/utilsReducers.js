import { BASIC_DATA_FETCH_FAILURE, BASIC_DATA_FETCH, BASIC_DATA_FETCH_RESET, BASIC_DATA_FETCH_SUCCESS,
  PSP_DATA_FETCH_FAILURE, PSP_DATA_FETCH, PSP_DATA_FETCH_RESET, PSP_DATA_FETCH_SUCCESS,
} from '../actions/utilsActions';

const INITIAL_STATE = {
  basic_data: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BASIC_DATA_FETCH:
      return { ...state };
    case BASIC_DATA_FETCH_SUCCESS:
      return { ...state, basic_data: [...state.basic_data, {key:action.payload.entity.name + '_' + action.payload.entity.id, object: action.payload.data}] };
    case BASIC_DATA_FETCH_FAILURE:
      return { ...state };
    case BASIC_DATA_FETCH_RESET:
      return { ...state };


    case PSP_DATA_FETCH:
      return { ...state };
    case PSP_DATA_FETCH_SUCCESS:
      return { ...state, psp_data:action.payload };
    case PSP_DATA_FETCH_FAILURE:
      return { ...state };
    case PSP_DATA_FETCH_RESET:
      return { ...state };

    default:
      return state;
  }
}
