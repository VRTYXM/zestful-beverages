import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from './Skeleton';

const API_URL =
  process.env.REACT_APP_API_URL || 'https://66f17163415379191550eee7.mockapi.io/items';

const FullProduct: React.FC = () => {
  const [product, setProduct] = useState<{
    imageUrl: string;
    title: string;
    country: string;
    description: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert('ID продукта отсутствует!');
      navigate('/');
      return;
    }

    async function fetchGoods() {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        if (!data) {
          throw new Error('Продукт не найден!');
        }
        setProduct(data);
      } catch (error: any) {
        console.error('Ошибка: ', error.message);
        alert('Ошибка при получении данных о товаре!');
        navigate('/');
      }
    }

    fetchGoods();
  }, [id, navigate]);

  if (!product) {
    return <Skeleton />;
  }

  function formatDescription(description: string): JSX.Element[] {
    if (typeof description !== 'string') {
      return [<p key="0">Описание недоступно</p>];
    }

    return description
      .split('<br /><br />')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  }

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container full-product">
      <img src={product.imageUrl} alt={product.title} />
      <h2>{product.title}</h2>
      <p>
        Страна: <b>{product.country}</b>
      </p>
      <div className="description">{formatDescription(product.description)}</div>
      <h4>{product.price} ₽ / шт.</h4>
      <button onClick={handleGoBack} className="button button--outline button--add">
        <span>Назад</span>
      </button>
    </div>
  );
};

export default FullProduct;
