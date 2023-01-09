import {  Tabs } from 'antd';
import Accessory from './components/Accessory';

const operations = <h4>HOTSALE</h4>;
function Bessell() {
  const items = [
    { label: 'Điện thoại, Lap top, TV', key: 'item-1', children: <Accessory /> },
  ];
  return (
    <section className="best__sell pt-15 pb-40">
      <div className="container">
        <div className="row">
          <div className="best__sell-box">
              <div className="col-xl-12">
                <Tabs tabBarExtraContent={operations} defaultActiveKey='1' items={items}/>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bessell;
