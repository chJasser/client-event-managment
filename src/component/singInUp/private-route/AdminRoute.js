import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
const AdminRoute = ({ component: Component, auth, ...rest }) => {
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => setLoading(true));
  }, []);

  return (
    <div>
      {!Loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="balls" height={100} width={100} color="#f82249" />
        </div>
      ) : (
        <Route
          {...rest}
          render={(props) => {
            return auth.isAuthenticated === true &&
              auth.user.email === "chaieb.jasser@esprit.tn" ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      )}
    </div>
  );
};

// auth.registred === true &&
const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.auth.user.email,
});
export default connect(mapStateToProps)(AdminRoute);
