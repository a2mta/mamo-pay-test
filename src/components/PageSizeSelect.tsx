import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

const SIZES = [5, 10, 25];

const PageSizeSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    setSearchParams((params) => {
      params.set('limit', e.currentTarget.value);
      return params;
    });
  };
  return (
    <div className='flex space-x-5'>
      <label htmlFor='page-size'>Page size:</label>
      <select
        value={searchParams.get('limit') || SIZES[0]}
        name='pageSize'
        onChange={handleChange}
        id='page-size'
      >
        {SIZES.map((item, index) => (
          <option key={item + index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelect;
