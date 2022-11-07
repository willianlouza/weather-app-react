import styled from "styled-components";
interface IProps {
  src: string;
}
export const Container = styled.div<IProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -9;
  ${(props: IProps) => {
    return `
      background-image: url('${props.src}');
    `;
  }}
`;
