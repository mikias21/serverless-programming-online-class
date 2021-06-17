import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:55676/.netlify/functions/basic_api";

function Basic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (e) {
        alert(e.response);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="section section-center">
      <div className="title">
        <h2>Basic setup</h2>
        <div className="title-underline"></div>
      </div>
      <div className="products">
        {data.map((product) => {
          const {
            id,
            image: { url },
            price,
            name,
          } = product;
          return (
            <article className="product" key={id}>
              <img src={url} alt={name} />
              <div className="info">
                <h5>{name}</h5>
                <h5 className="price">${price}</h5>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Basic;
