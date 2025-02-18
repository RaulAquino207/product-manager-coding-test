import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ProductFormProps {
  handleProduct: (newProduct: any) => void;
  product?: { name: string; available: boolean; id?: number };
}

// [COMMENT] Added a form to handle product creation and editing
const ProductForm: React.FC<ProductFormProps> = ({
  handleProduct,
  product,
}) => {
  const [newProduct, setNewProduct] = useState({ name: "", available: false });

  useEffect(() => {
    if (product) {
      setNewProduct({ name: product.name, available: product.available });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    if (!newProduct.name.trim()) return;
    handleProduct({ ...newProduct, id: product?.id });
  };

  return (
    <Box
      component="form"
      id="product-form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        paddingTop: "5px",
      }}
    >
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={newProduct.available}
            onChange={(e) =>
              setNewProduct({ ...newProduct, available: e.target.checked })
            }
          />
        }
        label="Available"
      />
    </Box>
  );
};

export default ProductForm;
