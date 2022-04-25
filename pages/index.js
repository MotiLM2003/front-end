import Head from 'next/head';
import Image from 'next/image';
import Layout from './shared/Layout';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 className='bg-red-100'>World Of Tzedaka</h1>
      </div>
    </Layout>
  );
}
