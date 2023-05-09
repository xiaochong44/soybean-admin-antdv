<template>
  <div class="color-picker">
    <Popover
      placement="bottomRight"
      style="z-index: 9999"
      :overlay-style="{ zIndex: 9999 }"
      :overlay-inner-style="{ padding: 0 }"
    >
      <div class="p-1 text-center border-#d9d9d9 border-1px rounded-4px">
        <div :style="{ background: value }">{{ value }}</div>
      </div>
      <template #content>
        <ColorPicker
          is-widget
          :pure-color="value"
          picker-type="chrome"
          format="hex6"
          @update:pure-color="handleChange"
        />
      </template>
    </Popover>
  </div>
</template>
<script setup lang="ts">
import { Popover } from 'ant-design-vue';
import { ColorPicker } from 'vue3-colorpicker';

defineOptions({ name: 'pure-color-picker' });
defineProps<{ value: string }>();
interface Emits {
  (e: 'update:value', val: string): void;
}

const emit = defineEmits<Emits>();
function handleChange(color: string) {
  emit('update:value', color);
}
</script>
<style lang="scss">
.vc-colorpicker {
  padding-bottom: 0 !important;
  box-shadow: none !important;
}
</style>
