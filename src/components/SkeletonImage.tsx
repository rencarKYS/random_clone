import styled from 'styled-components';

export default function SkeletonImage() {
  return <Skeleton></Skeleton>;
}

const Skeleton = styled.div`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 5s infinite linear;
  }
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #eeeeee;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }
`;
