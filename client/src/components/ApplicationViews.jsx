import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { CreateOrder } from "./Pizza/CreateOrder.jsx";
import { Home } from "./Pizza/Home.jsx";
import { UpdateOrder } from "./Pizza/UpdateOrder.jsx";
import { OrderDetails } from "./Pizza/OrderDetails.jsx";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="create-order"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateOrder/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="edit-order/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <UpdateOrder />
            </AuthorizedRoute>
          }
        />
        <Route
          path="order-details/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <OrderDetails />
            </AuthorizedRoute>
          }
        />
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
