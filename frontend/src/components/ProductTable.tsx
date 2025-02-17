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

interface Product {
  id: number;
  name: string;
  available: boolean;
}

interface ProductTableProps {
  products: Product[];
  handleDeleteProduct: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleDeleteProduct,
}) => {
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setProductToDelete(product);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete.id);
    }
    handleCloseModal();
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
              <TableCell>
                {/* [COMMENT] Now, instead of calling handleDeleteProduct directly, it will update the useState state to open the modal and confirm the deletion. */}
                {/* [COMMENT] Disable the delete button if the product is not available. */}
                <Button
                  disabled={!product.available}
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenModal(product)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {productToDelete && (
        <CustomModal
          open={open}
          onClose={handleCloseModal}
          title="Are you sure?"
          actions={[
            {
              label: "Cancel",
              onClick: handleCloseModal,
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
            Deleting <b>{productToDelete.name}</b> is irreversible. Are you sure
            you want to continue?
          </Typography>
        </CustomModal>
      )}
    </TableContainer>
  );
};

export default ProductTable;
