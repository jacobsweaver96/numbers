import { partitionsReducer } from '../features/partitions';
import { setsReducer } from '../features/sets';

const rootReducer = combineReducers({
    partitionsReducer,
    setsReducer,
});

export default rootReducer;