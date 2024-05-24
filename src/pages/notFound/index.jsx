import styled from "styled-components";
const NotFoundStyled = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    color: #333;
    font-size: 16px;
    margin-bottom: 6px;
  }
  h2 {
    font-size: 14px;
    color: #999;
  }
`;

export default function NotFound() {
  return (
    <NotFoundStyled>
      <img src={require("@/assets/404.png")} alt="" />
      <h1>很抱歉，你访问的页面不存在</h1>
      <h2>请检查您输入的网址是否正确</h2>
    </NotFoundStyled>
  );
}
