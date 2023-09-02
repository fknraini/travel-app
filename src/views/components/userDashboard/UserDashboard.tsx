import React, { useState, useEffect } from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { userApi } from "../../../actions/services/userApi";

interface User {
  id: number;
  name: string;
  email: string;
  options: { id: number; name: string }[];
}

const ROLE = [
  { id: 1, name: "user" },
  { id: 2, name: "admin" },
];

const UserDashboard: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [dataUserSend, setDataUserSend] = useState<any>({
    name: "",
    email: "",
    password: "",
  });
  const [dataUserUpdateSend, setDataUserUpdateSend] = useState<any>({
    role: "user",
  });

  const getUsers = async () => {
    const res = await userApi.getUsers();
    setTotalPages(Math.ceil(res.data.data.length / itemsPerPage));
    setDataUsers(res.data.data);
    return res.data.data;
  };

  const getUser = async (id: number) => {
    const res = await userApi.getUser(id);
    console.log("res", res);
    setDataUser(res.data.data);
    return res;
  };

  const createUser = async (data: any) => {
    const res = await userApi.createUser(data);
    return res;
  };

  const deleteUser = async (data: any) => {
    const res = await userApi.deleteUser(data);
    return res;
  };

  const assignRole = async (id: number, data: any) => {
    const res = await userApi.assignRole(id, data);
    return res;
  };

  const mutationCreate = useMutation(createUser, {
    onSuccess: () => {
      getUsers();
    },
    onError: (error) => {
      console.log("error create user", error);
      alert("User gagal dibuat");
    },
  });

  const mutationDelete = useMutation(deleteUser, {
    onSuccess: () => {
      getUsers();
      alert("User berhasil dihapus");
    },
    onError: (error) => {
      alert("User gagal dihapus");
    },
  });

  const mutationUpdate = useMutation(
    (dataUserUpdateSend) => assignRole(dataUser?.id, dataUserUpdateSend),
    {
      onSuccess: () => {},
      onError: () => {
        alert("User gagal diupdate");
      },
    }
  );

  useEffect(() => {
    getUsers();
  }, [pageCount]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPageCount(pageCount + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataUsers.slice(startIndex, endIndex);

  const handleCloseModalCreate = () => {
    setModalCreate(false);
  };

  const handleCloseModalUpdate = () => {
    setModalUpdate(false);
  };

  const handleModalUpdate = (id: number) => {
    getUser(id);
    setModalUpdate(true);
  };

  const renderModalCreate = () => {
    return (
      <Modal show={modalCreate} onHide={handleCloseModalCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-start">Name</p>
          <input
            type="text"
            className="form-control"
            id="nama"
            onChange={(e) => {
              setDataUserSend({ ...dataUserSend, name: e.target.value });
            }}
          />
          <p className="mb-1 mt-1 text-start">Email</p>
          <input
            type="email"
            className="form-control"
            id="nama-grup"
            onChange={(e) => {
              setDataUserSend({ ...dataUserSend, email: e.target.value });
            }}
          />
          <p className="mb-1 mt-1 text-start">Password</p>
          <input
            type="password"
            className="form-control"
            id="nama-grup"
            minLength={8}
            required
            onChange={(e) => {
              setDataUserSend({ ...dataUserSend, password: e.target.value });
            }}
          />
          <p className="text-sm-light mb-0 text-start">
            The password must consist of at least 8 characters
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={() => setModalCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                mutationCreate.mutate(dataUserSend);
                setModalCreate(false);
                setDataUser({});
              }}
            >
              Register
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderModalUpdate = () => {
    return (
      <Modal show={modalUpdate} onHide={handleCloseModalUpdate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Role User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-start">Name</p>
          <input
            type="text"
            className="form-control"
            id="nama"
            value={dataUser?.name}
          />
          <p className="mb-1 mt-1 text-start">Email</p>
          <input
            type="email"
            className="form-control"
            id="nama-grup"
            value={dataUser?.email}
          />
          <p className="mb-1 mt-1 text-start">Role</p>
          <select
            onChange={(e) => {
              setDataUserUpdateSend({
                ...dataUserUpdateSend,
                role: e.target.value,
              });
            }}
          >
            {ROLE.map((role, index) => (
              <option key={role.id} value={role.name} selected={index === 0}>
                {role.name}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={() => setModalUpdate(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                mutationUpdate.mutate(dataUserUpdateSend);
                setModalUpdate(false);
                setDataUserUpdateSend({ role: "user" });
              }}
            >
              Update
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="x-user-dashboard">
      <div className="d-flex justify-content-between">
        <p className="text-xl-bold my-auto">Dashboard User</p>
        <button
          className="btn btn-primary text-sm-normal"
          onClick={() => setModalCreate(true)}
        >
          + Create New User
        </button>
      </div>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th className="text-center">Id</th>
            <th className="text-center">Name</th>
            <th className="text-center">Action</th>
            {/* Add more table headers here */}
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item?.name}</td>
              <td>
                <div className="text-center gap-6">
                <button
                    className="btn btn-secondary text-sm-normal me-4"
                    onClick={() => mutationDelete.mutate(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary text-sm-normal"
                    onClick={() => handleModalUpdate(item.id)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>
      {renderModalCreate()}
      {renderModalUpdate()}
    </div>
  );
};

export default UserDashboard;
