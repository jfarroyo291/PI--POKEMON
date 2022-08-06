import React from "react";
import { Link } from "react-router-dom";
import image404 from '../../images/image404.jpg';
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={image404} alt='img not found' />
      <Link to={"/home"}>
        <button className={styles.btn}>Go Home...</button>
      </Link>
    </div>
  );
};