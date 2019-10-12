import React from "react";
import "./userInfo.css";
import BackArrow from "../../image/icon_backArrow.png";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    };
  }

  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.userDetails
    ) {
      this.setState({
        userInfo: this.props.location.state.userDetails
      });
    }
  }

  componentWillReceiveProps(nextProps) {}

  goBack = () => {
    this.props.history.push({
      pathname: `/`
    });
  };

  render() {
    return (
      <div>
        <div className="header">
          <span className="header-name">FOOBAR</span>MEMBER LOG
        </div>
        <div className="user-info-back-arrow">
          <span>
            <img
              src={BackArrow}
              alt="no img"
              height="11px"
              onClick={this.goBack}
              style={{ cursor:"pointer" }}
            />
          </span>
          <span className="user-info-back" onClick={this.goBack}>
            Back
          </span>
        </div>
        <div className="user-info-container">
          <div className="user-info-personal-details">
            <div className="user-info-image">
              <img src={this.state.userInfo.picture} alt="no img" />
            </div>
            <div className="user-info-full-name">
              {this.state.userInfo.name}
            </div>
            <div
              style={{
                width: "30px",
                height: "2px",
                background: "#c2c2c2"
              }}
            ></div>
            <div className="user-info-address">
              {this.state.userInfo.location}
            </div>
          </div>
          <div className="user-info-details">
            <div className="user-info-details-wrapper">
              <div className="user-info-content">Gender</div>
              <div className="user-info-content">Age</div>
              <div className="user-info-content">Email</div>
              <div className="user-info-content">Phone</div>
            </div>
            <div className="user-info-details-wrapper">
              <div className="user-info-content">:</div>
              <div className="user-info-content">:</div>
              <div className="user-info-content">:</div>
              <div className="user-info-content">:</div>
            </div>
            <div>
              <div className="user-info-content">
                {this.state.userInfo.gender}
              </div>
              <div className="user-info-content">
                {this.state.userInfo.age + " " + "years"}
              </div>
              <div className="user-info-content">
                {this.state.userInfo.email}
              </div>
              <div className="user-info-content">
                {this.state.userInfo.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
