import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  primaryColor: 'green', //'#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Basic Project',
  logo: '/W.png', //'/logo.svg',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
