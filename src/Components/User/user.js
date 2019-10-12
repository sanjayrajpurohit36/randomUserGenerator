import React from "react";
import {
  getAllUserAction,
  addMemberAction,
  deleteMemberAction
} from "../../Action/userAction";
import { connect } from "react-redux";
import "./user.css";
import LocationPin from "../../image/icon_locationPin.png";

const mapStateToProps = store => {
  return {
    userData: store.user.userData,
    user: store.user.allUser,
    deleteUser: store.user.deleteUser
  };
};

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      key: null,
      showDeletePopup: false
    };
  }

  componentDidMount() {
    this.setState({
      userList: this.props.user
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userData !== nextProps.userData &&
      nextProps.userData.results
    ) {
      var data = nextProps.userData.results;
      this.props.dispatch(addMemberAction(data));
    }
    if (this.props.user !== nextProps.user) {
      this.setState({
        userList: nextProps.user
      });
    }
  }

  addMember = () => {
    this.props.dispatch(getAllUserAction);
  };

  getUserValue = value => {
    var userDetails = Object.assign({}, value);
    var name = userDetails.name.first + "" + userDetails.name.last;
    var address =
      userDetails.location.street.number +
      " " +
      userDetails.location.street.name +
      "," +
      userDetails.location.city +
      "," +
      userDetails.location.state +
      "," +
      userDetails.location.postcode;
    this.props.history.push({
      pathname: `/${name}`,
      state: {
        userDetails: {
          name: name,
          age: userDetails.dob.age,
          gender: userDetails.gender,
          phone: userDetails.phone,
          location: address,
          email: userDetails.email,
          picture: userDetails.picture.large
        }
      }
    });
  };

  getDeleteConfirmation(key) {
    this.setState({
      key: key,
      showDeletePopup: true
    });
  }

  cancelDeletePopup = () => {
    this.setState({
      key: null,
      showDeletePopup: false
    });
  };

  deleteMember = () => {
    this.props.dispatch(deleteMemberAction(this.state.key));
    this.setState({
      key: null,
      showDeletePopup: false
    });
  };

  searchMember = e => {
    var input = e.target.value.toUpperCase();
    this.setState(
      {
        userList: this.props.user
      },
      () => {
        var res = this.state.userList.filter(
          items =>
            items.name.first.toUpperCase().indexOf(input) > -1 ||
            items.name.last.toUpperCase().indexOf(input) > -1
        );
        this.setState({
          userList: res
        });
        if (input === "") {
          this.setState({
            userList: this.props.user
          });
        }
      }
    );
  };

  render() {
    return (
      <div>
        <div className="header">
          <span className="header-name">FOOBAR</span>MEMBER LOG
        </div>
        <div className="member-search">
          <input
            placeholder="Search members by name"
            onChange={this.searchMember}
          ></input>
          <div className="member-count">
            {this.state.userList && this.state.userList.length !== 0
              ? "Member Count : " + this.state.userList.length
              : null}
          </div>
        </div>
        <div className="user-container">
          {this.state.userList && this.state.userList.length === 0 ? (
            <div className="member-count">No members logged out.</div>
          ) : (
            <div>
              {this.state.userList.map((value, key) => {
                return (
                  <div className="user-container-wrapper" key={key}>
                    <div
                      style={{ marginRight: "1.2rem", width: "4rem" }}
                      onClick={this.getUserValue.bind(this, value)}
                    >
                      <img
                        src={value.picture.medium}
                        alt="no img"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div style={{ width: "calc(28rem - 4rem)" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%"
                        }}
                      >
                        <div
                          className="user-info-name"
                          onClick={this.getUserValue.bind(this, value)}
                        >
                          {value.name.first + " " + value.name.last}
                        </div>
                        <div
                          className="user-delete"
                          onClick={this.getDeleteConfirmation.bind(this, key)}
                        >
                          DELETE
                        </div>
                        {this.state.showDeletePopup &&
                        this.state.key === key ? (
                          <div className="confirmation-popup">
                            <div>Are you sure to delete this member?</div>
                            <div className="confirmation-btn-container">
                              <button
                                className="confirmation-cancel-btn"
                                onClick={this.cancelDeletePopup}
                              >
                                Cancel
                              </button>
                              <button
                                className="confirmation-success-btn"
                                onClick={this.deleteMember}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div onClick={this.getUserValue.bind(this, value)}>
                        <div
                          style={{
                            width: "34px",
                            height: "2px",
                            background: "#bdbcbd",
                            marginTop: "0.4rem"
                          }}
                        ></div>
                      </div>
                      <div
                        className="user-info-location"
                        onClick={this.getUserValue.bind(this, value)}
                      >
                        <div
                          style={{
                            marginRight: "1rem"
                          }}
                        >
                          <img src={LocationPin} alt="" height="20px" />
                        </div>
                        <div>
                          {value.location.street.number +
                            " " +
                            value.location.street.name +
                            "," +
                            value.location.city +
                            "," +
                            value.location.state +
                            "," +
                            value.location.postcode}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="add-member-btn" onClick={this.addMember}>
            + Add New Member
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(User);
