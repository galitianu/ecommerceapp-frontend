import { Product } from "../../../types/entities";
import styles from "./ProductDetailsCard.module.css";
import { getProductsRelated } from "../../../services/productService";
import Image from "next/image";
import ProductRelated from "../ProductRelated/ProductRelated";

interface ProductDetailsCardProps {
  product: Product;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = async ({
  product,
}) => {
  const paragraphs = product.features.split("\n\n");
  const relatedProducts = await getProductsRelated(product.slug, 3);

  return (
    <div className={styles.productDetailsCard}>
      <div className={styles.productCardFeaturesAndBoxWrapper}>
        <div className={styles.productCardFeaturesWrapper}>
          <h3>FEATURES</h3>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
              <br />
            </p>
          ))}
        </div>
        {/* <div className={styles.productCardBoxWrapper}>
          <h3>IN THE BOX</h3>
          <ul>
            {product.includes.map((includedItem) => (
              <li key={includedItem.id}>
                {includedItem.item} <span>{includedItem.quantity}g</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <div className={styles.productDetailsCardImagesWrapper}>
        <div className={styles.productDetailsCardImage}>
          <Image
            src={product.imageGallery.imageGallery1}
            alt={`${product.slug}-gallery-1`}
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </div>{" "}
        <div className={styles.productDetailsCardImage}>
          <Image
            src={product.imageGallery.imageGallery2}
            alt={`${product.slug}-gallery-2`}
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </div>
        <div className={styles.productDetailsCardImage}>
          <Image
            src={product.imageGallery.imageGallery3}
            alt={`${product.slug}-gallery-3`}
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </div>
      </div>
      <h4 className={styles.relatedProductText}>YOU MAY ALSO LIKE</h4>
      <div className={styles.productsRelated}>
        {relatedProducts.map((relatedProduct: Product, index) => (
          <ProductRelated product={relatedProduct} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsCard;
