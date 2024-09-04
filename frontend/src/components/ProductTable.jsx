import {ProductRow} from './ProductRow';
import {ProductCategoryRow} from './ProductCategoryRow';


export function ProductTable({ products }) {
    const rows = [];
    // let lastCategory = null;
    // console.log(products)
    products.forEach((product) => {
    //   if (product.category !== lastCategory) {
    //     rows.push(
    //       <ProductCategoryRow
    //         category={product.category}
    //         key={product.category} />
    //     );
    //   }
      rows.push(
        <ProductRow
          product={product}
          key={product._id} />
      );
    //   lastCategory = product.category;
    });

    // const handleDownload = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(products);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    //     const blob = new Blob([xlsxData], { type: 'application/octet-stream' });
    //     saveAs(blob, 'products.xlsx');
    //   };
  
    return (
      <table>
        <thead>
          <tr>
            <th>userId</th>
            <th>marks_day1</th>
            <th>test_pass_day1</th>
            <th>marks_day2</th>
            <th>test_pass_day2</th>
            <th>marks_day3</th>
            <th>test_pass_day3</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }