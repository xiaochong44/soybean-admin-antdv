<template>
  <Drawer
    :open="app.settingDrawerVisible"
    :width="330"
    title="主题配置"
    :closable="false"
    mask-closable
    @close="app.closeSettingDrawer"
  >
    <div>
      <dark-mode />
      <layout-mode />
      <theme-color-select />
      <page-func />
      <page-view />
      <theme-config />
    </div>
  </Drawer>
  <drawer-button v-if="showButton" />
</template>

<script setup lang="ts">
import { Drawer } from 'ant-design-vue';
import { useAppStore } from '@/store';
import { DarkMode, DrawerButton, LayoutMode, PageFunc, PageView, ThemeColorSelect, ThemeConfig } from './components';

defineOptions({ name: 'SettingDrawer' });

const app = useAppStore();

const showButton = import.meta.env.DEV || import.meta.env.VITE_VERCEL === 'Y';
</script>

<style scoped></style>
