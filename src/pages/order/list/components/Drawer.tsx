import { Button, Descriptions, Drawer, Form } from 'antd';
import React, { useEffect } from 'react';
import { detail } from '../service';

interface CustomDrawerProps {
  title?: string;
  visible: boolean;
  orderId?: number;
  onClose: () => void;
  // onSubmit: (values: any) => void;
  initialValues?: any;
  loading?: boolean;
}

const DetailDrawer: React.FC<CustomDrawerProps> = ({
  title = '',
  visible,
  orderId,
  onClose,
  // onSubmit,
  initialValues = {},
  loading = false,
}) => {
  const [form] = Form.useForm();

  const [data, setData] = React.useState<any>(undefined);

  useEffect(() => {
    if (orderId !== undefined) {
      detail(orderId).then((res: any) => {
        setData(res?.data);
      });
    } else {
      setData(undefined);
    }
  }, [orderId]);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues]);

  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      open={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={() => form.submit()} type="primary" loading={loading}>
            提交
          </Button>
        </div>
      }
    >
      <Descriptions column={2}>
        <Descriptions.Item label="订单编号">{data?.orderNo}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{data?.createTime}</Descriptions.Item>
        <Descriptions.Item label="客户姓名">{data?.customerName}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{data?.customerPhone}</Descriptions.Item>
        <Descriptions.Item label="订单金额">{data?.amount}</Descriptions.Item>
        <Descriptions.Item label="订单状态">{data?.status}</Descriptions.Item>
        <Descriptions.Item label="收货地址" span={2}>
          {data?.shippingAddress}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default DetailDrawer;
