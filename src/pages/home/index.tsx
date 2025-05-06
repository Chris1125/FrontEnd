import Guide from '@/components/Guide';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  return (
    <div>
      <PageContainer ghost>
        <div className={styles.container}>
          <Guide name={'山月长明管理系统'} />
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage;
