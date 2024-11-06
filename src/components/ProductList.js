import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm, setCurrentPage } from '../redux/productSlice';
import ProductItem from './ProductItem';
import { Button, Box, TextField, Typography } from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, searchTerm, currentPage, itemsPerPage } = useSelector(state => state.products);

  // Lọc các sản phẩm theo tên
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính số trang và các sản phẩm hiển thị trong trang hiện tại
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Danh Sách Bán Hàng
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Tìm kiếm hàng hóa..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          fullWidth
        />
        <Link to="/add">
          <Button variant="contained" sx={{ ml: 2 }}>
            Thêm hàng hóa
          </Button>
        </Link>
      </Box>

      {currentItems.length === 0 ? (
        <Typography variant="body1" color="error">
          Không tìm thấy hàng hóa nào!
        </Typography>
      ) : (
        <ul>
          {currentItems.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </ul>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Trang trước
        </Button>
        <Typography variant="body1">
          Trang {currentPage} / {totalPages}
        </Typography>
        <Button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          Trang sau
        </Button>
      </Box>
    </div>
  );
};

export default ProductList;
