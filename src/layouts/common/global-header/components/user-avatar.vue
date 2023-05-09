<template>
  <Dropdown :options="options">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <icon-local-avatar class="text-32px" />
      <span class="pl-8px text-16px font-medium">{{ auth.userInfo.userName }}</span>
    </hover-container>
    <template #overlay>
      <Menu :items="options" @select="handleSelect"> </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown, Menu, Modal } from 'ant-design-vue';
import type { ItemType } from 'ant-design-vue/es/menu/src/hooks/useItems';
import type { SelectInfo } from 'ant-design-vue/es/menu/src/interface';
import { useAuthStore, useThemeStore } from '@/store';
import { useIconRender } from '@/composables';

defineOptions({ name: 'UserAvatar' });

const auth = useAuthStore();
const theme = useThemeStore();
const { iconRender } = useIconRender();

const options: ItemType[] = [
  {
    label: '用户中心',
    key: 'user-center',
    icon: iconRender({ icon: 'carbon:user-avatar' })
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconRender({ icon: 'carbon:logout' })
  }
];

type DropdownKey = 'user-center' | 'logout';

function handleSelect(e: SelectInfo) {
  const key = e.key as DropdownKey;
  if (key === 'logout') {
    Modal.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        auth.resetAuthStore();
      }
    });
  }
}
</script>

<style scoped></style>
