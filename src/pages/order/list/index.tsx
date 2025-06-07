import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import DetailDrawer from './components/Drawer';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { pageList, updateOrder } from './service';

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在分配订单');

  try {
    await updateOrder({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('分配成功');
    return true;
  } catch (error) {
    hide();
    message.error('分配失败请重试！');
    return false;
  }
};

const TableList: React.FC = () => {
  const [detailVisiable, setDetailVisiable] = useState<boolean>(false);
  const [currentOrderId, setCurrentOrderId] = useState<number | undefined>(undefined);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      width: 240,
      fixed: 'left',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentOrderId(entity.id);
              setDetailVisiable(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '下单时间',
      dataIndex: 'sourceCreateTime',
      width: 200,
      sorter: true,
    },
    {
      title: '商品',
      dataIndex: 'productList',
      width: 360,
      render: (_, record) => {
        return (
          <div>
            {record.productList?.map((item) => (
              <div key={item.id}>
                {item.productName}【{item.quantity} {item.packingUnit}】
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: '下单人',
      dataIndex: 'buyerName',
      valueType: 'text',
      width: 160,
    },
    {
      title: '收货人',
      dataIndex: 'consignee',
      valueType: 'text',
      width: 80,
    },
    {
      title: '收货人手机号',
      dataIndex: 'consigneeMobile',
      valueType: 'text',
      width: 120,
    },
    {
      title: '收货人地址',
      dataIndex: 'consigneeAddress',
      valueType: 'text',
      width: 280,
    },
    {
      title: '所属供应商',
      dataIndex: 'supplierId',
      valueType: 'text',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          分配
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={pageList}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        scroll={{ x: 1200 }}
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

      <DetailDrawer
        visible={detailVisiable}
        orderId={currentOrderId}
        onClose={() => setDetailVisiable(false)}>
      </DetailDrawer>
    </PageContainer>
  );
};

export default TableList;
