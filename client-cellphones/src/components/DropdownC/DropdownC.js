import { Dropdown, Space } from 'antd';
import PropTypes from 'prop-types';
function DropdownC({menu,children, placement}) {
  
    return ( 
        <Dropdown overlay={menu} trigger={['click']}
        placement={placement}
         >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {children}
            </Space>
          </a>
        </Dropdown>
     );
}

DropdownC.propTypes = {
  menu: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  placement:PropTypes.string,
}

export default DropdownC;