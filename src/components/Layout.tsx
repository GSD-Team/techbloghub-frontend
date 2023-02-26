import styled from "@emotion/styled";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Wrapper>
      <Header>
        <Logo>
          <Link href="/">TechBlogPosts</Link>
        </Logo>
        <FlexBox style={{ gap: 10 }}>
          <Link href="/login">
            <TopButton>Login</TopButton>
          </Link>
          <Link href="/signUp">
            <TopButton>Sign up</TopButton>
          </Link>
        </FlexBox>
      </Header>
      {children}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f4f4f4;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 5rem;
  box-sizing: border-box;
  background-color: #fff;
`;

const FlexBox = styled.div`
  display: flex;
`;

const TopButton = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  transition: 0.3s all;

  &:hover {
    transform: scale(1.2);
  }
`;

const Logo = styled.h1`
  font-size: 3rem;
  transition: 0.3s all;
  color: skyblue;
  &:hover {
    opacity: 0.1;
  }
`;
