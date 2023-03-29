import React, { useEffect, useRef, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import postData from 'service/api';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

interface ContentResponse {
  data: {
    blogContents: ContentItem[];
    lastId?: string;
  };
  message: string;
  resultCode: string;
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

export default function Home({ res }: { res: ContentResponse }): JSX.Element {
  const [listItem, setListItem] = useState(res.data);
  const [isLoading, setIsLoading] = useState(false);
  const listItemsRef = useRef<any[]>([]);
  const goLink = (link: string) => {
    window.open(link, '_blank');
  };

  const fetchMore = async () => {
    console.log('fetchMore', listItem.lastId);
    return postData({
      url: 'http://localhost:3000/api/contents/mock',
      method: 'GET',
      params: {
        currentNextId: listItem.lastId,
      },
    });
  };

  useEffect(() => {
    const observerCallBack = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);

          setIsLoading(true);

          fetchMore().then((moreRes: ContentResponse) => {
            const formattedList = { ...listItem };
            formattedList.blogContents = listItem.blogContents.concat(moreRes.data.blogContents);

            if (moreRes.data.lastId) {
              formattedList.lastId = moreRes.data.lastId;
            }
            setListItem(formattedList);

            setIsLoading(false);
          });
        }
      });
    };
    const io = new IntersectionObserver(observerCallBack, { threshold: 0.7 });

    if (listItemsRef.current[listItemsRef.current.length - 1]) {
      io.observe(listItemsRef.current[listItemsRef.current.length - 1]);
    }
  }, [fetchMore, listItem]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <Grid2 container>
      <Grid2 xs={2} />
      <Grid2 xs={8}>
        {listItem.blogContents.map((item: ContentItem, index: number) => (
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
        ))}
        {isLoading && <Skeleton animation="wave" height={300} />}
      </Grid2>
      <Grid2 xs={2} />
    </Grid2>
  );
}

export async function getStaticProps() {
  const res = await postData({
    url: 'http://localhost:3000/api/contents/',
    method: 'GET',
  });
  return {
    props: {
      res,
    },
  };
}
