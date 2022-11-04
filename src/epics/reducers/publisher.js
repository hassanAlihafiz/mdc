const initState = {
  messages: [],
  isStreamReady: false,
  isStreamStart: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        messages: [...state.messages.map((el) => el), action.payload.message],
      };
    case "RESET_MESSAGES":
      return {
        ...state,
        messages: [],
      };
    case "SET_IS_STREAM_START":
      return {
        ...state,
        isStreamStart: action.payload.isStreamStart,
      };
    case "SET_IS_STREAM_READY":
      return {
        ...state,
        isStreamReady: action.payload.isStreamReady,
      };

    default:
      return state;
  }
};
