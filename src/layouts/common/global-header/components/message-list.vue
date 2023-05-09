<template>
  <div class="max-h-360px overflow-auto">
    <List :data-source="list">
      <template #renderItem="{ item, index }">
        <ListItem :key="item.id" class="hover:bg-#f6f6f6 dark:hover:bg-dark cursor-pointer" @click="handleRead(index)">
          <ListItemMeta>
            <template #avatar>
              <Avatar v-if="item.avatar" :src="item.avatar" />
              <svg-icon v-else class="text-34px text-primary" :icon="item.icon" :local-icon="item.svgIcon" />
            </template>
            <template #title>
              <div :line-clamp="1">
                {{ item.title }}
              </div>
            </template>
            <template v-if="item.tagTitle" #header-extra>
              <Tag v-bind="item.tagProps" size="small">{{ item.tagTitle }}</Tag>
            </template>
            <template #description>
              <div v-if="item.description" :line-clamp="2">
                {{ item.description }}
              </div>
              <p>{{ item.date }}</p>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
import { List, ListItem, ListItemMeta, Tag, Avatar } from 'ant-design-vue';
defineOptions({ name: 'MessageList' });

interface Props {
  list?: App.MessageList[];
}

withDefaults(defineProps<Props>(), {
  list: () => []
});

interface Emits {
  (e: 'read', val: number): void;
}

const emit = defineEmits<Emits>();

function handleRead(index: number) {
  emit('read', index);
}
</script>
