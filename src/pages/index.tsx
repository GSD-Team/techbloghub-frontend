import Grid2 from "@mui/material/Unstable_Grid2";
import Fade from "@mui/material/Fade";
import postData from "service/api";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import HideImageIcon from "@mui/icons-material/HideImage";

interface ContentResponse {
  data: {
    contents: ContentItem[];
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
}

interface FlexImgBoxProps {
  url: string;
}

export default function Home({ res }: any): JSX.Element {
  console.log(res);
  const router = useRouter();

  const goLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <Grid2 container>
      <Grid2 xs={2}></Grid2>
      <Grid2 xs={8}>
        {res.data.contents.map((item: ContentItem, index: number) => (
          <Card onClick={() => goLink(item.link)}>
            <FlexBox style={{ gap: 10 }}>
              <FlexImgBox
                url={item.thumbnailURL ? item.thumbnailURL : "/no-image.png"}
              ></FlexImgBox>
              <Info>
                <InfoTop>
                  <InfoTitle>{item.title}</InfoTitle>
                </InfoTop>
                <InfoBottom>
                  <Company>
                    <img
                      src={item.vendor.thumbnailURL}
                      alt={item.vendor.name}
                      height={15}
                    />
                  </Company>
                  <Date>등록일 : {item.postDate}</Date>
                </InfoBottom>
              </Info>
            </FlexBox>
          </Card>
        ))}
      </Grid2>
      <Grid2 xs={2}></Grid2>
    </Grid2>
  );
}

export async function getStaticProps() {
  const res = await postData({
    url: "http://localhost:3000/api/contents/mock",
    method: "GET",
  });
  return {
    props: {
      res,
    },
  };
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
