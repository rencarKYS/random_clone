import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackArrow from 'src/asset/icons/back_icon.png';
import LogoImg from 'src/asset/images/logo.png';

export default function Header() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <BackBtn onClick={() => navigate(-1)}>
        <img src={BackArrow} alt="back button" />
      </BackBtn>
      <Logo>
        <img src={LogoImg} alt="camel logo" />
      </Logo>
    </Wrap>
  );
}

const Wrap = styled.header`
  position: relative;
  width: 100%;
  height: 56px;
  padding: 19px;
  box-sizing: border-box;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 18px;
  left: 20px;
  width: 26px;
  height: 26px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  img {
    width: 100%;
    height: auto;
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  width: 86px;
  margin: 0 auto;
  img {
    width: 100%;
    height: auto;
  }
`;
