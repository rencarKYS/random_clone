import styled from 'styled-components';
import ProductCard from 'src/components/ProductCard';
import { BrandData } from 'src/interface/product';

interface Props {
  data: Array<BrandData>;
  selectItem: (item: BrandData) => void;
}

export default function ProductList({ data, selectItem }: Props) {
  if (!data || !data.length) {
    return (
      <EmptyItem>
        <p>조회한 상품 목록이 없습니다.</p>
      </EmptyItem>
    );
  } else {
    return (
      <ListUl>
        {data.map((item, i) => {
          return (
            <li key={i} onClick={() => selectItem(item as BrandData)}>
              <ProductCard data={item as BrandData} />
            </li>
          );
        })}
      </ListUl>
    );
  }
}

const ListUl = styled.ul`
  padding: 0 20px;
  li {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

const EmptyItem = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  text-align: center;
  p {
    font-size: 13px;
    color: #cccccc;
  }
`;
