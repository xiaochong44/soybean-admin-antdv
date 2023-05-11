<template>
  <div class="flex-1 overflow-y-auto">
    <Menu
      :selected-keys="[activeKey]"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :items="menus"
      :inline-indent="18"
      :mode="app.siderCollapse ? 'vertical' : 'inline'"
      :inline-collapsed="app.siderCollapse"
      :open-keys="expandedKeys"
      :theme="!theme.darkMode && theme.sider.inverted ? 'dark' : 'light'"
      @click="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { Menu } from 'ant-design-vue';
import { useAppStore, useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getActiveKeyPathsOfMenus } from '@/utils';

defineOptions({ name: 'VerticalMenu' });

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();

const menus = computed(() => routeStore.menus as App.GlobalMenuOption[]);

const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(e: MenuInfo) {
  routerPush(e.item.routePath);
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus.value);
  },
  { immediate: true }
);
</script>

<style scoped></style>
