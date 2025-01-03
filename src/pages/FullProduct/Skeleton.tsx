import React from 'react';
import styles from '../../scss/components/Skeleton.module.scss';

const Skeleton: React.FC = () => (
  <div className="container full-product">
    {/* Фото */}
    <div
      style={{
        width: '260px',
        height: '260px',
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: '#e0e0e0',
      }}
      className={styles.skeleton}></div>

    {/* Название */}
    <div
      style={{
        width: '60%',
        height: '30px',
        marginBottom: '28px',
        backgroundColor: '#e0e0e0',
      }}
      className={styles.skeleton}></div>

    {/* "Страна" */}
    <div
      style={{
        width: '40%',
        height: '22px',
        marginBottom: '16px',
        backgroundColor: '#e0e0e0',
      }}
      className={styles.skeleton}></div>

    {/* Описание */}
    <div
      style={{
        width: '100%',
        height: '150px',
        marginBottom: '16px',
        borderRadius: '4px',
        backgroundColor: '#e0e0e0',
      }}
      className={styles.skeleton}></div>

    {/* Цена */}
    <div
      style={{
        width: '30%',
        height: '22px',
        marginBottom: '16px',
        backgroundColor: '#e0e0e0',
      }}
      className={styles.skeleton}></div>

    {/* Кнопка */}
    <div
      style={{
        width: '100px',
        height: '44px',
        borderRadius: '30px',
        backgroundColor: '#e0e0e0',
      }}
      className={styles.skeleton}></div>
  </div>
);

export default Skeleton;
