import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import useImgLoad from '../hooks/useImgLoad';
import { wonParser } from 'src/utils/parser';
import { BrandData } from 'src/interface/product';
import SkeletonImage from './SkeletonImage';
import productImg from 'src/asset/images/image_7.jpg';

interface Props {
  data: BrandData;
}

const LazyImage = lazy(() => import('./LazyImage'));

export default function ProductCard({ data }: Props) {
  const imgLoad = useImgLoad(productImg);
  return (
    <Wrap>
      <ProductImage>
        <Suspense fallback={!imgLoad && <SkeletonImage />}>
          <LazyImage src={productImg} name={'product image'} />
        </Suspense>
      </ProductImage>
      <div>
        <Text fs={16} fw={700} lh={24}>
          {wonParser(data.price)}
        </Text>
        <Text fs={12} lh={18}>
          {data.brand}
        </Text>
        <Text fs={14} lh={21}>
          {data.title}
        </Text>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ProductImage = styled.div`
  min-width: 112px;
  height: 112px;
  margin-right: 16px;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.p<{ fs: number; lh: number; fw?: number }>`
  color: ${props => props.color || '#000000'};
  font-size: ${props => `${props.fs}px`};
  line-height: ${props => `${props.lh}px`};
  font-weight: ${props => props.fw || 'normal'};
`;
