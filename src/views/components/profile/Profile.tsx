import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
// import { useQuery, useMutation, useQueryClient } from "react-query";
import { userApi } from "../../../actions/services/userApi";

const ProfileComponent = () => {
  const idUser = Cookies.get("id_user");
  const roleUser = Cookies.get("role");
  const [dataUser, setDataUser] = useState<any>([]);

  const getUser = async (idUser: number) => {
    const res = await userApi.getUser(idUser);
    setDataUser(res.data.data);
    return res;
  };

  useEffect(() => {
    getUser(Number(idUser));
  }, [idUser]);

  return (
    <div className="x-profile">
      <p className="text-xl-bold mb-3">Profile</p>
      {dataUser && (
        <div className="d-flex">
          <div className="col-md-3">
            <p className="text-md-ligh">Nama</p>
            <p className="text-md-ligh">Email</p>
            <p className="text-md-ligh">Role</p>
            <p className="text-md-ligh">Created at</p>
          </div>
          <div className="col-md-9">
            <p className="text-md-ligh">: {dataUser.name}</p>
            <p className="text-md-ligh">: {dataUser.email}</p>
            <p className="text-md-ligh">: {roleUser}</p>
            <p className="text-md-ligh">
              : {dataUser.created_at?.slice(0, 10)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
