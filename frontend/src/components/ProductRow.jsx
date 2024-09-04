export function ProductRow({ product }) {    
  
    return (
      <tr>
        <td>{product.userId}</td>
        <td>{product.marks_day1}</td>
        <td>{product.test_pass_day1}</td>
        <td>{product.marks_day2}</td>
        <td>{product.test_pass_day2}</td>
        <td>{product.marks_day3}</td>
        <td>{product.test_pass_day3}</td>
      </tr>
    );
  }