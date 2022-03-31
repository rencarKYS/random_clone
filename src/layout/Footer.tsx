import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineAppstore, AiOutlineUnorderedList } from 'react-icons/ai';

export default function Footer() {
  const { pathname } = useLocation();
  return (
    <Wrap>
      <NavUl>
        <li>
          <NavLink match={pathname === '/product' ? 1 : 0} to="/product">
            <AiOutlineAppstore style={{ flex: 1, fontSize: 35 }} />
            <p>상품상세</p>
          </NavLink>
        </li>
        <li>
          <NavLink match={pathname === '/recentList' ? 1 : 0} to="/recentList">
            <AiOutlineUnorderedList style={{ flex: 1, fontSize: 35 }} />
            <p>조회이력</p>
          </NavLink>
        </li>
      </NavUl>
    </Wrap>
  );
}

const Wrap = styled.footer`
  width: 100%;
  margin-top: auto;
  border-top: 1px solid #e6e6e6;
`;

const NavUl = styled.ul`
  display: flex;
  align-items: center;
  li {
    flex: 1;
  }
`;

const NavLink = styled(Link)<{ match: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 56px;
  padding: 5px;
  text-decoration: none;
  color: ${props => (props.match ? 'coralblue' : '#cccccc')};
  p {
    font-size: 12px;
    color: ${props => (props.match ? 'coralblue' : '#000000')};
    margin-top: 5px;
  }
`;
