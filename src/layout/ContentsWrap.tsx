import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export default function ContentsWrap({ children }: Props) {
  return <Wrap>{children}</Wrap>;
}

const Wrap = styled.div`
  width: 375px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;
