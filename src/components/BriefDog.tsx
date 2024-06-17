import 'antd/dist/reset.css';
import { Card} from 'antd';

const { Meta } = Card;

const BriefDog = () => {
  return (
    <>
      <Card style={{width: 300}} cover={<img alt="example" src="https://images.dog.ceo/breeds/affenpinscher/n02110627_12272.jpg" />}
  >
      </Card>
    </>
  )
}

export default BriefDog;