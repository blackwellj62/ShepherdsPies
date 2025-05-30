import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavBar from "./NavBar.jsx";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <>
              <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
              <Outlet/>
              </>
            </AuthorizedRoute>
          }
        />
        {/* <Route
          path="bikes"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Bikes />
            </AuthorizedRoute>
          }
        /> */}
        {/* <Route path="workorders">
    <Route
    index
    element={
        <AuthorizedRoute loggedInUser={loggedInUser}>
            <WorkOrderList />
        </AuthorizedRoute>
    }
    />
    <Route
    path="create"
    element={
        <AuthorizedRoute loggedInUser={loggedInUser}>
            <CreateWorkOrder />
        </AuthorizedRoute>
    }
    />
</Route> */}
        {/* <Route
          path="employees"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <UserProfileList/>
            </AuthorizedRoute>
          }
        /> */}
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
