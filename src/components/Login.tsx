import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(7px);
`;

const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 0 0 200px;
  height: 40px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  background: #000;
  border: 0;
  cursor: pointer;
`;
export default function Loading(props: any): JSX.Element {
  const { closeLogin } = props;

  const loginGithub = async (e: any) => {
    e.stopPropagation();
    // let res = null;
    // try {
    //   const params = {
    //     client_id: process.env.GITHUB_CLIENT_ID,
    //     redirect_url: process.env.GITHUB_REDIRECT_URL,
    //     scope: 'user',
    //     state: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    //   };
    //
    //   console.log(process.env);
    //
    //   Cookies.set('github_oauth_state', params.state);
    //   res = await postData({ url: '/api/login/auth2/github', method: 'GET', params });
    //   // const url = `https://github.com/login/oauth/authorize?client_id=${params.client_id}&redirect_uri=${params.redirect_url}&scope=${params.scope}&state=${params.state}`;
    //   // res = await postData({ url: url, method: 'GET' });
    //   console.log(res);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <LoginWrapper onClick={() => closeLogin(false)}>
      <LoginButton onClick={loginGithub}>
        <Image src="/icon/ico-github-mark.svg" width={20} height={20} alt="깃허브 아이콘" />
        <span>github 로그인</span>
      </LoginButton>
    </LoginWrapper>
  );
}
