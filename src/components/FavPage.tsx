import 'antd/dist/reset.css';
import '../App.css';
import FavCard from './favCard';

function FavPage() {
  return (
    <> 
    <h2 style={{ color: 'green' }}> Your Favourite dog list</h2>     

      <FavCard />
    </>
  )
}
export default FavPage;