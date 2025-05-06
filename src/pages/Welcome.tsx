import Guide from '@/components/Guide';
import { PageContainer } from '@ant-design/pro-components';
import styles from './home/index.less';

const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  return (
    <PageContainer ghost title={false}>
      <div className={styles.container}>
        <Guide name={'山月长明管理系统'} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
