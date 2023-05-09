<template>
  <Popover placement="bottomRight" trigger="click">
    <template #trigger>
      <Input v-model:value="modelValue" readonly placeholder="点击选择图标">
        <template #suffix>
          <svg-icon :icon="selectedIcon" class="text-30px p-5px" />
        </template>
      </Input>
    </template>
    <template #header>
      <Input v-model:value="searchValue" placeholder="搜索图标"></Input>
    </template>
    <div v-if="iconsList.length > 0" class="grid grid-cols-9 h-auto overflow-auto">
      <span v-for="iconItem in iconsList" :key="iconItem" @click="handleChange(iconItem)">
        <svg-icon
          :icon="iconItem"
          class="border-1px border-#d9d9d9 text-30px m-2px p-5px cursor-pointer"
          :class="{ 'border-primary': modelValue === iconItem }"
        />
      </span>
    </div>
    <Empty v-else class="w-306px" description="你什么也找不到" />
  </Popover>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Popover, Input, Empty } from 'ant-design-vue';

defineOptions({ name: 'IconSelect' });

interface Props {
  /** 选中的图标 */
  value: string;
  /** 图标列表 */
  icons: string[];
  /** 未选中图标 */
  emptyIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emptyIcon: 'mdi:apps'
});

interface Emits {
  (e: 'update:value', val: string): void;
}

const emit = defineEmits<Emits>();

const modelValue = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit('update:value', val);
  }
});

const selectedIcon = computed(() => modelValue.value || props.emptyIcon);

const searchValue = ref('');

const iconsList = computed(() => props.icons.filter(v => v.includes(searchValue.value)));

function handleChange(iconItem: string) {
  modelValue.value = iconItem;
}
</script>

<style lang="scss" scoped>
:deep(.n-input-wrapper) {
  padding-right: 0;
}
:deep(.n-input__suffix) {
  border: 1px solid #d9d9d9;
}
</style>
