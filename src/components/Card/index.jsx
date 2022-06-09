import PropTypes from 'prop-types';

function Card({ title, children }) {
  return (
    <div className="flex flex-col space-y-8 p-5 rounded shadow-3xl first:mt-3 md:first:mt-0">
      <h4 className="text-sm font-semibold text-aquamarine">{title}</h4>
      
      <div>
        {children}
      </div>
    </div>  
  )
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Card;
