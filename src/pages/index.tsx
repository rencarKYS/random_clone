import { Outlet } from 'react-router-dom';
import ContentsWrap from '../layout/ContentsWrap';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function index() {
  return (
    <ContentsWrap>
      <Header />
      <Outlet />
      <Footer />
    </ContentsWrap>
  );
}
