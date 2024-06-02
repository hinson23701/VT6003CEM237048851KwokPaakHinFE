import 'antd/dist/reset.css';
import { Row, Col} from 'antd';
import BriefDog from './BriefDog'

const Landing = () => {
  return (
    <>
      <Row gutter={[16,16]} style={{marginLeft:"15px"}}>
        <Col span={8}>
          <BriefDog />
        </Col>
        <Col span={8}>
          <BriefDog />
        </Col>
        <Col span={8}>
          <BriefDog />
        </Col>
      </Row>
    </>
  )
}

export default Landing;