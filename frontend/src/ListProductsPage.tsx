import { Box, Button, Container } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "./components/CustomModal";
import FilterSortForm from "./components/FilterSortForm";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import useProducts from "./hooks/useProducts";

interface CreateProduct {
  name: string;
  available: boolean;
}

const ListProductsPage: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    addProduct,
    deleteProduct,
    editProduct,
  } = useProducts({ sortBy: "", search: "" });

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  // [COMMENT] Added all the necessary functions to handle product editing
  const handleEditProduct = (product: any) => {
    editProduct(product);
  };

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleAddProduct = (createProduct: CreateProduct) => {
    addProduct(createProduct);
    handleCloseModal();
  };

  return (
    <Container>
      <FilterSortForm
        filter={filters}
        handleFilterChange={handleFilterChange}
      />
      <Box>
        {/* [COMMENT] Added just one button that will open a modal for creating a new product */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenModal()}
          sx={{ marginBottom: "5px" }}
        >
          Create a product
        </Button>
      </Box>

      {/* [COMMENT] Added a modal for creating a new product */}
      <CustomModal
        open={open}
        onClose={handleCloseModal}
        title="Create a product"
        actions={[
          {
            label: "Cancel",
            onClick: handleCloseModal,
            props: { color: "secondary" },
          },
          {
            label: "Create",
            onClick: () => {},
            props: { color: "primary", type: "submit", form: "product-form" },
          },
        ]}
      >
        <ProductForm handleProduct={handleAddProduct}></ProductForm>
      </CustomModal>
      <ProductTable
        products={products}
        handleDeleteProduct={handleDeleteProduct}
        handleEditProduct={handleEditProduct}
      />
    </Container>
  );
};

export default ListProductsPage;
