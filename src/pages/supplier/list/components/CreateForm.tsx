import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useRequest } from '@umijs/max';
import { Button, Form, message } from 'antd';
import { FC } from 'react';
import { addSupplier } from '../service';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { run, loading } = useRequest(addSupplier, {
    manual: true,
    onSuccess: (data) => {
      messageApi.success(data.msg);
      reload?.();
      form.resetFields();
    },
    onError: (e, parmas) => {
      e.message = '系统异常！';
      throw e;
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title="新建供应商"
        form={form}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>
        }
        width="400px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await run({ ...value });
          return true;
        }}
      >
        <ProFormText
          label="供应商名称"
          name="supplierName"
          rules={[
            {
              required: true,
              message: '供应商名称为必填项',
            },
          ]}
          width="md"
        />
        <ProFormText
          label="供应商代码"
          name="supplierCode"
          rules={[
            {
              required: true,
              message: '供应商代码为必填项',
            },
          ]}
          width="md"
        />
        {/* <ProFormText
          label="供应商ID"
          name="supplierId"
          rules={[
            {
              required: true,
              message: '供应商ID为必填项',
            },
          ]}
          width="md"
        /> */}
      </ModalForm>
    </>
  );
};

export default CreateForm;
