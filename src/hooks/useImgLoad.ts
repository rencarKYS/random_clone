import { useState, useEffect } from 'react';

export default function useImgLoad(productImg: string) {
  const [imgLoad, setImgLoad] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgLoad(true);
    };
    img.src = productImg;
  }, [productImg]);

  return imgLoad;
}
