import React, { useEffect, useRef, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import postData from 'service/api';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import { CODE } from '../../service/constants';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface ContentResponse {
  data: {
    blogContents: ContentItem[];
    lastId?: string;
  };
  message?: string;
  resultCode?: string;
}

interface ContentItem {
  excerpt: string;
  link: string;
  postDate: string;
  scrapDate: string;
  thumbnailURL: null | string;
  title: string;
  vendor: any;
  platformVendor: PlatformVendorItem;
}

interface PlatformVendorItem {
  id: number;
  name: string;
  thumbnailURL: string;
}

interface FlexImgBoxProps {
  url: string;
}

const Card = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: 0.3s transform !important;

  &:hover {
    transform: translateY(-10px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

const FlexImgBox = styled.div<FlexImgBoxProps>`
  flex: 0 0 8rem;
  height: 8rem;

  background: url(${(props) => props.url}) no-repeat #ddd center;
  border-radius: 10px;
  border: 1px solid #ddd;
  overflow: hidden;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 10px 0;
`;
const InfoTop = styled.div``;
const InfoTitle = styled.h3`
  font-size: 1.6rem;
`;

const InfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.span``;

const Company = styled.span``;

const Nodata = styled.div`
  width: 50%;
  font-size: 3rem;
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default function Home({ res }: { res: ContentResponse }): JSX.Element {
  const router = useRouter();
  const [listItem, setListItem] = useState(res.data);
  const [isLoading, setIsLoading] = useState(false);
  const listItemsRef = useRef<any[]>([]);
  const goLink = (link: string) => {
    window.open(link, '_blank');
  };

  const fetchMore = async () => {
    const formattedList = { ...listItem };

    setIsLoading(true);
    try {
      const response = await postData({
        url: `${process.env.NEXT_PUBLIC_DEVELOP_API}/contents`,
        method: 'GET',
        params: {
          currentNextId: listItem.lastId,
        },
      });

      if (response.resultCode === CODE.SUCCESS) {
        // 데이터 처리 로직
        formattedList.blogContents = listItem.blogContents.concat(response.data.blogContents);

        if (response.data.lastId) {
          formattedList.lastId = response.data.lastId;
        }

        setListItem(formattedList);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let io: IntersectionObserver;
    const observerCallBack = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          fetchMore().then();
        }
      });
    };
    io = new IntersectionObserver(observerCallBack, { threshold: 0.7 });

    if (listItemsRef.current[listItemsRef.current.length - 1]) {
      io.observe(listItemsRef.current[listItemsRef.current.length - 1]);
    }
  }, [listItem]);

  useEffect(() => {
    if (router.asPath !== '/') {
      setCookie(); // github token 쿠키 저장
      mainRedirect(); // 메인 페이지로 리다이렉트
    }
  }, [router.asPath]);

  const setCookie = () => {
    Cookies.set('github_token', router.asPath.split('=')[1]);
  };

  const mainRedirect = () => {
    router.push('/');
  };

  return (
    <Grid2 container>
      <Grid2 xs={2} />
      <Grid2 xs={8}>
        {listItem.blogContents.length > 0 ? (
          listItem.blogContents.map((item: ContentItem, index: number) => (
            <Card
              onClick={() => goLink(item.link)}
              ref={(element) => (listItemsRef.current[index] = element)}
              key={index}
            >
              <FlexBox style={{ gap: 10 }}>
                <FlexImgBox url={item.thumbnailURL ? item.thumbnailURL : '/no-image.png'} />
                <Info>
                  <InfoTop>
                    <InfoTitle>{item.title}</InfoTitle>
                  </InfoTop>
                  <InfoBottom>
                    <Company>
                      <img src={item.platformVendor.thumbnailURL} alt={item.platformVendor.name} height={15} />
                    </Company>
                    <Date>등록일 : {item.postDate}</Date>
                  </InfoBottom>
                </Info>
              </FlexBox>
            </Card>
          ))
        ) : (
          <Nodata>🚧 게시물 준비중입니다.</Nodata>
        )}
        {isLoading && <Skeleton animation="wave" height={300} />}
      </Grid2>
      <Grid2 xs={2} />
    </Grid2>
  );
}

export async function getStaticProps() {
  let data = null;
  const initialData = {
    data: {
      blogContents: [],
    },
  };

  try {
    const res = await postData({
      url: `${process.env.DEVELOP_API}/contents`,
      method: 'GET',
    });
    if (res.resultCode === CODE.SUCCESS) {
      data = res;
    } else {
      data = initialData;
    }
  } catch (error) {
    console.log('getStaticProps Error : ', error);
  }

  return {
    props: {
      res: data,
    },
  };
}
