<template>
  <Popover placement="bottom" trigger="click">
    <Button type="primary">
      <template #icon><SettingOutlined /></template>
      表格列设置
    </Button>
    <template #content>
      <div class="w-180px">
        <vue-draggable v-model="list" item-key="key">
          <template #item="{ element }">
            <div v-if="element.key" class="flex-y-center h-36px px-12px hover:bg-primary_active">
              <icon-mdi-drag class="mr-8px text-20px cursor-move" />
              <Checkbox v-model:checked="element.checked">
                {{ element.title }}
              </Checkbox>
            </div>
          </template>
        </vue-draggable>
      </div></template
    >
  </Popover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Popover, Button, Checkbox } from 'ant-design-vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import type { ColumnType } from 'ant-design-vue/es/table/interface';
import VueDraggable from 'vuedraggable';

type Column = ColumnType<UserManagement.User>;

interface Props {
  columns: Column[];
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:columns', columns: Column[]): void;
}

const emit = defineEmits<Emits>();

type List = Column & { checked?: boolean };

const list = ref(initList());

function initList(): List[] {
  return props.columns.map(item => ({ ...item, checked: true }));
}

watch(
  list,
  newValue => {
    const newColumns = newValue.filter(item => item.checked);

    const columns: Column[] = newColumns.map(item => {
      const column = { ...item };
      delete column.checked;

      return column;
    }) as Column[];

    emit('update:columns', columns);
  },
  { deep: true }
);
</script>

<style scoped></style>
