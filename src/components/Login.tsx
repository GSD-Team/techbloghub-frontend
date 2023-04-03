import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import * as process from 'process';

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

const LoginButton = styled.a`
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
export default function Login(props: any): JSX.Element {
  const { closeLogin } = props;

  return (
    <LoginWrapper onClick={() => closeLogin(false)}>
      <LoginButton href={process.env.NEXT_PUBLIC_GITHUB_URL}>
        <Image src="/icon/ico-github-mark.svg" width={20} height={20} alt="깃허브 아이콘" />
        <span>github 로그인</span>
      </LoginButton>
    </LoginWrapper>
  );
}
