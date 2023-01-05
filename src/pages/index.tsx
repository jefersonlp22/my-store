import axios from 'axios';
import { GetStaticProps } from 'next';

import { Store } from '~/interfaces';
import { Layout, Home } from '../components';
import { BASE_URL } from '~/utils/service';

export interface HomeProps {
  stores: Store[];
}

const HomePage = ({ stores = [] }: HomeProps) => {
  return (
    <Layout title="Minha lojinha">
      <Home stores={stores} />
    </Layout>
  );
};

export default HomePage;
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(`${BASE_URL}stores`);
  return { props: { stores: data } };
};
