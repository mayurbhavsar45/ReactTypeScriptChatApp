import * as React from "react";

interface ITextinputProps {
  label?: string;
  validationMessage?: string;
  TextboxId?: string;
  TextboxType?: string;
  TextBoxClass?: string;
  TextboxValue?: string;
  Placeholder?: string;
  ChangeInput?: (fieldName: string, value: string) => void;
}

interface ITextInputState {
  touched?: boolean;
  errorClassName?: string;
}

type AllProps = ITextInputState & ITextinputProps;

export default class TextInput extends React.Component<ITextinputProps, ITextInputState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      touched: false,
      errorClassName: "",
    };
  }
  // tslint:disable:typedef
  public render() {
    let validationDIV: any = (
      <div className="error">
        <span>{this.props.validationMessage}</span>
      </div>
    );

    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <div>
          <input
            id={this.props.TextboxId}
            type={this.props.TextboxType}
            className={this.props.TextBoxClass + this.state.errorClassName}
            onChange={this.handleChange(this.props)}
            value={this.props.TextboxValue}
            placeholder={this.props.Placeholder}
            onBlur={this.handleBlur.bind(this)}
            required
          />
        </div>
        {this.props.TextboxValue === "" && this.state.touched === true
          ? validationDIV
          : ""}
      </div>
    );
  }

  handleBlur() {
    if (this.props.TextboxValue === "") {
      this.setState({
        touched: true,
        errorClassName: " inputControlBorder"
      });
    } else {
      this.setState({ touched: false, errorClassName: "" });
    }
  }
  handleChange = props => e => {
    props.ChangeInput(e.target.id, e.target.value);
  }
}
