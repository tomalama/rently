const initState = {
  authError: null
};

const propertyReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PROPERTY":
      console.log("Added property");
      return state;

    default:
      return state;
  }
};

export default propertyReducer;
