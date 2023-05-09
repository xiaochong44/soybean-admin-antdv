<template>
  <div class="h-full">
    <Card title="地图插件" class="h-full shadow-sm rounded-16px" content-style="overflow:hidden">
      <Tabs type="line" class="flex-col-stretch h-full" pane-class="flex-1-hidden">
        <TabPane v-for="item in maps" :key="item.id" :name="item.id" :tab="item.label">
          <component :is="item.component" />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { Card, Tabs, TabPane } from 'ant-design-vue';
import { BaiduMap, GaodeMap, TencentMap } from './components';

interface Map {
  id: string;
  label: string;
  component: Component;
}

const maps: Map[] = [
  { id: 'gaode', label: '高德地图', component: GaodeMap },
  { id: 'tencent', label: '腾讯地图', component: TencentMap },
  { id: 'baidu', label: '百度地图', component: BaiduMap }
];
</script>

<style scoped></style>
