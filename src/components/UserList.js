import { useEffect } from "react";
import { loadUsers } from "../api/apiCalls";
import { useState } from "react";
import UserListItem from "./UserListItem";
import { withTranslation } from "react-i18next";
import Spinner from "./Spinner";

const UserList = ({ t }) => {
  const [page, setPage] = useState({
    content: [],
    page: 0,
    size: 0,
    totalPages: 0,
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (pageIndex) => {
    setPendingApiCall(true);
    try {
      const response = await loadUsers(pageIndex);
      setPage(response.data);
    } catch (error) {}
    setPendingApiCall(false);
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <h3>{t("users")}</h3>
      </div>
      <ul className="list-group list-group-flush">
        {page.content.map((user) => {
          return <UserListItem user={user} key={user.id} />;
        })}
      </ul>
      <div className="card-footer text-center">
        {page.page !== 0 && !pendingApiCall && (
          <button
            className="btn btn-outline-secondary btn-sm float-start"
            onClick={() => loadData(page.page - 1)}
          >
            {t("previousPage")}
          </button>
        )}
        {page.totalPages > page.page + 1 && !pendingApiCall && (
          <button
            className="btn btn-outline-secondary btn-sm float-end"
            onClick={() => loadData(page.page + 1)}
          >
            {t("nextPage")}
          </button>
        )}
        {pendingApiCall && <Spinner />}
      </div>
    </div>
  );
};

export default withTranslation()(UserList);

// import { loadUsers } from "../api/apiCalls";
// import { Component } from "react";

// class UserList extends Component {
//   state = {
//     page: {
//       content: [],
//       page: 0,
//       size: 0,
//       totalPages: 0,
//     },
//   };

//   componentDidMount() {
//     loadUsers().then((response) => {
//       this.setState({ page: response.data });
//     });
//   }

//   render() {
//     return (
//       <div className="card">
//         <div className="card-header text-center">
//           <h3>Users</h3>
//         </div>
//         {this.state.page.content.map((user) => {
//           return <span key={user.i}>{user.username}</span>;
//         })}
//       </div>
//     );
//   }
// }

// export default UserList;
