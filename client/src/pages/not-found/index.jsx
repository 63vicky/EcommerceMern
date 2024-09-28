/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      Page Doesn't Exists
      <Button>
        <Link to="/shop/home">Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
