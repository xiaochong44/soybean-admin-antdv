<template>
  <div>
    <Card title="用户管理" :bordered="false" class="rounded-16px shadow-sm">
      <div class="pb-12px flex justify-between">
        <Space>
          <Button type="primary" @click="handleAddTable">
            <template #icon><PlusOutlined /></template>
            新增
          </Button>
          <Button danger type="primary">
            <template #icon><DeleteOutlined /></template>
            删除
          </Button>
          <Button>
            <template #icon><ExportOutlined /></template>
            导出Excel
          </Button>
        </Space>
        <Space :size="18">
          <Button type="primary" @click="getTableData">
            <template #icon><ReloadOutlined /></template>
            刷新表格
          </Button>
          <column-setting v-model:columns="columns" />
        </Space>
      </div>
      <Table :columns="columns" :data-source="tableData" :loading="loading" :pagination="pagination" />
      <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData" />
    </Card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { ExportOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { Card, Button, Table, Space, Tag, Popconfirm, message } from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table/interface';
import { genderLabels, userStatusLabels } from '@/constants';
import { fetchUserList } from '@/service';
import { useBoolean, useLoading } from '@/hooks';
import TableActionModal from './components/table-action-modal.vue';
import type { ModalType } from './components/table-action-modal.vue';
import ColumnSetting from './components/column-setting.vue';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const tableData = ref<UserManagement.User[]>([]);
function setTableData(data: UserManagement.User[]) {
  tableData.value = data;
}

async function getTableData() {
  startLoading();
  const { data } = await fetchUserList();
  if (data) {
    setTimeout(() => {
      setTableData(data);
      endLoading();
    }, 1000);
  }
}
const pagination: TablePaginationConfig = reactive({
  current: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.current = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.current = 1;
  }
});

const columns: Ref<ColumnType<UserManagement.User>[]> = ref([
  {
    key: 'index',
    title: '序号',
    align: 'center',
    customRender: e => {
      return (pagination.current! - 1) * pagination.pageSize! + e.index + 1;
    }
  },
  {
    key: 'userName',
    dataIndex: 'userName',
    title: '用户名',
    align: 'center'
  },
  {
    dataIndex: 'age',
    title: '用户年龄',
    align: 'center'
  },
  {
    key: 'gender',
    title: '性别',
    align: 'center',
    customRender: row => {
      if (row.record.gender) {
        const tagTypes: Record<UserManagement.GenderKey, NaiveUI.ThemeColor> = {
          '0': 'success',
          '1': 'warning'
        };

        return <Tag color={tagTypes[row.record.gender]}>{genderLabels[row.record.gender]}</Tag>;
      }

      return <span></span>;
    }
  },
  {
    dataIndex: 'phone',
    title: '手机号码',
    align: 'center'
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    align: 'center'
  },
  {
    key: 'userStatus',
    title: '状态',
    align: 'center',
    customRender: row => {
      if (row.record.userStatus) {
        const tagTypes: Record<UserManagement.UserStatusKey, NaiveUI.ThemeColor> = {
          '1': 'success',
          '2': 'error',
          '3': 'warning',
          '4': 'default'
        };

        return <Tag color={tagTypes[row.record.userStatus]}>{userStatusLabels[row.record.userStatus]}</Tag>;
      }
      return <span></span>;
    }
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    customRender: row => {
      return (
        <Space>
          <Button size={'small'} onClick={() => handleEditTable(row.record.id)}>
            编辑
          </Button>
          <Popconfirm onConfirm={() => handleDeleteTable(row.record.id)} title="确认删除">
            {{
              default: () => <Button size={'small'}>删除</Button>
            }}
          </Popconfirm>
        </Space>
      );
    }
  }
]) as Ref<ColumnType<UserManagement.User>[]>;

const modalType = ref<ModalType>('add');

function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<UserManagement.User | null>(null);

function setEditData(data: UserManagement.User | null) {
  editData.value = data;
}

function handleAddTable() {
  openModal();
  setModalType('add');
}

function handleEditTable(rowId: string) {
  const findItem = tableData.value.find(item => item.id === rowId);
  if (findItem) {
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

function handleDeleteTable(rowId: string) {
  message?.info(`点击了删除，rowId为${rowId}`);
}

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
