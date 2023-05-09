<template>
  <Divider>界面功能</Divider>
  <Space direction="vertical" style="width: 100%">
    <setting-menu label="滚动模式">
      <Select
        class="w-120px"
        :popup-class-name="'z-10000'"
        size="small"
        :value="theme.scrollMode"
        :options="theme.scrollModeList"
        @update:value="theme.setScrollMode"
      />
    </setting-menu>
    <setting-menu label="固定头部和多页签">
      <Switch :checked="theme.fixedHeaderAndTab" @update:checked="theme.setIsFixedHeaderAndTab" />
    </setting-menu>
    <setting-menu label="顶部菜单位置">
      <Select
        class="w-120px"
        :popup-class-name="'z-10000'"
        size="small"
        :value="theme.menu.horizontalPosition"
        :options="theme.menu.horizontalPositionList"
        @update:value="theme.setHorizontalMenuPosition"
      />
    </setting-menu>
    <setting-menu label="头部高度">
      <InputNumber
        class="w-120px"
        size="small"
        :value="theme.header.height"
        :step="1"
        @update:value="theme.setHeaderHeight"
      />
    </setting-menu>
    <setting-menu label="多页签高度">
      <InputNumber
        class="w-120px"
        size="small"
        :value="theme.tab.height"
        :step="1"
        @update:value="theme.setTabHeight"
      />
    </setting-menu>
    <setting-menu label="多页签缓存">
      <Switch :checked="theme.tab.isCache" @update:checked="theme.setTabIsCache" />
    </setting-menu>
    <setting-menu label="侧边栏展开宽度">
      <InputNumber
        class="w-120px"
        size="small"
        :value="theme.sider.width"
        :step="10"
        @update:value="theme.setSiderWidth"
      />
    </setting-menu>
    <setting-menu label="左侧混合侧边栏展开宽度">
      <InputNumber
        class="w-120px"
        size="small"
        :value="theme.sider.mixWidth"
        :step="5"
        @update:value="theme.setMixSiderWidth"
      />
    </setting-menu>
    <setting-menu label="显示底部">
      <Switch :checked="theme.footer.visible" @update:checked="theme.setFooterVisible" />
    </setting-menu>
    <setting-menu label="固定底部">
      <Switch :checked="theme.footer.fixed" @update:checked="theme.setFooterIsFixed" />
    </setting-menu>
    <setting-menu label="底部居右">
      <Switch :checked="theme.footer.right" @update:checked="theme.setFooterIsRight" />
    </setting-menu>
  </Space>
</template>

<script lang="ts" setup>
import { Divider, Switch, Space, Select, InputNumber } from 'ant-design-vue';
import { useThemeStore } from '@/store';
import SettingMenu from '../setting-menu/index.vue';

defineOptions({ name: 'PageFunc' });

const theme = useThemeStore();
</script>

<style scoped></style>
