import React from "react";
import { Container } from "./style"
interface IProps {
  src: string;
}
export default class Background extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props);
  }
  render(): React.ReactNode {
    return (
      <>
        <Container src={this.props.src} />
      </>
    )
  }
}