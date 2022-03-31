import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages';
import { storageClear } from './utils/storage';
import Product from './pages/Product';
import RecentList from './pages/RecentList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useRef } from 'react';
dayjs.locale('ko');

function App() {
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTime = dayjs().endOf('day').diff(dayjs(), 'millisecond') + 1000;

  useEffect(() => {
    resetTimeOut();
    return () => clearTimeout(timeRef.current as NodeJS.Timeout);
  }, []);

  const resetTimeOut = () => {
    timeRef.current = setTimeout(() => {
      storageClear();
      alert('자정이 넘어 최근 조회 목록을 초기화 합니다.');
      location.reload();
    }, resetTime);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="product" element={<Product />} />
          <Route path="recentList" element={<RecentList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
