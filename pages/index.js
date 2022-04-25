import Head from 'next/head';
import Image from 'next/image';
import Layout from './shared/Layout';

import Input from '../components/Input/Input';
import hero from '../images/login.svg';
import google from '../images/icons/google.svg';
import email from '../images/icons/email.svg';
import security from '../images/icons/security.svg';
import eye from '../images/icons/eye.svg';

export default function Home() {
  return (
    <Layout>
      <div className='flex flex-col md:flex-row justify-center'>
        <div className='bg-shades-100 p-6 flex items-center basis-1/2  justify-center'>
          <div className='flex flex-col gap-2'>
            <h1>Login</h1>
            <Input placeholder={'E-mail / username'} icon={email} />
            <Input
              type={'password'}
              placeholder={'Password'}
              icon={security}
              backIcon={eye}
            />
            <div className='flex justify-between text-xs text-paragraph underline'>
              <div className='cursor-pointer'>Remember me.</div>
              <div className='cursor-pointer'>Forget Password</div>
            </div>
            <div className='flex justify-center bg-black rounded border-none px-3 py-2 text-sm cursor-pointer text-white mt-3'>
              <button>Sign In</button>
            </div>
            <p className='text-xs flex justify-center m-4'> Or</p>
            <Image src={google} />
            <p className='text-xs flex justify-center m-4'>
              Don't have an account?&nbsp;{' '}
              <span className='font-bold text-paragraph'>Sign up</span>
            </p>
          </div>
        </div>
        <div className='basis-1/2'>
          <Image src={hero} layout='responsive' />
        </div>
      </div>
    </Layout>
  );
}
