import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './shared/error_reducer';
import ChannelsReducer from './channels_reducer';
import FetchingReducer from './fetching_reducer';
import MessageReducer from './message_reducer';
import UsersReducer from './users_reducer';
import DirectMessageReducer from './direct_message_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  channels: ChannelsReducer,
  errors: ErrorReducer,
  fetching: FetchingReducer,
  messages: MessageReducer,
  users: UsersReducer,
  direct_messages: DirectMessageReducer
});

export default RootReducer;
