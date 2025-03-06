import styles from "./Carousel.module.css";

const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className={`carousel slide ${styles.carouselContainer}`}
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
        ></li>
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
        ></li>
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
        ></li>
      </ol>
      <div className="carousel-inner">
        <div className={`carousel-item active ${styles.carouselItem}`}>
          <img
            src="https://cdnx.jumpseller.com/padel-shop-chile/image/36549455/jugadores-6-scaled.jpeg?1687186340"
            className="d-block w-100"
            alt="First slide"
          />
        </div>
        <div className={`carousel-item ${styles.carouselItem}`}>
          <img
            src="https://www.padeladdict.com/wp-content/uploads/2023/02/world-padel-tour-da-a-conocer-los-cuadros-finales-del-abu-dhabi-padel-master.jpg"
            className="d-block w-100"
            alt="Second slide"
          />
        </div>
        <div className={`carousel-item ${styles.carouselItem}`}>
          <img
            src="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2024/3/6/iz397adpekntfkcjquxq/beatriz-gonzalez-fernandez"
            className="d-block w-100"
            alt="Third slide"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
