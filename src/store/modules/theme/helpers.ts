import { cloneDeep } from 'lodash-es';
import { themeSetting } from '@/settings';
import { localStg, getColorPalette } from '@/utils';

/** 初始化主题配置 */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD;
  // 生产环境才缓存主题配置，本地开发实时调整配置更改配置的json
  const storageSettings = localStg.get('themeSettings');

  if (isProd && storageSettings) {
    return storageSettings;
  }

  const themeColor = localStg.get('themeColor') || themeSetting.themeColor;
  const info = themeSetting.isCustomizeInfoColor ? themeSetting.otherColor.info : getColorPalette(themeColor, 7);
  const otherColor = { ...themeSetting.otherColor, info };
  const setting = cloneDeep({ ...themeSetting, themeColor, otherColor });
  return setting;
}
