import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import ProductForm from "../../components/products/ProductForm";
import swal from "sweetalert";
import ProductStore from "../../zustand/ProductStore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    name: "",
    unit: "",
    price: "",
    quantity: "",
  });
  const [expirationDate, setExpirationDate] = useState(dayjs("2023-04-17"));

  const getProduct = ProductStore((state) => state.getProduct);
  const product = ProductStore((state) => state.product);
  const updateProduct = ProductStore((state) => state.updateProduct);

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
      text: "Once submitted, product will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        const initialize = async () => {
          try {
            await updateProduct({
              ...values,
              id,
              image: selectedFile,
              expirationDate,
            });
            swal({
              title: "Good Job!",
              text: "Product successfully updated",
              icon: "success",
              buttons: {
                ok: "OK",
              },
              dangerMode: true,
            }).then(() => {
              navigate("/dashboard");
            });
          } catch (error) {
            return swal("Oops!", `${error.message}`, "error");
          }
        };
        initialize();
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProduct(id);
      } catch (error) {
        console.log(`${error.message}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      setValues({
        ...values,
        name: product?.name,
        unit: product?.unit,
        price: product?.price,
        quantity: product?.quantity,
      });
      setExpirationDate(dayjs(product?.expirationDate));
      setSelectedFile(product?.image);
    }
  }, [product]);
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
