<template>
  <config-provider :locale="zhCN" :theme="themeConfig">
    <router-view />
  </config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ConfigProvider, theme as antdTheme } from 'ant-design-vue';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { subscribeStore, useThemeStore } from '@/store';
import { useGlobalEvents } from '@/composables';

dayjs.locale('zh-cn');

const theme = useThemeStore();
export type ThemeName = '' | 'light' | 'dark' | 'compact';

const themeConfig = computed<ThemeConfig>(() => {
  return {
    algorithm: theme.darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: { colorPrimary: theme.themeColor }
  };
});
subscribeStore();
useGlobalEvents();
</script>

<style scoped></style>
