<template>
  <div class="h-full">
    <Card title="权限切换" class="h-full shadow-sm rounded-16px">
      <div class="pb-12px">
        <div class="text-primary text-20px">当前用户的权限：{{ auth.userInfo.userRole }}</div>
      </div>
      <Select
        :value="auth.userInfo.userRole"
        class="w-120px"
        size="small"
        :options="options"
        @update:value="auth.updateUserRole"
      />
      <div class="py-12px">
        <div class="text-primary text-20px">权限指令 v-permission</div>
      </div>
      <div>
        <Button v-permission="'super'" class="mr-12px">super可见</Button>
        <Button v-permission="'admin'" class="mr-12px">admin可见</Button>
        <Button v-permission="['admin', 'user']">admin和test可见</Button>
      </div>
      <div class="py-12px">
        <div class="text-primary text-20px">权限函数 hasPermission</div>
      </div>
      <Space>
        <Button v-if="hasPermission('super')">super可见</Button>
        <Button v-if="hasPermission('admin')">admin可见</Button>
        <Button v-if="hasPermission(['admin', 'user'])">admin和user可见</Button>
      </Space>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { Card, Select, Button, Space } from 'ant-design-vue';
import { userRoleOptions } from '@/constants';
import { useAppStore, useAuthStore } from '@/store';
import { usePermission } from '@/composables';

const app = useAppStore();
const auth = useAuthStore();
const { hasPermission } = usePermission();

const options = userRoleOptions;

watch(
  () => auth.userInfo.userRole,
  async () => {
    app.reloadPage();
  }
);
</script>

<style scoped></style>
