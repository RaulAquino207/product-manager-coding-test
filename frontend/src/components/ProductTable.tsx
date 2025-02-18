import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import ProductForm from "./ProductForm";

interface Product {
  id: number;
  name: string;
  available: boolean;
}

interface ProductTableProps {
  products: Product[];
  handleDeleteProduct: (id: number) => void;
  handleEditProduct: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleDeleteProduct,
  handleEditProduct,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [productToHandle, setProductToHandle] = useState<Product | null>(null);

  const handleConfirmEditProduct = (product: Product) => {
    if (productToHandle) {
      handleEditProduct(product);
    }
    handleCloseEditModal();
  };

  const handleOpenDeleteModal = (product: Product) => {
    setProductToHandle(product);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setProductToHandle(null);
  };

  const handleConfirmDelete = () => {
    if (productToHandle) {
      handleDeleteProduct(productToHandle.id);
    }
    handleCloseDeleteModal();
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setProductToHandle(null);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToHandle(product);
    setOpenEditModal(true);
  };

  // [COMMENT] If there are no products, display a message to the user.
  if (!products || products.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p={3}
        sx={{
          borderRadius: 2,
          border: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        <ErrorRoundedIcon sx={{ fontSize: 50, color: "#ff9800" }} />
        <Typography variant="h6" color="textSecondary" mt={2}>
          No products available.
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          mt={1}
        >
          It seems like there are no products at the moment. Please check back
          later.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.available ? "Yes" : "No"}</TableCell>
              <TableCell sx={{ display: "flex", gap: 1 }}>
                {/* [COMMENT] Now, instead of calling handleDeleteProduct directly, it will update the useState state to open the modal and confirm the deletion. */}
                {/* [COMMENT] Disable the delete button if the product is not available. */}
                <Button
                  disabled={!product.available}
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDeleteModal(product)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleOpenEditModal(product)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {productToHandle && openDeleteModal && (
        <CustomModal
          open={openDeleteModal}
          onClose={handleCloseEditModal}
          title="Are you sure?"
          actions={[
            {
              label: "Cancel",
              onClick: handleCloseEditModal,
              props: { color: "secondary" },
            },
            {
              label: "Confirm",
              onClick: handleConfirmDelete,
              props: { color: "primary" },
            },
          ]}
        >
          <Typography variant="body1" color="textSecondary">
            Deleting <b>{productToHandle.name}</b> is irreversible. Are you sure
            you want to continue?
          </Typography>
        </CustomModal>
      )}
      {productToHandle && openEditModal && (
        <CustomModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          title="Edit a product"
          actions={[
            {
              label: "Cancel",
              onClick: handleCloseEditModal,
              props: { color: "secondary" },
            },
            {
              label: "Save",
              onClick: () => {},
              props: { color: "primary", type: "submit", form: "product-form" },
            },
          ]}
        >
          <ProductForm
            handleProduct={handleConfirmEditProduct}
            product={{
              name: productToHandle!.name,
              available: productToHandle!.available,
              id: productToHandle!.id,
            }}
          ></ProductForm>
        </CustomModal>
      )}
    </TableContainer>
  );
};

export default ProductTable;
