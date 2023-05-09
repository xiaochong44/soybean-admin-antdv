<template>
  <Divider>界面显示</Divider>
  <Space direction="vertical" style="width: 100%">
    <setting-menu label="面包屑">
      <Switch :checked="theme.header.crumb.visible" @update:checked="theme.setHeaderCrumbVisible" />
    </setting-menu>
    <setting-menu label="面包屑图标">
      <Switch :checked="theme.header.crumb.showIcon" @update:checked="theme.setHeaderCrumbIconVisible" />
    </setting-menu>
    <setting-menu label="多页签">
      <Switch :checked="theme.tab.visible" @update:checked="theme.setTabVisible" />
    </setting-menu>
    <setting-menu label="多页签风格">
      <Select
        class="w-120px"
        size="small"
        :value="theme.tab.mode"
        :options="theme.tab.modeList"
        @update:value="theme.setTabMode"
      />
    </setting-menu>
    <setting-menu label="页面切换动画">
      <Switch :checked="theme.page.animate" @update:checked="theme.setPageIsAnimate" />
    </setting-menu>
    <setting-menu label="页面切换动画类型">
      <Select
        class="w-120px"
        size="small"
        :value="theme.page.animateMode"
        :options="theme.page.animateModeList"
        @update:value="theme.setPageAnimateMode"
      />
    </setting-menu>
  </Space>
</template>

<script lang="ts" setup>
import { Divider, Switch, Space, Select } from 'ant-design-vue';
import { useThemeStore } from '@/store';
import SettingMenu from '../setting-menu/index.vue';

defineOptions({ name: 'PageView' });

const theme = useThemeStore();
</script>

<style scoped></style>
