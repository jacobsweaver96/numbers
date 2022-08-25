import { ThunkMiddleware } from 'redux-thunk';
import { numberApi } from '../api/numberApi';

const thunkMiddleware: ThunkMiddleware = ({ dispatch, getState }) => next => action => {
    if (typeof action == 'function') {
        return action(dispatch, getState);
    }

    return next(action);
};

const middleware = getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    thunk: {
        extraArgument: numberApi,
    }
})

export default middleware;