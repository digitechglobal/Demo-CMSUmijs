import { MenuDataItem } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './usersFake'; //
import { Settings } from '@ant-design/pro-layout';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    user?: boolean;
    setting?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  user: UserModelState;
  settings: Settings;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
