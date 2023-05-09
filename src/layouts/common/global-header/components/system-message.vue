<template>
  <Popover class="!p-0" trigger="click" placement="bottomRight" :overlay-inner-style="{ padding: 0 }">
    <template #content>
      <Tabs
        v-model:value="currentTab"
        :class="[isMobile ? 'w-276px' : 'w-360px']"
        type="line"
        justify-content="space-evenly"
      >
        <TabPane v-for="(item, index) in tabData" :key="item.key" :name="index">
          <template #tab>
            <div class="flex-x-center items-center" :class="[isMobile ? 'w-92px' : 'w-90px']">
              <span class="mr-5px">{{ item.name }}</span>
              <Badge
                v-bind="item.badgeProps"
                :count="item.list.filter(message => !message.isRead).length"
                :overflow-count="99"
                show-zero
              />
            </div>
          </template>
          <loading-empty-wrapper
            class="h-360px"
            :loading="loading"
            :empty="item.list.length === 0"
            placeholder-class="bg-$n-color transition-background-color duration-300 ease-in-out"
          >
            <message-list :list="(item.list as any)" @read="handleRead" />
          </loading-empty-wrapper>
        </TabPane>
      </Tabs>
      <div v-if="showAction" class="flex border-t border-gray-200 cursor-pointer">
        <div class="flex-1 text-center py-10px" @click="handleClear">清空</div>
        <div class="flex-1 text-center py-10px border-l border-gray-200" @click="handleAllRead">全部已读</div>
        <div class="flex-1 text-center py-10px border-l border-gray-200" @click="handleLoadMore">查看更多</div>
      </div>
    </template>
    <hover-container tooltip-content="消息通知" :inverted="theme.header.inverted" class="relative w-40px h-full">
      <Badge :count="count" dot>
        <icon-clarity:notification-line class="text-18px" />
      </Badge>
    </hover-container>
  </Popover>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Popover, Badge, Tabs, TabPane } from 'ant-design-vue';
import { useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { useBoolean } from '@/hooks';
import MessageList from './message-list.vue';

defineOptions({ name: 'SystemMessage' });

const theme = useThemeStore();
const { isMobile } = useBasicLayout();
const { bool: loading, setBool: setLoading } = useBoolean();

const currentTab = ref(0);

const tabData = ref<App.MessageTab[]>([
  {
    key: 1,
    name: '通知',
    badgeProps: { status: 'warning' },
    list: [
      { id: 1, icon: 'ri:message-3-line', title: '你收到了5条新消息', date: '2022-06-17' },
      { id: 4, icon: 'ri:message-3-line', title: 'Soybean Admin 1.0.0 版本正在筹备中', date: '2022-06-17' },
      { id: 2, icon: 'ri:message-3-line', title: 'Soybean Admin 0.9.6 版本发布了', date: '2022-06-16' },
      { id: 3, icon: 'ri:message-3-line', title: 'Soybean Admin 0.9.5 版本发布了', date: '2022-06-07' },
      {
        id: 5,
        icon: 'ri:message-3-line',
        title: '测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题',
        date: '2022-06-17'
      }
    ]
  },
  {
    key: 2,
    name: '消息',
    badgeProps: { status: 'error' },
    list: [
      {
        id: 1,
        title: '项目动态',
        svgIcon: 'avatar',
        description: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！',
        date: '2021-11-07 22:45:32'
      },
      {
        id: 2,
        title: '项目动态',
        svgIcon: 'avatar',
        description: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        date: '2021-11-03 20:33:31'
      },
      {
        id: 3,
        title: '项目动态',
        svgIcon: 'avatar',
        description: 'Soybean 准备为soybean-admin 1.0的发布做充分的准备工作！',
        date: '2021-10-31 22:43:12'
      },
      {
        id: 4,
        title: '项目动态',
        svgIcon: 'avatar',
        description: '@yanbowe 向soybean-admin提交了一个bug，多标签栏不会自适应。',
        date: '2021-10-27 10:24:54'
      },
      {
        id: 5,
        title: '项目动态',
        svgIcon: 'avatar',
        description: 'Soybean 在2021年5月28日创建了开源项目soybean-admin！',
        date: '2021-05-28 22:22:22'
      }
    ]
  },
  {
    key: 3,
    name: '待办',
    badgeProps: { status: 'processing' },
    list: [
      {
        id: 1,
        icon: 'ri:calendar-todo-line',
        title: '缓存主题配置',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { color: 'default' }
      },
      {
        id: 2,
        icon: 'ri:calendar-todo-line',
        title: '添加锁屏组件、全局Iframe组件',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { color: 'default' }
      },
      {
        id: 3,
        icon: 'ri:calendar-todo-line',
        title: '示例页面完善',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { color: 'default' }
      },
      {
        id: 4,
        icon: 'ri:calendar-todo-line',
        title: '表单、表格示例',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { color: 'default' }
      },
      {
        id: 5,
        icon: 'ri:calendar-todo-line',
        title: '性能优化(优化递归函数)',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { color: 'default' }
      },
      {
        id: 6,
        icon: 'ri:calendar-todo-line',
        title: '精简版(新分支thin)',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { color: 'default' }
      }
    ]
  }
]);

const count = computed(() => {
  return tabData.value.reduce((acc, cur) => {
    return acc + cur.list.filter(item => !item.isRead).length;
  }, 0);
});

const showAction = computed(() => tabData.value[currentTab.value].list.length > 0);

function handleRead(index: number) {
  tabData.value[currentTab.value].list[index].isRead = true;
}

function handleAllRead() {
  tabData.value[currentTab.value].list.forEach(item => Object.assign(item, { isRead: true }));
}

function handleClear() {
  tabData.value[currentTab.value].list = [];
}

function handleLoadMore() {
  const { list } = tabData.value[currentTab.value];
  setLoading(true);
  setTimeout(() => {
    list.push(...tabData.value[currentTab.value].list);
    setLoading(false);
  }, 1000);
}
</script>
<style scoped></style>
