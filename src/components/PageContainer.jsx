import PropTypes from "prop-types";
function PageContainer({ title, description }) {
    return (
      <div className="p-4">
        <h1 className="h2 mb-4">{title}</h1>
        <p className="text-muted">{description}</p>
      </div>
    );
  }
  PageContainer.propTypes = {
     title: PropTypes.string,
    description: PropTypes.string.isRequired, // avatarUrl est requis
      }
  
  export default PageContainer;