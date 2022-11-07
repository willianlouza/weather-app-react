import React from 'react';
import { Card } from './style';

interface IProps {
  width?: string;
  height?: string;
  color: string;
  className?:string;
  children: React.ReactNode;
}
export default class BlurryCard extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <Card className={this.props.className} width={this.props.width} height={this.props.height} color={this.props.color}>
        {this.props.children}
      </Card>
    )
  }
}