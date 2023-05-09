<template>
  <Button :text="true" class="h-36px" @click="app.toggleSiderCollapse">
    <icon-ph-caret-double-right-bold v-if="app.siderCollapse" class="text-16px" />
    <icon-ph-caret-double-left-bold v-else class="text-16px" />
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import { useAppStore } from '@/store';

defineOptions({ name: 'MixMenuCollapse' });

const app = useAppStore();
</script>

<style scoped></style>
