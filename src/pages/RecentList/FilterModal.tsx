import styled from 'styled-components';
import close from 'src/asset/icons/ic_close.png';

interface Props {
  sortToggle: boolean;
  filterList: Array<{ key: string; value: string }>;
  selectFilter: string;
  setSortToggle: (a: boolean) => void;
  setSelectFilter: (a: string) => void;
}

export default function FilterModal({
  sortToggle,
  filterList,
  selectFilter,
  setSelectFilter,
  setSortToggle,
}: Props) {
  if (sortToggle) {
    return (
      <FilterBack>
        <Filter>
          <FilterHeader>
            <h2>필터정렬</h2>
            <button onClick={() => setSortToggle(false)}>
              <img src={close} alt="close" />
            </button>
          </FilterHeader>
          <div>
            <ul>
              {filterList.map(li => {
                return (
                  <FilterLi
                    select={li.key === selectFilter}
                    onClick={() => {
                      setSelectFilter(li.key);
                    }}
                    key={li.key}
                  >
                    {li.value}
                  </FilterLi>
                );
              })}
            </ul>
          </div>
        </Filter>
      </FilterBack>
    );
  } else {
    return <div></div>;
  }
}

const FilterBack = styled.div`
  width: 100%;
  height: 1000px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Filter = styled.div`
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  border-radius: 16px 16px 0px 0px;
  padding: 10px;
`;

const FilterHeader = styled.div`
  padding: 16px 10px;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 16px;
    line-height: 24px;
  }
  button {
    background: none;
    border: none;
  }
`;

const FilterLi = styled.li<{ select: boolean }>`
  height: 40px;
  background: ${props => (props.select ? '#e5e8ff' : 'none')};
  color: ${props => (props.select ? '#1833ff' : 'black')};
  padding: 14px 10px;
  font-size: 14px;
`;
