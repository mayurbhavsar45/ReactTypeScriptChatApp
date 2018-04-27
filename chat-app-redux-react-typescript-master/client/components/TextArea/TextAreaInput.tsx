// import * as React from "react";
//  // tslint:disable:typedef
// export default class TextAreaInput extends React.Component {

//   constructor(props){
//     super(props);
//     this.state={
//       touched:false,
//       errorClassName:""
//     };
//   }
//   render() {
//     let validationDIV = (
//       <div className="error">
//         <span>{this.props.validationMessage}</span>
//       </div>
//     );
//     return (
//       <div className="form-group">
//         <label>{this.props.label}</label>
//         <div>
//           <textarea
//             id={this.props.TextboxId}
//             type={this.props.TextboxType}
//             className={this.props.TextBoxClass +this.state.errorClassName}
//             onChange={this.handleChange(this.props)}
//             rows={this.props.RowsToDisplay}
//             style={this.props.style}
//             value={this.props.TextboxValue}
//             onBlur={() => {
//               if(this.props.TextboxValue==="")
//               {
//                 this.setState({touched:true,errorClassName:' inputControlBorder'});
//               }
//               else
//               {
//                 this.setState({touched:false,errorClassName:''});
//               }
//             }}
//             required
//           />
//         </div>
//         {this.props.TextboxValue==="" && this.state.touched===true ? validationDIV : ""}
//       </div>
//     );
//   }

//   handleChange = props => e => {
//     props.ChangeInput(e.target.id, e.target.value);
//   };
// }

// tslint:disable:no-empty
// tslint:disable:no-trailing-whitespace
// tslint:disable:typedef
// tslint:disable:max-line-length
import * as React from "react";

interface ITextAreaProps {
  label?: string;
  validationMessage?: string;
  TextboxId?: string;
  TextBoxClass?: string;
  TextboxValue?: string;
  Placeholder?: string;
  AutoFocus?: boolean;
  ChangeInput?: (fieldName: string, value: string) => void;
  KeyPress?: () => void;
  disabled?:boolean;
  required?:boolean;
}

interface ITextInputState {
  touched?: boolean;
  errorClassName?: string;
}

type AllProps = ITextInputState & ITextAreaProps;

export default class TextInput extends React.Component<
  ITextAreaProps,
  ITextInputState
> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      touched: false,
      errorClassName: ""
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
      <div className="form-group row msg_write">
        <label>{this.props.label}</label>
        <div className="col-sm-12">
          <textarea
            id={this.props.TextboxId}
            className={this.props.TextBoxClass + this.state.errorClassName}
            onChange={this.handleChange(this.props)}
            value={this.props.TextboxValue}
            placeholder={this.props.Placeholder}
            onBlur={this.handleBlur.bind(this)}
            autoFocus={this.props.AutoFocus}
            onKeyPress={this.handleKeyPress(this.props)}
            disabled={this.props.disabled}
            required={this.props.required}
          />
        </div>
        {this.props.TextboxValue === "" && this.state.touched === true
          ? validationDIV
          : ""}
      </div>
    );
  }

  handleBlur() {
    // if (this.props.TextboxValue === "") {
    //   this.setState({
    //     touched: true,
    //     errorClassName: " inputControlBorder"
    //   });
    // } else {
    //   this.setState({ touched: false, errorClassName: "" });
    // }
  }
  handleChange = props => e => {
    props.ChangeInput(e.target.id, e.target.value);
  }
  handleKeyPress = props => e => {
    if (e.charCode === 13 && e.key==="Enter" && e.shiftKey === false && e.ctrlKey===false) {
      props.KeyPress();
    }
  }
}
