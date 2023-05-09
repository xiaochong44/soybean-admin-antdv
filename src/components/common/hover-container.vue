<template>
  <div v-if="showTooltip">
    <Tooltip :placement="placement" trigger="hover" :title="tooltipContent">
      <div class="flex-center h-full cursor-pointer dark:hover:bg-#333" :class="contentClassName">
        <slot></slot>
      </div>
    </Tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer dark:hover:bg-#333" :class="contentClassName">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Tooltip } from 'ant-design-vue';
import type { TooltipPlacement } from 'ant-design-vue/es/tooltip';

defineOptions({ name: 'HoverContainer' });

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: TooltipPlacement;
  /** class类 */
  contentClass?: string;
  /** 反转模式下 */
  inverted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
  inverted: false
});

const showTooltip = computed(() => Boolean(props.tooltipContent));

const contentClassName = computed(
  () => `${props.contentClass} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`
);
</script>

<style scoped></style>
