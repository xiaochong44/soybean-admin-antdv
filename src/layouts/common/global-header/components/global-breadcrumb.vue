<template>
  <Breadcrumb class="px-12px">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <BreadcrumbItem>
        <Dropdown v-if="breadcrumb.hasChildren">
          <span class="cursor-pointer">
            <component
              :is="breadcrumb.icon"
              v-if="theme.header.crumb.showIcon"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span>{{ breadcrumb.label }}</span>
          </span>
          <template #overlay>
            <Menu @click="dropdownSelect">
              <MenuItem v-for="item in breadcrumb.options" :key="item.key">
                <a>{{ item.label }}</a>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
        <template v-else>
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon"
            class="inline-block align-text-bottom mr-4px text-16px"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">{{ breadcrumb.label }}</span>
        </template>
      </BreadcrumbItem>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Breadcrumb, BreadcrumbItem, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { routePath } from '@/router';
import { useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getBreadcrumbByRouteKey } from '@/utils';

defineOptions({ name: 'GlobalBreadcrumb' });

const route = useRoute();
const theme = useThemeStore();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();

const breadcrumbs = computed(() =>
  getBreadcrumbByRouteKey(route.name as string, routeStore.menus as App.GlobalMenuOption[], routePath('root'))
);

function dropdownSelect(info: MenuInfo) {
  routerPush({ name: info.key as string });
}
</script>

<style scoped></style>
