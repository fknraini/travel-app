import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Pagination } from "react-bootstrap";
import { useMutation } from "react-query";
import { destinationApi } from "../../../actions/services/destinationApi";
import { reviewApi } from "../../../actions/services/reviewApi";
import { convertToBase64 } from "../../../utils/helper";
import Cookies from "js-cookie";

interface Destination {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  average_rating: number;
}

interface Review {
  id: number;
  rating: number;
  user_id: number;
  destination_id: number;
  created_at: string;
  description: string; 
}

interface DestinationWithReviews extends Destination {
  id: number;
  reviews: Review[];
}

const DestinationComponent: React.FC = () => {
  const [dataDestinations, setDataDestinations] = useState<
    DestinationWithReviews[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalCreateReview, setModalCreateReview] = useState<boolean>(false);
  const [sendDataDest, setSendDataDest] = useState<any>({
    title: "",
    description: "",
    thumbnail: "",
  });
  const [sendDataReview, setSendDataReview] = useState<any>({
    description: "",
    rating: 0,
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedDesId, setSelectedDesId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const roleUser = Cookies.get("role");
  const idUser = Cookies.get("id_user");

  const getDestinations = async () => {
    const res = await destinationApi.getDestinations();
    setTotalPages(Math.ceil(res.data.data.data.length / itemsPerPage));
    setDataDestinations(res.data.data.data);
  };

  const createDestination = async (data: any) => {
    const res = await destinationApi.createDestination(data);
    return res;
  };

  const mutationCreate = useMutation(createDestination, {
    onSuccess: () => {
      getDestinations();
    },
    onError: (error: any) => {
      console.log("error create destination", error);
      alert("Destination gagal dibuat");
    },
  });

  const deleteDestination = async (id: any) => {
    const res = await destinationApi.deleteDestination(id);
    return res;
  };

  const mutationDelete = useMutation(deleteDestination, {
    onSuccess: () => {
      getDestinations();
      alert("Destination berhasil dihapus");
    },
    onError: () => {
      alert("Destination gagal dihapus");
    },
  });

  const createReview = async (id: number, data: any) => {
    const res = await reviewApi.createReview(id, data);
    return res;
  };

  const mutationCreateRev = useMutation((sendDataReview) => createReview(selectedDesId, sendDataReview),{
    onSuccess:() => {
      getDestinations();
    },
    onError:() => {
      alert("Review gagal diupload");
    },
  });

  useEffect(() => {
    getDestinations();
    console.log("roleUser", roleUser);
    console.log("iduser", idUser);
  }, [pageCount]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPageCount(pageCount + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataDestinations?.slice(startIndex, endIndex);

  const handleCloseModalCreate = () => {
    setModalCreate(false);
  };

  const handleCloseModalCreateReview = () => {
    setModalCreateReview(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    }
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
      const isFileTypeValid = allowedFileTypes.includes(selectedImage.type);

      if (!isFileTypeValid) {
        console.error(
          "Invalid file type. Please select a JPEG, PNG, or JPG image."
        );
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", selectedImage);
      mutationCreate.mutate(formData);
    }
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // convertToBase64(img).then((result) =>
      //   setSendDataDest({ ...sendDataDest, thumbnail: result })
      // );
      const formData = new FormData();
      formData.append("file", img);
      // setSendDataDest({ ...sendDataDest, thumbnail: formData })
    }
  };

  const renderModalCreate = () => {
    return (
      <Modal show={modalCreate} onHide={handleCloseModalCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Destination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-start">Title</p>
          <input
            type="text"
            className="form-control"
            id="nama"
            onChange={(e) => setTitle(e.target.value)}
            // onChange={(e) => {
            //   setSendDataDest({ ...sendDataDest, title: e.target.value });
            // }}
          />
          <p className="mb-1 mt-1 text-start">Description</p>
          <input
            type="text"
            className="form-control height-10"
            id="nama-grup"
            onChange={(e) => setDescription(e.target.value)}
            // onChange={(e) => {
            //   setSendDataDest({ ...sendDataDest, description: e.target.value });
            // }}
          />
          <p className="mb-1 mt-1 text-start">Image</p>
          <input
            id="image-upload"
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            name="myImage"
            // onChange={(event) => onImageChange(event)}
            onChange={handleImageChange}
            // onChange={(e) => {
            //   setSendDataDest({...sendDataDest, thumbnail: e.target.value});
            // }}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={() => setModalCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // mutationCreate.mutate(dataUserSend);
                setModalCreate(false);
                handleUploadImage();
                // mutationCreate.mutate(sendDataDest);
                // setSendDataDest({});
                // console.log("datasend", sendDataDest);
              }}
            >
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderModalCreateReview = () => {
    return (
      <Modal show={modalCreateReview} onHide={handleCloseModalCreateReview} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Destination's Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1 text-start">Your Review</p>
          <input
            type="text"
            className="form-control"
            id="des"
            onChange={(e) => {
              setSendDataReview({ ...sendDataReview, description: e.target.value });
            }}
          />
          <p className="mb-1 mt-1 text-start">Rating</p>
          <input
            type="number"
            className="form-control height-10"
            id="rating"
            onChange={(e) => {
              setSendDataReview({ ...sendDataReview, rating: Number(e.target.value) });
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={() => setModalCreateReview(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                mutationCreateRev.mutate(sendDataReview);
                setModalCreateReview(false);
                setSendDataReview({});
              }}
            >
              Upload
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="x-destination">
      <div className="d-flex justify-content-between mb-3">
        <p className="text-xl-bold my-auto">Destination</p>
        {roleUser === "admin" && (
          <button
            className="btn btn-primary text-sm-normal"
            onClick={() => setModalCreate(true)}
          >
            + Create New Destination
          </button>
        )}
      </div>
      <div>
        {currentData.map((item, index) => (
          <Card className="x-card-destination mb-3" key={index}>
            <Card.Img src={item.thumbnail} alt={item.title} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>Rating: {item.average_rating} / 5</Card.Text>
              <ul>
                {item.reviews.map((review: Review) => (
                  <li key={review.id}>
                    Rating: {review.rating} / 5
                    <br />
                    Comment: {review.description}
                  </li>
                ))}
              </ul>
            </Card.Body>
            {roleUser !== "superadmin" &&
            <Card.Footer>
              <div className="d-flex justify-content-between">
                
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalCreateReview(true);
                    setSelectedDesId(item.id);
                  }}
                >
                  Add Review
                </Button>
              {roleUser === "admin" && <div className="d-flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => mutationDelete.mutate(item.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  // onClick={() => {
                  //   mutationCreate.mutate(dataUserSend);
                  //   setModalCreate(false);
                  //   setDataUser({});
                  // }}
                >
                  Edit
                </Button>
              </div>}
              </div>
            </Card.Footer>}
          </Card>
        ))}
      </div>
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
      {renderModalCreateReview()}
    </div>
  );
};

export default DestinationComponent;
