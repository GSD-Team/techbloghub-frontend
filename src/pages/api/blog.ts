// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  title: string;
  company: string;
  date: string;
  view: number;
  isLike: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
  const resData = [
    {
      title: 'AWS를 이용한 MLOps 구축 사례 살펴보기',
      company: 'AWS',
      date: '20230130',
      view: 4,
      isLike: false,
    },
    {
      title: '카카오페이의 고객분석 플랫폼 CXM 소개',
      company: '카카오페이',
      date: '20230130',
      view: 43,
      isLike: false,
    },
    {
      title: '고대 유물을 찾아서: 「C언어 기초+α」를 다시 읽고',
      company: '여기어때',
      date: '20230130',
      view: 1,
      isLike: false,
    },
    {
      title: '마이크로 서비스 환경에서 통합된 API 문서 서버 구축하기',
      company: '트랜비',
      date: '20230130',
      view: 51,
      isLike: false,
    },
    {
      title: '통합된 API 문서 서버 구축하기',
      company: '트랜비',
      date: '20230130',
      view: 35,
      isLike: false,
    },
  ];
  res.status(200).json(resData);
}
