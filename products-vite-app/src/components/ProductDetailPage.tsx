import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  images: string[];
}

const fetchProductDetails = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>('https://dummyjson.com/products/'+id);
  return response.data;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: product, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Failed to load product details.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">{t("back")}</button>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <p>{product.description}</p>
      <p className="text-heading">${product.price}</p>
      
      {/* <div className="image-gallery">
        {product.images.map((img, idx) => (
          <img key={idx} src={img} alt={`Product ${idx}`} className="thumbnail" />
        ))}
      </div> */}
    </div>
  );
};

export default ProductDetailPage;
