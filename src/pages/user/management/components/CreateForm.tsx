import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import { FC } from 'react';
import { add } from '../service';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const { run, loading } = useRequest(add, {
    manual: true,
    onSuccess: (data) => {
      messageApi.success(data.msg);
      reload?.();
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
        title="新建用户"
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
          label="登录账号"
          name="username"
          rules={[
            {
              required: true,
              message: '登录账号为必填项',
            },
          ]}
          width="md"
        />
        <ProFormText
          label="密码"
          name="password"
          disabled
          placeholder={'初始密码为 QWER1234*'}
          initialValue="QWER1234*"
          width="md"
        />
        <ProFormText
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '姓名为必填项',
            },
          ]}
          width="md"
        />
        <ProFormText
          label="手机号"
          name="mobile"
          rules={[
            {
              required: false,
              message: '手机号码为必填项',
            },
          ]}
          width="md"
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
