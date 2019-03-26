export default (state: any, action: any) => {
    switch(action.type){
        case "blur":
              return{
                  ...state,
                  blur: action.blur
              }
        default:
            return state;
    }
}