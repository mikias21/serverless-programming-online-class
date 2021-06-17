import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Product() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8888/api/airtable_api?id=${id}`
        );
        setProduct(data);
      } catch (e) {
        alert(e.response);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <section className="section section-center">Loading ...</section>;
  }

  const { fields } = product;
  const { name, description, price, image } = fields;

  return (
    <section className="section section-center">
      <Link to="/" className="Link">
        Back home
      </Link>
      <div>
        <div className="title">
          <h2>{name}</h2>
          <div className="title-underline" />
        </div>
        <article className="single-product">
          <img src={image[0].url} alt={name} className="single-product-img" />
          <div>
            <h5>{name}</h5>
            <h5 className="price">${price}</h5>
            <h5>{description}</h5>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Product;
