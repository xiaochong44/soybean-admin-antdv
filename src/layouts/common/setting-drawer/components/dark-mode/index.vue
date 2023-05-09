<template>
  <Divider>主题模式</Divider>
  <Space direction="vertical" style="width: 100%">
    <setting-menu label="深色主题">
      <Switch :checked="theme.darkMode" @update:checked="theme.setDarkMode">
        <template #checkedChildren>
          <icon-mdi-white-balance-sunny class="text-14px text-white" />
        </template>
        <template #unCheckedChildren>
          <icon-mdi-moon-waning-crescent class="text-14px text-white" />
        </template>
      </Switch>
    </setting-menu>
    <setting-menu label="跟随系统">
      <Switch :checked="theme.followSystemTheme" @update:checked="theme.setFollowSystemTheme">
        <template #checkedChildren>
          <icon-ic-baseline-do-not-disturb class="text-14px text-white" />
        </template>
        <template #unCheckedChildren>
          <icon-ic-round-hdr-auto class="text-14px text-white" />
        </template>
      </Switch>
    </setting-menu>
    <setting-menu label="侧边栏深色">
      <Switch :checked="theme.sider.inverted" @update:checked="theme.setSiderInverted" />
    </setting-menu>
    <setting-menu label="头部深色">
      <Switch :checked="theme.header.inverted" @update:checked="theme.setHeaderInverted" />
    </setting-menu>
    <setting-menu label="底部深色">
      <Switch :checked="theme.footer.inverted" @update:checked="theme.setFooterInverted" />
    </setting-menu>
  </Space>
</template>

<script lang="ts" setup>
import { Divider, Switch, Space } from 'ant-design-vue';
import { useThemeStore } from '@/store';
import SettingMenu from '../setting-menu/index.vue';

defineOptions({ name: 'DarkMode' });

const theme = useThemeStore();
</script>
<style scoped></style>
