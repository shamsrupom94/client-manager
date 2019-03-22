import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Loading from "../layout/Loading";
import classnames from "classnames";

class ClientProfile extends Component {
  state = {
    showBalanceUpdate: false,
    updatedBalance: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { updatedBalance, showBalanceUpdate } = this.state;
    const clientUpdate = {
      balance: parseFloat(updatedBalance)
    };

    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
    this.setState({ showBalanceUpdate: !showBalanceUpdate });
  };

  //Delete Client
  onDelete = e => {
    const { client, firestore } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(() => this.props.history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, updatedBalance } = this.state;

    let balanceForm = "";

    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="updatedBalance"
              placeholder="Add New Balance"
              value={updatedBalance}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Delete
                </button>

                <div
                  class="modal "
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Delete Client : "{client.firstName} {client.lastName}"
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        Are you sure you want to delete this client?
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={this.onDelete.bind(this)}
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    ID: <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <h3 className="pull-right">
                  {" "}
                  Balance:{" "}
                  <span
                    className={classnames({
                      "text-success": client.balance > 0,
                      "text-danger": client.balance === 0
                    })}
                  >
                    ${parseFloat(client.balance).toFixed(2)}
                  </span>
                  <small>
                    <a
                      href="#!"
                      onClick={() =>
                        this.setState({ showBalanceUpdate: !showBalanceUpdate })
                      }
                    >
                      {" "}
                      <i className="fas fa-pen" />
                    </a>
                  </small>
                  {balanceForm}
                </h3>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Email:</b>
                  {client.email}
                </li>
                <li className="list-group-item">
                  <b>Phone:</b> {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

ClientProfile.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientProfile);
