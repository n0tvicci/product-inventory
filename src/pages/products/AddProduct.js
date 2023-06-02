import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import ProductForm from "../../components/products/ProductForm";
import swal from "sweetalert";
import ProductStore from "../../zustand/ProductStore";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    name: "",
    unit: "",
    price: "",
    quantity: "",
    loading: false,
  });
  const [expirationDate, setExpirationDate] = useState(dayjs("2023-04-17"));

  const createProduct = ProductStore((state) => state.createProduct);

  const handleExpirateDate = (newValue) => {
    setExpirationDate(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const acceptedFiles = event.dataTransfer.files;
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, unit, price, quantity } = values;

    if (
      !name ||
      !unit ||
      !price ||
      !quantity ||
      !expirationDate ||
      !selectedFile
    ) {
      return swal("Oops!", `Missing required field`, "error");
    }

    swal({
      title: "Are you sure?",
      text: "Once submitted, product will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        setValues({ ...values, loading: true });
        const initialize = async () => {
          try {
            await createProduct({
              ...values,
              image: selectedFile,
              expirationDate,
            });
            swal({
              title: "Good Job!",
              text: "Product successfully added",
              icon: "success",
              buttons: {
                ok: "OK",
              },
              dangerMode: true,
            }).then(() => {
              setValues({ ...values, loading: false });
              navigate("/dashboard");
            });
          } catch (error) {
            setValues({ ...values, loading: false });
            return swal("Oops!", `${error.message}`, "error");
          }
        };
        initialize();
      }
    });
  };
  return (
    <div>
      <ProductForm
        selectedFile={selectedFile}
        handleDrop={handleDrop}
        handleFileInputChange={handleFileInputChange}
        handleInputChange={handleInputChange}
        values={values}
        handleSubmit={handleSubmit}
        expirationDate={expirationDate}
        handleExpirateDate={handleExpirateDate}
      />
    </div>
  );
}
