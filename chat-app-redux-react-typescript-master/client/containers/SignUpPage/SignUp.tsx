// tslint:disable:max-line-length
// tslint:disable:typedef
// tslint:disable:one-line
// tslint:disable:no-trailing-whitespace

import * as React from "react";
import {
  Button,
  Input,
  ButtonGroup,
  Glyphicon
} from "react-bootstrap-typescript";
import { Link } from "react-router";
import TextInput from "../../components/TextBox/TextInput";

import { ISignUpState } from "./reducer";
import { actionCreators } from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

type SignUpProps = ISignUpState & {
  actions: typeof actionCreators;
};

class SignUp extends React.Component<SignUpProps, {}> {
  componentDidMount(){
    this.props.actions.signUpResetValues();
    if(localStorage.length>0 && localStorage.getItem("username")!==null) {
      window.location.href="/chat";
    }
  }
  public render() {
    let isDisabled = false;
    if (
      this.props.userName === "" ||
      this.props.password === "" ||
      this.props.confirmPassword === ""
    ) {
      isDisabled = true;
    } else {
      isDisabled = false;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 offset-sm-4 pad-t-50 sign_up">
            <main>
              <form>
                <header>Sign Up</header>
                <section style={{ height: 6 + "em" }}>
                  <TextInput
                    TextboxType="text"
                    TextboxId="userName"
                    TextBoxClass="form-control"
                    validationMessage="Username cannot be empty."
                    Placeholder="Enter username"
                    TextboxValue={this.props.userName}
                    ChangeInput={(fieldName: string, value: string) =>
                      this.props.actions.signUpFieldChanged(fieldName, value)
                    }
                  />
                </section>
                <section style={{ height: 6 + "em" }}>
                  <TextInput
                    TextboxType="password"
                    TextboxId="password"
                    TextBoxClass="form-control"
                    validationMessage="Password cannot be empty."
                    Placeholder="Enter Password"
                    TextboxValue={this.props.password}
                    ChangeInput={(fieldName: string, value: string) =>
                      this.props.actions.signUpFieldChanged(fieldName, value)
                    }
                  />
                </section>
                <section style={{ height: "6em" }}>
                  <TextInput
                    TextboxType="password"
                    TextboxId="confirmPassword"
                    TextBoxClass="form-control"
                    validationMessage="Confirm Password cannot be empty."
                    Placeholder="Enter Confirm Password"
                    TextboxValue={this.props.confirmPassword}
                    ChangeInput={(fieldName: string, value: string) =>
                      this.props.actions.signUpFieldChanged(fieldName, value)
                    }
                  />
                </section>
                <section>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isDisabled}
                    style={{cursor:isDisabled===true? "not-allowed":""}}
                    onClick={()=>{
                      let uName=this.props.userName,pass=this.props.password,cPass=this.props.confirmPassword;
                      this.props.actions.signUpRequestSignUp(uName,pass,cPass);
                    }}
                  >
                      Sign Up
                  </button>
                  <Link to="/">
                    <button
                      type="button"
                      className="btn btn-success"
                      style={{ marginLeft: 10 + "px" }}
                    >
                        Back
                    </button>
                  </Link>
                </section>
              </form>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.signUp
  };
};

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ ...actionCreators }, dispatch)
}))(SignUp) as any;
