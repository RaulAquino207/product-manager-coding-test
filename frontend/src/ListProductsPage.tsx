import { Container } from '@mui/material';
import React from 'react';
import FilterSortForm from './components/FilterSortForm';
import ProductTable from './components/ProductTable';
import useProducts from './hooks/useProducts';

const ListProductsPage: React.FC = () => {
  const { products, filters, setFilters, deleteProduct } = useProducts({ sortBy: '', search: '' });

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <Container>
      <FilterSortForm
        filter={filters}
        handleFilterChange={handleFilterChange}
      />
      <ProductTable
        products={products}
        handleDeleteProduct={handleDeleteProduct}
      />
    </Container>
  );
};

export default ListProductsPage;