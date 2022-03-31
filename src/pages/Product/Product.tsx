import { useEffect, useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import productJson from 'src/data/product.json';
import useImgLoad from 'src/hooks/useImgLoad';
import { getStorage, setStorage } from 'src/utils/storage';
import { wonParser } from 'src/utils/parser';
import { BrandData } from 'src/interface/product';
import SkeletonImage from 'src/components/SkeletonImage';
import image from '../../asset/images/img_ctn.png';
import random from '../../asset/icons/random_icon.png';

const LazyImage = lazy(() => import('src/components/LazyImage'));

export default function Product() {
  const imgLoad = useImgLoad(image);
  const [productDetail, setProductDetail] = useState<BrandData>({
    title: '',
    brand: '',
    price: 0,
  });

  useEffect(() => {
    setProductDetail(getStorage('selectProduct'));
  }, []);

  const randomProduct = () => {
    const products = Array.from(productJson);
    const randomNum = Math.random() * products.length - 1;
    const pickRandomProduct = products[Math.floor(randomNum)];
    const accumulate = getStorage('accumulate') || [];
    if (productDetail?.title === pickRandomProduct?.title) {
      randomProduct();
    } else {
      setProductDetail(pickRandomProduct as BrandData);
      setStorage('selectProduct', pickRandomProduct);
      setStorage('accumulate', [pickRandomProduct, ...accumulate]);
    }
  };

  return (
    <Wrap>
      {productDetail && (
        <>
          <ProductImage>
            <Suspense fallback={!imgLoad && <SkeletonImage />}>
              <LazyImage src={image} name={'product detail image'} />
            </Suspense>
          </ProductImage>
          <ProductInfo>
            <Text color="#666666" fs={12} lh={18}>
              {productDetail.brand}
            </Text>
            <Text color="#333333" fs={18} lh={27}>
              {productDetail.title}
            </Text>
            <Text fs={24} lh={36}>
              {wonParser(productDetail.price)}
            </Text>
          </ProductInfo>
        </>
      )}
      <RandomArea>
        <RandomBtn onClick={randomProduct}>
          <img src={random} />
          <p>랜덤 상품 조회</p>
        </RandomBtn>
      </RandomArea>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  overflow: auto;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 375px;
  max-height: 375px;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const ProductInfo = styled.section`
  padding: 24px 20px 16px;
`;

const Text = styled.p<{ fs: number; lh: number }>`
  color: ${props => props.color || '#000000'};
  font-size: ${props => `${props.fs}px`};
  line-height: ${props => `${props.lh}px`};
`;

const RandomArea = styled.div`
  border-top: 1px solid #f2f2f2;
  margin: 0 20px;
  padding: 26px 0;
`;

const RandomBtn = styled.button`
  width: 100%;
  height: 51px;
  background: #ffffff;
  border: 1px solid #333333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 6px;
  }
`;
