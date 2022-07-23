let initialState = {
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
