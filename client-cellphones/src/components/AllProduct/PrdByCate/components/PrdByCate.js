
import PropTypes from 'prop-types';

function PrdByCate({data}) {
    console.log(data)
    return ( <h1>Hello</h1> );
}


PrdByCate.propTypes = {
    data: PropTypes.array.isRequired
}
export default PrdByCate;