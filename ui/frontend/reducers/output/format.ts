import { Action, ActionType } from '../../actions';
import { finish, start } from './sharedStateManagement';

const DEFAULT: State = {
  requestsInProgress: 0,
};

interface State {
  requestsInProgress: number;
  stdout?: string;
  stderr?: string;
}

export default function format(state = DEFAULT, action: Action): State {
  switch (action.type) {
    case ActionType.RequestFormat:
      return start(DEFAULT, state);
    case ActionType.FormatSucceeded:
      return finish(state);
    case ActionType.FormatFailed: {
      const { stdout = '', stderr = '' } = action;
      return finish(state, { stdout, stderr });
    }
    default:
      return state;
  }
}
