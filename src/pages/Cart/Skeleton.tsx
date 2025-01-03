import React from 'react';
import styles from '../../scss/components/Skeleton.module.scss';

const Skeleton: React.FC = () => (
  <div className="container container--cart">
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <span
            className={styles.skeleton}
            style={{
              display: 'inline-block',
              width: '150px',
              height: '50px',
              marginBottom: '5px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
            }}></span>
        </h2>
        <div className="cart__clear">
          <span
            className={styles.skeleton}
            style={{
              display: 'inline-block',
              width: '105px',
              height: '50px',
              marginBottom: '5px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
            }}></span>
        </div>
      </div>
      <div className="content__items">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`skeleton__item`}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '10px',
            }}>
            <div
              className={styles.skeleton}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#e0e0e0',
                borderRadius: '8px',
                marginRight: '20px',
              }}></div>
            <div style={{ flex: 1 }}>
              <div
                className={styles.skeleton}
                style={{
                  width: '50%',
                  height: '20px',
                  backgroundColor: '#e0e0e0',
                  marginBottom: '10px',
                  borderRadius: '4px',
                }}></div>
              <div
                className={styles.skeleton}
                style={{
                  width: '20%',
                  height: '20px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                }}></div>
            </div>
            <div
              className={styles.skeleton}
              style={{
                width: '20%',
                height: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                marginLeft: '20px',
              }}></div>
          </div>
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span
            className={styles.skeleton}
            style={{
              display: 'inline-block',
              width: '200px',
              height: '30px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              marginBottom: '10px',
            }}></span>
          <span
            className={styles.skeleton}
            style={{
              display: 'inline-block',
              width: '150px',
              height: '30px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
            }}></span>
        </div>
        <div className="cart__bottom-buttons">
          <div
            className={`button ${styles.skeleton}`}
            style={{
              width: '210px',
              height: '56px',
              backgroundColor: '#e0e0e0',
              borderRadius: '8px',
            }}></div>
          <div
            className={`button ${styles.skeleton}`}
            style={{
              width: '210px',
              height: '56px',
              backgroundColor: '#e0e0e0',
              borderRadius: '8px',
              marginLeft: '10px',
            }}></div>
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
