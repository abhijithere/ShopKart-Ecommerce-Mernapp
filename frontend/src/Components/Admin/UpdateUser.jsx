import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../Layout/Loader";

import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const params = useParams();
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer bg-slate-100  absolute right-0  min-h-[120vh] pb-32   top-0 z-5 w-[calc(100%-288px)] flex flex-col justify-center items-center ">
          {loading ? (
            <Loader />
          ) : (
              <form
              className="createProductForm w-[60%] bg-white flex flex-col justify-center items-center gap-7 p-10 mt-10"
              onSubmit={updateUserSubmitHandler}
              >
                <h1 className="text-2xl text-slate-500">Update <span className="text-teal-500">User</span></h1>

              <div className="w-[90%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 
">
                <PersonIcon className="text-slate-500 hover:text-teal-200"
/>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "

                />
              </div>
              <div className="w-[90%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 
">
                <MailOutlineIcon className="text-slate-500 hover:text-teal-200"
/>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "

                />
              </div>

              <div className="w-[90%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 
">
                <VerifiedUserIcon className="text-slate-500 hover:text-teal-200"
/>
                <select value={role} onChange={(e) => setRole(e.target.value)}
                className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
                className="h-14 w-60 bg-teal-400 text-lg text-white font-bold rounded-sm hover:bg-teal-600 duration-500"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;