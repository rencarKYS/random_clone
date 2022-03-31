import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import productJson from 'src/data/product.json';
import { filterList } from 'src/constants/recentListData';
import { setStorage, getStorage } from 'src/utils/storage';
import ProductList from './ProductList';
import FilterModal from './FilterModal';
import { BrandData } from 'src/interface/product';
import sortIcon from 'src/asset/icons/sort_icon.png';

export default function RecentList() {
  const [brandList, setBrandList] = useState<Array<string>>([]);
  const [itemList, setItemList] = useState<Array<object>>([]);
  const [selectFilter, setSelectFilter] = useState<string>('');
  const [sortToggle, setSortToggle] = useState<boolean>(false);
  const [selectBrands, setSelectBrands] = useState<Array<string>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorage('accumulate');
    if (data) {
      const filterBrand = data.map((item: BrandData) => item.brand);
      const brands = Array.from(new Set(filterBrand));
      setBrandList(brands as Array<string>);
    }
    setItemList(Array.from(productJson));
  }, []);

  useEffect(() => {
    if (selectFilter === 'rowFee') rowFeeSort(itemList as Array<BrandData>);
    if (selectFilter === 'recent') recentSearchSort();
  }, [selectFilter]);

  useEffect(() => {
    brandFilter();
    return () => brandFilter();
  }, [selectBrands]);

  const targetFilter = () => {
    const result = filterList.find(list => list.key === selectFilter);
    return result?.value;
  };

  const checked = (brand: string) => {
    setSelectBrands(list => [...list, brand]);
  };

  const unChecked = (brand: string) => {
    const deleteBrand = selectBrands.filter(select => select !== brand);
    setSelectBrands(deleteBrand);
  };

  const brandSelectHandler = (brand: string) => {
    selectBrands.includes(brand) ? unChecked(brand) : checked(brand);
  };

  const rowFeeSort = (list: Array<BrandData>) => {
    if (!selectBrands.length && !list.length) {
      list = Array.from(productJson) as Array<BrandData>;
    }
    list.sort((a, b) => (a as BrandData).price - (b as BrandData).price);
    setItemList(list);
  };

  const recentSearchSort = () => {
    let accumulate = getStorage('accumulate');
    if (selectBrands.length > 0) {
      accumulate = selectBrands
        .map(brand =>
          accumulate.filter((item: BrandData) => item.brand === brand),
        )
        .flat();
    }
    if (!accumulate || !accumulate.length) return setItemList([]);
    if (accumulate) return setItemList(accumulate);
  };

  const brandFilter = () => {
    const list = Array.from(productJson);
    if (!selectBrands.length) return setItemList(list);
    const result = selectBrands.map(brand => {
      if (!selectFilter) {
        return list.filter((item: any) => item.brand === brand);
      } else {
        return itemList.filter((item: any) => item.brand === brand);
      }
    });
    if (selectFilter === 'rowFee')
      return rowFeeSort(result.flat() as Array<BrandData>);
    if (selectFilter === 'recent') return recentSearchSort();
    setItemList(result.flat());
  };

  const selectItem = (item: BrandData) => {
    let accumulate = getStorage('accumulate') || [];
    if (accumulate.length) {
      accumulate = accumulate.filter(
        (storageData: BrandData) => storageData.title !== item.title,
      );
    }
    setStorage('selectProduct', item);
    setStorage('accumulate', [item, ...accumulate]);
    navigate('/product');
  };

  const selectAll = () => {
    setSelectFilter('');
    setItemList(Array.from(productJson));
    setSelectBrands([]);
  };

  return (
    <Wrap>
      <BrandArea>
        <BrandUl>
          <BrandList>
            <input
              id="all"
              type="checkbox"
              onChange={selectAll}
              checked={selectBrands.length === 0}
            />
            <label htmlFor="all">전체</label>
          </BrandList>
          {brandList.map((brand, i) => {
            return (
              <BrandList key={i}>
                <input
                  onChange={() => brandSelectHandler(brand)}
                  checked={selectBrands.includes(brand)}
                  id={brand}
                  type="checkbox"
                />
                <label htmlFor={brand}>{brand}</label>
              </BrandList>
            );
          })}
        </BrandUl>
      </BrandArea>
      <div>
        <SearchFilterArea>
          <p>조회한 상품 {itemList.length}개</p>
          <SortBtn onClick={() => setSortToggle(true)}>
            <img src={sortIcon} alt={targetFilter()} />
            <p>{targetFilter()}</p>
          </SortBtn>
        </SearchFilterArea>
        <ProductList
          data={itemList as Array<BrandData>}
          selectItem={selectItem}
        />
      </div>
      <FilterModal
        sortToggle={sortToggle}
        setSortToggle={setSortToggle}
        filterList={filterList}
        setSelectFilter={setSelectFilter}
        selectFilter={selectFilter}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  overflow: auto;
`;

const SortBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  img {
    margin-right: 5px;
  }
`;

const BrandArea = styled.div`
  width: 100%;
  height: 63px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  overflow-y: auto;
`;

const BrandUl = styled.ul`
  display: -webkit-box;
`;

const BrandList = styled.li`
  margin-right: 6px;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  input {
    display: none;
  }
  label {
    padding: 8px 12px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    display: block;
    min-width: 58px;
    text-align: center;
    font-size: 12px;
  }
  input:checked + label {
    background: #000000;
    color: white;
    border: 1px solid #000000;
  }
`;

const SearchFilterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 17px;
  padding: 0 20px;
`;
