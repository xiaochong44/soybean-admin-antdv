<template>
  <Button
    type="primary"
    :class="[{ '!right-330px': app.settingDrawerVisible }, app.settingDrawerVisible ? 'ease-out' : 'ease-in']"
    class="fixed top-360px right-14px z-10000 w-42px h-42px !p-0 transition-all duration-300"
    @click="app.toggleSettingDrawerVisible"
  >
    <CloseOutlined v-if="app.settingDrawerVisible" class="text-24px" />
    <SettingOutlined v-else class="text-24px" />
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/store';

defineOptions({ name: 'DrawerButton' });

const app = useAppStore();
</script>

<style scoped></style>
