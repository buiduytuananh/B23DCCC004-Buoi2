import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../redux/productSlice';
import { Button, Box } from '@mui/material';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (isConfirmed) {
      dispatch(deleteProduct(item.id));
    }
  };

  return (
    <li style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{item.name}</span>
      <span>{item.price.toLocaleString('vi-VN')} VND</span>
      <Box>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ marginRight: 2 }}
        >
          Xóa
        </Button>
        <Link to={`/edit/${item.id}`}>
          <Button variant="outlined">Chỉnh sửa</Button>
        </Link>
      </Box>
    </li>
  );
};

export default ProductItem;
