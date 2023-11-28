import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { mapJsonRichText } from '../../utils/renderRichText';
import './article.css';

const productJSON = {
  'total': 4,
  'offset': 0,
  'limit': 4,
  'data': [
    {
      'parent_category_id': 'MTAy',
      'category_image': 'https://live-trane-headless-cms.pantheonsite.io/wp-content/uploads/2022/03/xr17-air-conditioners-lg.png',
      'category_id': '1',
      'category_uid': 'MTEw',
      'category_name': 'Air Conditioners',
      'category_description': 'Stay cool and comfortable when the weather gets hot',
      'product_id': '1002',
      'product_sku': 'xv17-air-conditioners',
      'product_name': 'XV17 TruComfort™ Variable Speed Air Conditioner',
      'product_description': 'Enjoy home comfort cooling and efficiency.',
      'product_short_description': 'Enjoy home comfort cooling and efficiency.',
      'product_thumbnail_url': 'https://www.trane.com/_next/image/?url=https%3A%2F%2Flive-trane-headless-cms.pantheonsite.io%2Fwp-content%2Fuploads%2F2023%2F05%2FXV17_AC_HP-1.png&w=828&q=75',
      'product_price': '100',
      'product_currency': 'USD'
    },
    {
      'parent_category_id': 'MTAy',
      'category_image': 'https://live-trane-headless-cms.pantheonsite.io/wp-content/uploads/2022/03/xc95m-lg.png',
      'category_id': '2',
      'category_uid': 'MTEw',
      'category_name': 'Furnaces',
      'category_description': 'Keep cozy with furnaces that use gas or oil to heat your home',
      'product_id': '1003',
      'product_sku': 's9v2',
      'product_name': 'S9V2 Gas Furnace',
      'product_description': 'Save on your monthly energy costs with this efficient two-stage furnace.',
      'product_short_description': 'Save on your monthly energy costs with this efficient two-stage furnace.',
      'product_thumbnail_url': 'https://www.trane.com/_next/image/?url=https%3A%2F%2Flive-trane-headless-cms.pantheonsite.io%2Fwp-content%2Fuploads%2F2022%2F08%2Fgas-furnace-s9v2-lg-259x300.png&w=3840&q=75',
      'product_price': '100',
      'product_currency': 'USD'
    },
    {
      'parent_category_id': 'MTAy',
      'category_image': 'https://live-trane-headless-cms.pantheonsite.io/wp-content/uploads/2022/03/xl16i-lg.png',
      'category_id': '3',
      'category_uid': 'MTEw',
      'category_name': 'Heat Pumps',
      'category_description': 'Heat and cool your home with this versatile system powered by electricity',
      'product_id': '1004',
      'product_sku': 'xr15',
      'product_name': 'XR15 Heat Pump',
      'product_description': 'Achieve an excellent blend of efficiency and value with one of our most affordable systems.',
      'product_short_description': 'Achieve an excellent blend of efficiency and value with one of our most affordable systems.',
      'product_thumbnail_url': 'https://www.trane.com/_next/image/?url=https%3A%2F%2Flive-trane-headless-cms.pantheonsite.io%2Fwp-content%2Fuploads%2F2023%2F05%2FXR15-LP-251x300.png&w=3840&q=75',
      'product_price': '100',
      'product_currency': 'USD'
    },
    {
      'parent_category_id': 'MTAy',
      'category_image': 'https://live-trane-headless-cms.pantheonsite.io/wp-content/uploads/2022/04/hyperion-communicating-lg.png',
      'category_id': '4',
      'category_uid': 'MTEw',
      'category_name': 'Air Handlers',
      'category_description': 'Pair these with your AC or heat pumps to circulate warm or cool air all throughout your home',
      'product_id': '1005',
      'product_sku': 'hyperion-tamx-air-handler',
      'product_name': 'Hyperion TAMX Air Handler',
      'product_description': 'Stay comfortable in your home with an efficient air handler equipped with innovative Trane Link® technology to control all of the system components.',
      'product_short_description': 'Stay comfortable in your home with an efficient air handler equipped with innovative Trane Link® technology to control all of the system components.',
      'product_thumbnail_url': 'https://www.trane.com/_next/image/?url=https%3A%2F%2Flive-trane-headless-cms.pantheonsite.io%2Fwp-content%2Fuploads%2F2022%2F12%2FTrane-Hyperion-TAMX-Air-Handler-163x300.png&w=3840&q=75',
      'product_price': '100',
      'product_currency': 'USD'
    }
  ],
  ':type': 'sheet'
};

const Article = ({ content }) => {
  const [productHTML, setProductHTML] = useState([]);
  const editorProps = {
    itemID: `urn:aemconnection:${content._path}/jcr:content/data/master`,
    itemType: 'reference',
    itemfilter: 'cf',
    'data-editor-itemlabel': 'Article'
  };

  useEffect(() => {
    const products = [];
    content.relatedProduct.map((product) => {
      productJSON.data.forEach((elem) => {
        if (elem.product_sku === product) {
          products.push(elem);
        }
      });
    });
    setProductHTML(products);
  }, [content.relatedProduct]);

  // const products = 'https://main--cif--jihuang-adobe.hlx.page/products.json?sheet=trane';
  // fetch(products).then((res) => {
  //   console.log(res);
  // });

  return (
    <div {...editorProps} className='article' itemScope>
      <div className='article-content'>
        <div className='content' itemProp='article' itemType='richtext' data-editor-itemlabel='Body'>{mapJsonRichText(content.article.json)}</div>
      </div>
      <div className='related-products'>
        <h4>Related Products</h4>
        <ul>
          {productHTML.map((product) => (
            <li key={product.product_sku}>
              <div className='product-card'>
                <img src={product.product_thumbnail_url} />
                <div className='product-card-content'>
                  <p><strong>{product.product_name}</strong></p>
                  <p>{product.product_description}</p>
                  <a href='#' className='button'>Add to Cart</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Article.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object
};

export default Article;
