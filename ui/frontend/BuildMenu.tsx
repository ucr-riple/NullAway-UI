import React, { useCallback } from 'react';

import * as actions from './actions';
import { useAppDispatch } from './configureStore';

import ButtonMenuItem from './ButtonMenuItem';
import MenuGroup from './MenuGroup';

interface BuildMenuProps {
  close: () => void;
}

const useDispatchAndClose = (action: () => actions.ThunkAction, close: () => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    () => {
      dispatch(action());
      close();
    },
    [action, close, dispatch]
  );
}

const BuildMenu: React.FC<BuildMenuProps> = props => {
  const compile = useDispatchAndClose(actions.performCompile, props.close);
  const execute = useDispatchAndClose(actions.performExecute, props.close);

  return (
    <MenuGroup title="What do you want to do?">
      <ButtonMenuItem name="Run" onClick={execute}>
          Build and run the code, showing the output.
      </ButtonMenuItem>
      <ButtonMenuItem name="Build" onClick={compile}>
          Build the code without running it.
      </ButtonMenuItem>
    </MenuGroup>
  );
};

export default BuildMenu;
