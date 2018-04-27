 // tslint:disable:typedef
import * as React from "react";
import { Link } from "react-router";
import TextInput from "../../components/TextBox/TextInput";
import { ISignInState } from "./reducer";
import { signInActionCreators } from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

type SignInProps = ISignInState & {
  actions: typeof signInActionCreators;
};

class SignIn extends React.Component<SignInProps, {}> {
  componentDidMount() {
    this.props.actions.signInResetValues();
    if(localStorage.length>0 && localStorage.getItem("username")!==null) {
      window.location.href="/chat";
    }
  }
  public render() {
    let isDisabled = false;
    if (this.props.userName === "" || this.props.password === "") {
      isDisabled = true;
    } else {
      isDisabled = false;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 offset-sm-4 pad-t-50 sign_up">
            <main>
              <header>Sign In</header>
              <form>
                <section style={{ height: 6 + "em" }}>
                  <TextInput
                    TextboxType="text"
                    TextboxId="userName"
                    TextBoxClass="form-control"
                    validationMessage="Username cannot be empty."
                    Placeholder="Enter username"
                    TextboxValue={this.props.userName}
                    ChangeInput={(fieldName: string, value: string) =>
                      this.props.actions.signInFieldChanged(fieldName, value)
                    }
                  />
                </section>
                <section style={{ height: "6em" }}>
                  <TextInput
                    TextboxType="password"
                    TextboxId="password"
                    TextBoxClass="form-control"
                    validationMessage="Password cannot be empty."
                    Placeholder="Enter Password"
                    TextboxValue={this.props.password}
                    ChangeInput={(fieldName: string, value: string) =>
                      this.props.actions.signInFieldChanged(fieldName, value)
                    }
                  />
                </section>
                <section>
                <button
                    type="button"
                    className="btn btn-success"
                    disabled={isDisabled}
                    style={{cursor:isDisabled===true? "not-allowed":""}}
                    onClick={()=> {
                      let userName=this.props.userName,password=this.props.password;
                      this.props.actions.signInRequestSignIn(userName,password);
                    }}
                  >
                      Sign In
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
                <div style={{marginTop:"5px",color:"red",fontWeight: 500,fontSize: "17px"}}>
                  <p>{this.props.error}</p>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

// tslint:disable:typedef
const mapStateToProps = state => {
  return {
    ...state.signIn
  };
};

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ ...signInActionCreators }, dispatch)
}))(SignIn) as any;
