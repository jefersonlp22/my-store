import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '~/components';

import ListDetail from '../../components/ListDetail';
import { User } from '../../interfaces/user';
import { sampleUserData } from '../../utils/sample-data';

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return <>{item && <ListDetail item={item} />}</>;
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sampleUserData.map((user) => ({
    params: { id: user?.id?.toString() as string },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //https://api.github.com/users/jefersonlp22
  try {
    const id = params?.id;
    const item = sampleUserData.find((data) => data.id === Number(id));

    return { props: { item } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
