import React from "react";

interface IProps {
  onSubmit: (query: string) => void;
}
interface IState {
  value: string;
}
export default class SearchBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: ""
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    this.setState({ value: value });
  }
  submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let arr = this.state.value.split(",");
    let city = arr[0].trim().split(" ").join("+");
    let country = arr[1] ? arr[1].trim().split(" ").join("+") : null;
    let params = country ? new String().concat(city, ",", country) : city;
    this.props.onSubmit(params);
  }
  render(): React.ReactNode {
    return (
      <div className="w-screen px-10 fixed top-10">
        <form className="relative" onSubmit={(event) => { this.submitHandler(event) }}>
          <input className="pl-12 text-xl bg-transparent outline-none border-b border-white text-white w-full h-10 focus:bg-transparent"
            type="text"
            placeholder="Ex: Rio de Janeiro, BR"
            value={this.state.value}
            onChange={(e) => this.changeHandler(e)}
            name="search"
          />
          <button type="submit" className="flex absolute inset-y-0 left-0 items-center p-3 bg-white bg-opacity-20">
            <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form >
      </div >
    )
  }
}