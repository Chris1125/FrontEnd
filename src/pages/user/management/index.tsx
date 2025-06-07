import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { pageList, updateOrder } from './service';

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateOrder({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '登录账号',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      valueEnum: {
        0: {
          text: '停用',
          status: '0',
        },
        1: {
          text: '正常',
          status: '1',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.status === 0 ? (
          <a
            key="enable"
            onClick={() => {
              setCurrentRow(record);
            }}
          >
            启用
          </a>
        ) : (
          <a
            key="enable"
            onClick={() => {
              setCurrentRow(record);
            }}
          >
            停用
          </a>
        ),
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        request={pageList}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.orderNo && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.orderNo}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.orderNo,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
