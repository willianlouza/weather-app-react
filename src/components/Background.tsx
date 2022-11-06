import React from "react";
import src from "../assets/backgrounds/day.jpg"

interface IProps {
  src: string;
}
export default class Background extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props);
  }
  render(): React.ReactNode {
    return (
      <div className={`min-w-screen min-h-screen fixed bg-red-400 -z-10`}>
        <img src={src} alt="" className="h-full w-full object-cover"/>
      </div>
    )
  }
}