<template>
  <div class="flex-1-hidden h-full px-10px header-menu">
    <div class="flex-1-hidden h-full overflow-x-auto" content-class="h-full">
      <div class="flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
        <Menu
          :selected-keys="[activeKey]"
          mode="horizontal"
          :items="menus"
          :theme="theme.header.inverted ? 'dark' : 'light'"
          @select="handleSelectMenu"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Menu } from 'ant-design-vue';
import type { SelectInfo } from 'ant-design-vue/es/menu/src/interface';
import type { ItemType } from 'ant-design-vue/es/menu/src/hooks/useItems';
import { useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';

defineOptions({ name: 'HeaderMenu' });

const route = useRoute();
const routeStore = useRouteStore();
const theme = useThemeStore();
const { routerPush } = useRouterPush();
const menus = computed(() => routeStore.menus as ItemType[]);
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);

function handleSelectMenu(e: SelectInfo) {
  routerPush({ name: e.key as string });
}
</script>

<style scoped>
:deep(.ant-menu-horizontal) {
  border-bottom: 0;
}
:deep(.ant-menu-light.ant-menu-horizontal .ant-menu-item-selected::after) {
  border-bottom-width: 0;
}
:deep(.ant-menu-light.ant-menu-horizontal .ant-menu-submenu-selected::after) {
  border-bottom-width: 0;
}
.header-menu ::-webkit-scrollbar {
  display: none;
}
.header-menu:hover ::-webkit-scrollbar {
  display: block;
}
</style>
