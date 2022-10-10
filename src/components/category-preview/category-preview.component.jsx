import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
//SCSS
import "./category-preview.styles.scss";


const CategoryPreview = ({ title, products }) => {
    const productFilter = products.filter((_, idx) => idx < 4)
    const productFirstFour = productFilter.map((product) => {
        return <ProductCard key={product.id} product={product} />
    })

    return (
        <div className="category-preview-container">
            <h2>
                <Link className="title" 
                      to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {productFirstFour}
            </div>
        </div>
    );
};

export default CategoryPreview;