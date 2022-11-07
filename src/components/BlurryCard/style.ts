import styled from "styled-components";

interface CardProps {
  width?: string;
  height?: string;
  color: string;
}
export const Card = styled.div<CardProps>`
  position: relative;
  width: ${(props: CardProps) => props.width};
  height: ${(props: CardProps) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;

  ::after {
    content: " ";
    position: absolute;
    background-color: ${(props: CardProps) => props.color};
    width: 100%;
    height: 100%;
    border-radius: 16px;
    z-index: -1;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
